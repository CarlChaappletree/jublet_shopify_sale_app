module ShopifyProductValidatorHelper
  def product_approved?(product)
    (
      metafields_category_valid?(product) &&
      product_description_valid?(product) &&
      product_images_present?(product)
    )
  end

  private

  def metafields_category_valid?(product)
    product.metafields.any? { |m| m.namespace == 'sc-jublet' }
  end

  def product_description_valid?(product)
    product.body_html.present?
  end

  def product_images_present?(product)
    product.body_html.present?
  end
end
