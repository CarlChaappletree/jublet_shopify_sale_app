require 'faraday'

module Shopify
  class ProductResourceFeedbacksCreator
    def initialize(shopify_domain:, product_id:, shopify_token:, product_updated_at:, feedbacks: {})
      @shopify_domain = shopify_domain # <String>
      @product_id = product_id # <String>
      @product_updated_at = product_updated_at # <String>
      @shopify_token = shopify_token # <String>
      @feedbacks = feedbacks # <Object>
    end

    def invalid!
      messages = []
      messages << 'Needs a jublet categories.' unless @feedbacks[:jublet_category_valid?]
      messages << 'Needs description.' unless @feedbacks[:description_valid?]
      messages << 'Needs images.' unless @feedbacks[:image_valid?]
      res = Faraday.post("https://#{@shopify_domain}/admin/api/2021-07/products/#{@product_id}/resource_feedback.json") do |req|
        req.headers['Content-Type'] = 'application/json'
        req.headers['X-Shopify-Access-Token'] = @shopify_token
        req.body = {
          "resource_feedback": {
            "state": 'requires_action',
            "messages": messages,
            "resource_updated_at": @product_updated_at,
            "feedback_generated_at": Time.zone.now.to_s
          }
        }.to_json
      end
      raise Faraday::ResourceNotFound, res.body unless res.success?

      true
    end

    def valid!
      res = Faraday.post("https://#{@shopify_domain}/admin/api/2021-07/products/#{@product_id}/resource_feedback.json") do |req|
        req.headers['Content-Type'] = 'application/json'
        req.headers['X-Shopify-Access-Token'] = @shopify_token
        req.body = {
          "resource_feedback": {
            "state": "success",
            "resource_updated_at": @product_updated_at,
            "feedback_generated_at": Time.zone.now.to_s
          }
        }.to_json
      end
      raise Faraday::ResourceNotFound, res.body unless res.success?

      true
    end
  end
end
