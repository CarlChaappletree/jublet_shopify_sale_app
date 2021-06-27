# frozen_string_literal: true

class HomeController < ApplicationController
  include ShopifyApp::EmbeddedApp
  include ShopifyApp::RequireKnownShop
  include ShopifyApp::ShopAccessScopesVerification

  def index
    @shop_origin = current_shopify_domain
    shop = Shop.where(shopify_domain: current_shopify_domain).first
    @shop_legal_agreement = if shop
                              shop.legal_agreement
                            else
                              false
                            end
  end
end
