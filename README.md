# Reality SF Airtable Proxy

This is a Node.js express proxy server between Reality SF Community Group administrative forms and our Airtable database.

## Authentication

Requests are authenticated using json web tokens (JWT). Each json web token identifies the user by email address. This proxy server then issues API calls to Airtable itself via its own API Key.

## Development

To run during development, use `npm start`. You'll need to define the following environment variables:

| name | value |
| --- | --- |
| `AIRTABLE_API_KEY` | The API key for Airtable |
| `AIRTABLE_CG_BASE` | The base workspace for the corresponding Airtable instance |
| `AIRTABLE_BACKEND_BASE` | The base workspace for our Airtable backend tables |
| `JWT_SIGNING_KEY` | The signing key used for creating and validating JSON web tokens |
| `ZAPIER_WEBHOOK_URL` | The webhook used to sending emails |
| `PUBLIC_URL` | The URL that our form lives at |

## Deployment

Deployment happens through heroku. This app is deployed to two environments, staging and production. To set up your environment for deploys, you'll want to first have downloaded heroku's CLI for your OS: https://devcenter.heroku.com/articles/heroku-cli#download-and-install

Once that's complete, set up your remotes by running these commands within your git repo:

```bash
heroku login
heroku git:remote -a staging-rsf-airtable-proxy -r staging
heroku git:remote -a rsf-airtable-proxy -r production
```

This will allow you to deploy to staging and production, respectively. To deploy to the respective environment, run the commands below within the `master` branch. Note that this pushes up your current git `HEAD` (e.g. the latest commit).

```bash
# To deploy to staging
git push staging

# To deploy to production
git push production
```
