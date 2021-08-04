ShopifyApp.configure do |config|
  config.application_name = 'Jublet sale channel app'
  config.api_key = ENV['SHOPIFY_API_KEY']
  config.secret = ENV['SHOPIFY_API_SECRET']
  config.old_secret = ''
  config.scope = 'read_products, read_product_listings, write_products, write_resource_feedbacks' # Consult this page for more scope options:
                                                                                                  # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  config.reauth_on_access_scope_changes = true
  config.embedded_app = true
  config.after_authenticate_job = false
  config.api_version = '2021-07'
  config.shop_session_repository = 'Shop'
  config.allow_jwt_authentication = true
  config.webhooks = [
    { topic: 'product_listings/remove', address: "#{ENV['APP_URL']}/webhooks/product_listings_remove", format: 'json' },
    { topic: 'product_listings/update', address: "#{ENV['APP_URL']}/webhooks/product_listings_update", format: 'json' },
    { topic: 'product_listings/add', address: "#{ENV['APP_URL']}/webhooks/product_listings_add", format: 'json' },
    { topic: 'app/uninstalled', address: "#{ENV['APP_URL']}/webhooks/app_uninstalled", format: 'json' }
  ]
end

# ShopifyApp::Utils.fetch_known_api_versions                        # Uncomment to fetch known api versions from shopify servers on boot
# ShopifyAPI::ApiVersion.version_lookup_mode = :raise_on_unknown    # Uncomment to raise an error if attempting to use an api version that was not previously known
