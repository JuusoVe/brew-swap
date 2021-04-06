# homebrew-swap

![icon](/client/public/black.png)

This is a hobbyist project for trading homebrews (the malt+yeast kind, not the fruit-kind).

## Features

*updated 6.4.2021*

### User management

- Register + login
- Reset password
- Change account details

### Offers for users without registered account

- View active offers on the map
- Offer details view 
- Send a message to the brewer

### Offers for registered users

- Create offer with location picker, image upload and other normal form functionality
- View my offers with active toggle, copy and edit options
- Receive emails about offers to provided email


# Stack summary

## Front-end

React, Typescript, Material-UI, Redux toolkit

[package.json](./client/package.json) for full details

## Back-end

Express, Typescript, MongoDB Atlas, Mongoose, Passport.js

[package.json](./server/package.json) for full details

## DevOps

Fully automated with [Github Actions](https://github.com/features/actions):

On all pull requests:
- Install, lint and build front-end. Move build folder to back-end to be served via Express for tests.
- Install, lint, build and start back-end in test mode (with static front-end included)
- Run full e2e tests with [Cypress](https://www.cypress.io/)

On pushes/merges to main:
- Deploy back-end to [Heroku](https://www.heroku.com). Revert to previous version on fail.
- Deploy front-end to [Azure Static Web Apps](https://azure.microsoft.com/en-us/services/app-service/static/)live. Revert to previous version on fail.
- Bump version on success

[pipeline.yml](/github/workflows/pipeline.yml) for full details

## APIs

[Google Maps](https://developers.google.com/maps/documentation/javascript/overview), [Sendgrid](https://sendgrid.com/docs/api-reference/), [Cloudinary](https://cloudinary.com/documentation/image_upload_api_reference)

# See it live:

[homebrewswap.app](https://www.homebrewswap.app)




