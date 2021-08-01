class WebhookEventsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    endpoint_secret = env['STRIPE_ENDPOINT_SECRET']
    payload = request.body.read
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    event = nil

    begin
      event = Stripe::Webhook.construct_event(
        payload, sig_header, endpoint_secret
      )
    rescue JSON::ParserError => e
      render json: params, status: 400
      return
    rescue Stripe::SignatureVerificationError => e
      render json: params, status: 400
      return
    end

    if event['type'] == 'account.updated'
      account = event['data']['object']
      handle_account_update(account)
    end

    render json: params, status: 200
  end

  def handle_account_update(account)
    shop = Shop.find_by!(stripe_account_id: account.id)
    if shop.has_stripe_account_completed_process != account['details_submitted'] &&
      shop.is_stripe_account_payouts_enabled != account['payouts_enabled']

      shop.update!(
        has_stripe_account_completed_process: account['details_submitted'],
        is_stripe_account_payouts_enabled: account['payouts_enabled']
      )
    end
  rescue ActiveRecord::RecordInvalid => e
    GraphQL::ExecutionError.new(e.to_s)
  rescue => e
    GraphQL::ExecutionError.new(e.to_s)
  end
end
