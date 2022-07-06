You will need a GitHub OAuth app from [here](https://github.com/settings/developers). Have the device flow option enabled and generate a client secret

## Running the app
#### For Android
Run these from your terminal/cli 

```git clone https://github.com/ianmunge0/make-crypto-mobile-hackathon.git```

```cd make-crypto-mobile-hackathon```

```git checkout governcelo```

```cd governcelo/codebase/governcelodapp/```

Rename ```.env.example``` file to ```.env```

Put your client id as the value of ```CLIENT_ID``` and client secret as the value of ```CLIENT_SECRET``` in your .env file

Resume to terminal/cli and run:

```yarn```

```expo run:android```