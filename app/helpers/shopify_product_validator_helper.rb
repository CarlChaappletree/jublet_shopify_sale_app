module ShopifyProductValidatorHelper
  def product_approved?(product)
    (product.metafields.any? { |m| m.namespace == 'sc-jublet' } &&
      product.body_html.present? &&
      product.images.present?)
  end
end
