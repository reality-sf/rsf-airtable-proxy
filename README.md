# Reality SF Airtable Proxy

This is a Node.js express proxy server between our Community Group forms and our Airtable database.

## Authentication

Requests are authenticated using json web tokens (JWT). Each json web token identifies the user by email address. This proxy server then issues API calls to Airtable itself via its own API Key.

## Development

To run during development, use `npm start`. You'll need to define the following environment variables:

| name | value |
| --- | --- |
| `AIRTABLE_API_KEY` | The API key for Airtable |
| `AIRTABLE_CG_BASE` | The base workspace for the corresponding Airtable instance |