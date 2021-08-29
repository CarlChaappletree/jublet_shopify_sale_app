require 'faraday'

module Jublet
  class ProductConvertor
    def initialize(shopify_product:)
      @product = shopify_product # <Object>
      # Vendor should update with user token on the fly
      # @vendor_id = vendor_id # <Integer>
    end

    def call!
      {
        "product": {
          "shopify_product_id": @product['id'],
          "name": @product['title'],
          "description": @product['title'],
          "slug":  @shopify_product['handle'],
          "price": 19.99,
          "option_types": ['size', 'color'],
          "shipping_category_id": 1,
          "taxon_ids": [2],
          "product_link": 'Jublet.com',
          "product_image_src": 'shopify.product.image',
          "variants": variants_creator(@product['variants'])
        }
      }

      private

      def variants_creator(variants)
        return [] if variants.empty?

        array = []
        variants.each do |v|
          array.push({
            "is_master": 0,
            "track_inventory": true,
            "price": v['price'],
            "total_count_on_hand": v[],
            "options": [
              {
                "name": 'size',
                "value": 'small'
              },
              {
                "name": 'color',
                "value": 'black'
              }
            ]
          })
        end
        array
      end
    end
  end
end
