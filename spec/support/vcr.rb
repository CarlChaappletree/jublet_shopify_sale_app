VCR.configure do |c|
  c.cassette_library_dir = 'spec/cassettes'
  c.hook_into :webmock
  c.configure_rspec_metadata!
  c.allow_http_connections_when_no_cassette = false
  # ChromeDriver will make requests to chromedriver.storage.googleapis.com
  # to (I believe) check for updates. These requests will just show up as
  # noise in our cassettes unless we tell VCR to ignore these requests.
  c.ignore_hosts "chromedriver.storage.googleapis.com"
  # c.ignore_request { 'https://sync-app-02.myshopify.com/admin/api/2020-07/shop.json' }

  c.filter_sensitive_data("<STRIPE_API>") do
    ENV['STRIPE_API_KEY']
    # or $credentials['somesite']['password'] or whatever
  end
end
