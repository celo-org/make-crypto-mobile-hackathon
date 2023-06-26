Need a GitHub OAuth app from [here](https://github.com/settings/developers). Have the device flow option enabled and generate a client secret

Install the Valora mirror app for the Alfajores network from [here](https://play.google.com/store/apps/details?id=org.celo.mobile.alfajores) and set up a wallet

## Running the app
Run these from terminal/cli 

```git clone https://github.com/ianmunge0/make-crypto-mobile-hackathon.git```

```cd make-crypto-mobile-hackathon```

```git checkout governcelo```

```cd governcelo/codebase/governcelodapp/```

Rename ```.env.example``` file to ```.env```

Put client ID as the value of ```CLIENT_ID``` and client secret as the value of ```CLIENT_SECRET``` in .env file

Resume to terminal/cli and run:

```yarn```

#### Android
```yarn android```

#### iOS
```yarn ios```