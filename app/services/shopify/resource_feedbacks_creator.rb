require 'faraday'

module Shopify
  class ResourceFeedbacksCreator
    def initialize(shopify_domain:, product_id:, shopify_token:, product_updated_at:, messages:)

      @shopify_domain = shopify_domain # <String>
      @product_id = product_id # <String>
      @product_updated_at = product_updated_at # <String>
      @shopify_token = shopify_token # <String>
      @messages = messages # <Array>
    end

    def call
      res = Faraday.post("https://#{@shopify_domain}/admin/api/2021-07/products/#{@product_id}/resource_feedback.json") do |req|
        req.headers['Content-Type'] = 'application/json'
        req.headers['X-Shopify-Access-Token'] = @shopify_token
        req.body = {
          "resource_feedback": {
            "state": 'requires_action',
            "resource_type": 'Product',
            "messages": @messages,
            "resource_updated_at": @product_updated_at,
            "feedback_generated_at": Time.current.to_s
          }
        }.to_json
      end
      raise Faraday::ResourceNotFound, res.body unless res.success?

      true
    end
  end
end
