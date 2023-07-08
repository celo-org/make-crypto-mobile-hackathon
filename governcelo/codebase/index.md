Need a GitHub OAuth app from [here](https://github.com/settings/developers). Have the device flow option enabled and generate a client secret

Install the Valora mirror app for the Alfajores network from [here](https://play.google.com/store/apps/details?id=org.celo.mobile.alfajores) and set up a wallet

Register Governcelo as a project in your WalletConnect Cloud account [here](https://cloud.walletconnect.com/sign-in)

## Running the app
Run these from terminal/cli 

```git clone https://github.com/ianmunge0/make-crypto-mobile-hackathon.git```

```cd make-crypto-mobile-hackathon```

```git checkout governcelo```

```cd governcelo/codebase/governcelodapp/```

Rename ```.env.example``` file to ```.env```

Put client ID and client secret from GitHub as the values of ```CLIENT_ID```  and ```CLIENT_SECRET``` respectively in the .env file. Put the project's ID, name and description from WalletConnect Cloud as the values of `PROJECT_ID`, `PROJECT_NAME` and `PROJECT_DESCRIPTION` respectively in the .env file.

Resume to terminal/cli and run:

```yarn```

#### Android
```yarn android```

#### iOS
```yarn ios```