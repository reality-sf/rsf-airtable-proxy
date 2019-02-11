# Reality SF Airtable Proxy

This is a Node.js express proxy server for Reality SF Community Group administrative forms. This application allows a Community Group leader to update their community group's information on Reality SF's spreadsheets (hosted on Airtable), while allowing us to maintain the privacy of other community groups, and any other information held on the spreadsheet.

## Architecture

There are two main pieces to the application; the UI (https://github.com/reality-sf/rsf-cg-forms), and the backend (this repo). The UI is a single page application in React, and interacts with the backend via AJAX calls.

The backend is mostly a thin proxy around Airtable's own API, which exchanges per-user JWT's with its own all-permissive API token.

### Authentication

A user "logs in" via being sent a login link to their email address. The process for logging in is:

1. The user enters their email into the UI
2. The UI makes a `POST /email_login_link` with the user's email address
3. The backend queries for a `People` airtable record for a matching email
4. The backend creates a `token` airtable record, including the email address, and the corresponding user's name
5. The backend calls out to a Zapier webhook that a link to the user, including the created token in the query parameter position.
6. The user clicks the link, which takes them back to the UI.
7. The UI makes a `PUT /login` call to the backend with the token
8. The backend queries for the provided token in the tokens airtable sheet.
9. The backend destroys airtable `token` records that have been minted for the user, and creates a JSON web token (JWT) with an expiry of one day
10. The backend sends the JWT back to the UI

The implications of logging in are:

1. We have verified who this user is, via their email address
2. Any past login links sent to this email address no longer work
3. They are "logged in" for one day. After one day is up, they'll have to "log in" again.

### JSON web tokens

All HTTP requests are authenticated using JSON Web Tokens, which are sent as an `Authorization` header. Learn more about JWT's here: https://jwt.io/.

## Updating a Community Group's "capacity available"

We want Community Group leaders to be able to provide information to Reality about how many new members they can absorb, while also easily being able to track and update these numbers as people get placed into them.

In Airtable, we have two fields that track this number: "Capacity Remaining" and "Capacity Available", with these semantics:

| Field | Description |
| --- | --- |
| `Capacity Available` | The # that a Community Group leader provides to Reality about the total number they can accept. |
| `Capacity Remaining` | A function of `Capacity Available`, subtracted by the number of `CG Placement Request`s that have been placed into this group. |

If the `Capacity Available` field gets updated, the backend will automatically archive all `CG Placement Request` records for that CG.

Here's an example of how the capcity of a Community Group is updated, over the lifecycle of two seasons:

1. Sarah is the leader of the Sunset 1 CG. She declares that she can accept 3 new members. 
2. John and Sudhir are placed into the Sunset 1 CG. Reality SF creates `CG Placement Request` records, and marks them as placed into Sunset 1. This updates the `Capacity Remaining` value to 1.
3. The next season starts, and Sarah once again visits the form to update her CG's capacity. She sees the `Capacity Remaining` count as the default value of her CG's capacity.
4. Sarah updates this number to 2.
5. John and Sudhir's `CG Placement Request` records are archived, and Sunset 1's `Capacity Available` field is updated to 2. The `Capacity Remaining` field is also 2, because the previous placements have been archived.

## Development

To run during development, use `npm start`. You'll need to define the following environment variables:

| name | value |
| --- | --- |
| `AIRTABLE_API_KEY` | The API key for Airtable |
| `AIRTABLE_CG_BASE` | The base workspace for the corresponding Airtable instance |
| `AIRTABLE_BACKEND_BASE` | The base workspace for our Airtable backend tables |
| `JWT_SIGNING_KEY` | The signing key used for creating and validating JSON web tokens. This can be any value that you want. |
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

## Environments

| Description | Staging | Production |
| --- | --- | --- |
| URL | https://staging-rsf-airtable-proxy.herokuapp.com | https://rsf-airtable-proxy.herokuapp.com |
| Heroku Dashboard | https://dashboard.heroku.com/apps/staging-rsf-airtable-proxy | https://dashboard.heroku.com/apps/rsf-airtable-proxy |
| Airtable CG's | [Dev - Reality SF CG's](https://airtable.com/tblinCnvetqch8CUi/viwPWZvWpqU8Pc9bB) | TBD |
| Airtable CG | [Dev - CG Backend](https://airtable.com/tblloeeNHLNfEtewH/viwYP1N3XZUkCkexe) | [Prod - CG Backend](https://airtable.com/tblkRfVHJg2SWNQmV/viw08Ugl5bomWg53r) |