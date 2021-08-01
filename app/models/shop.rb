# frozen_string_literal: true
class Shop < ActiveRecord::Base
  include ShopifyApp::ShopSessionStorageWithScopes

  validates :approved_products, numericality: { greater_than: 0 }
  validates :not_approved_products, numericality: { greater_than: 0 }

  def uninstall
    destroy
  end

  def uninstall!
    destroy!
  end

  def api_version
    ShopifyApp.configuration.api_version
  end


  def increment_with_sql!(attribute, by = 1)
    raise ArgumentError("Invalid attribute: #{attribute}") unless attribute_names.include?(attribute.to_s)
    original_value_sql = "CASE WHEN #{attribute} IS NULL THEN 0 ELSE #{attribute} END"
    self.class.update_all("#{attribute} = #{original_value_sql} + #{by.to_i}")
    reload
  end
end
