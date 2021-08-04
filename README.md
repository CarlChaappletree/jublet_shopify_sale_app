## Quick Start

To run this app locally, you can clone this repository and do the following.

1. Create a `.env` file to specify this app's `API key` and `API secret key` app credentials that can be found in the Shopify Partners dashboard.

```
SHOPIFY_API_KEY=<The API key app credential specified in the Shopify Partners dashboard>
SHOPIFY_API_SECRET=<The API secret key app credential specified in the Shopify Partners dashboard>
APP_URL=<The app URL specified in the Shopify Partners dashboard>
```

> **Note:** If you do not have an API key or an API secret key, see the following sections of the [Build a Shopify App with Node and React](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#get-a-shopify-api-key) guide.
>
> > **Important**: This guide names its API secret key environment variable `SHOPIFY_API_SECRET_KEY` rather than `SHOPIFY_API_SECRET`. The Shopify App gem uses the latter.
>
> 1. [Expose your dev environment](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#expose-your-dev-environment)
> 2. [Get a Shopify API Key and Shopify API secret key](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#get-a-shopify-api-key)
> 3. [Add the Shopify API Key and Shopify API secret key](https://shopify.dev/tutorials/build-a-shopify-app-with-node-and-react/embed-your-app-in-shopify#add-the-shopify-api-key)

2. Run the following to install the required dependencies.

```console
$ bundle install
$ yarn install
$ rails db:migrate
```

3. Run the following to start the app.

Run ngrok.io

```console
$ shopify rails tunnel start
```

Run ngrok with default port

```console
$ rails s -p 8081
```

4. Shopify webhook
   a. Generate an webhook with commend (shopify_app gem)
   b. Check <APP_URL> env value in .env to be the same url
   c. Turn on or restart the sidekiq
   ```console
     bundle exec sidekiq
   ```

Trouble shooting

- Check sidekiq running
- Reinstall the app on the shopify

5. Testing

- Some testing rely on shopify server to generate API calls so <SHOPIFY_TEST_TOKEN> must be the same as your current dev shop token

- VCR

  - Debug note
    a. Does not keep c.allow_http_connections_when_no_cassette = false. It means if there are no cassette, it calls http request without mock data. The best way is that we mock every single http request.
    b. Better not use c.ignore_request { url } because we should mock every single request to make all data consistent.
    c. A debug example
