class WebhookEventsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def create
    endpoint_secret = 'whsec_ISz2I7dHMMtKFGUn0skIQtX3wur8DlKJ'
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
    # Collect more required information, e.g.
    puts account.to_s, 'handle account webhook ----------------'
  end

  # def create
  #   if !valid_signature?
  #     render json: { message: 'Invalid signature'}, status: 400
  #     return
  #   end
  #     case params[:source]
  #     when 'stripe'
  #       case params[:type]
  #       when 'checkout.session.completed'

  #       end
  #     when 'github'
  #     end
  #     render json: params
  # end
  # def valid_signature?
  #   if params[:source] == 'stripe'
  #     begin
  #       wh_secret = 'whsec_ah59Q9nMVsVXSEXtwpSMTLkWE9DfQVlY'
  #       Stripe::Webhook.construct_event(
  #         request.body.read,
  #         request.env['HTTP_STRIPE_SIGNATURE'],
  #         wh_secret
  #       )
  #     rescue JSON::ParserError => e
  #       puts 'hiherror1', e
  #       return false
  #     rescue Stripe::SignatureVerificationError => e
  #       puts 'hiherror', e
  #       return false
  #     end
  #     true
  #   end
  # end
end
