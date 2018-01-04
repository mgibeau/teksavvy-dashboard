# TekSavvy Dashboard

A completely over-engineered dashboard for tracking TekSavvy bandwidth usage.

It is based on react-create-app.


## Getting Started

`docker run -d -p 3000:3000 -e TSI_API_KEY={YOUR API KEY} maxjbo/teksavvy-dashboard`

You will now be able to access the dashboard at `http://host:3000`


## Configuration

You will need to get your API key from the [customer portal](https://myaccount.teksavvy.com/ApiKey/ApiKeyManagement) and
add it to the [package.json](/package.json#L26).

By default it assumes a 200GB bandwidth limit. You can change it from the UI,
or change the default through an environment variable, e.g.:

`export TSI_BANDWIDTH_LIMIT=400`


## Running locally

Make sure you have installed [Node.js](https://nodejs.org/) 8+ and [yarn](https://yarnpkg.com/).

```sh
# Install dependencies
yarn install

# Start the application
yarn start
```

## Legal

<sub>TekSavvy is a trademark of [TekSavvy Solutions Inc.](https://teksavvy.com/).
This project is in no way affiliated with, authorized, maintained, sponsored or endorsed by TekSavvy or any of its affiliates or subsidiaries. I, the project owner and creator, am not responsible for any legalities that may arise in the use of this project. Use at your own risk. </sub>
