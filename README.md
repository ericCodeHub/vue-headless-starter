# Solution Agency Vue + headless WP starter template

This is in beta and is based on [Alex MacArthur's WP Vue starter](https://macarthur.me/)

## Install

In the root of the project, run `npm install`.

## Usage

### Set Your Environment Variables

Various important values are loaded into the application via Node environment variables, which you'll need to define. Locally, run `cp .env.sample .env.local` to create a local file for defining the following:

- `REST_ENDPOINT` - The WordPress REST API endpoint from which data will be pulled. Leave off the trailing slash. Example: `https://blah-blah-blah.com/wp-json/wp/v2`
- `POSTS_PER_PAGE` - The default number of posts per page that will be displayed.
- `GA_TRACKING_ID` - A Google Analytics tracking ID.
- `REQUEST_CACHE_MAX` - The maximum number of AJAX requests that will be cached in memory.
- `GF_USERNAME` and `GF_PASSWORD` - Gravity Form keys for form read access that we will give you.

### Spin Up Locally

Run `npm run serve` to spin up a running version from localhost.

### Build for Production

Run `npm run build`.