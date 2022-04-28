## Running the app
Run these from your terminal/cli 

```git clone https://github.com/ianmunge0/make-crypto-mobile-hackathon.git```

```cd make-crypto-mobile-hackathon```

```git checkout governcelo```

```cd governcelo/codebase/governcelodapp/```

Rename ```.env.example``` file to ```.env```

Get your personal access token from https://github.com/settings/tokens . Make sure it has at least these three scopes.
-repo
-admin:org
-user:email

Put this personal access token as the value of ```P_A_TOKEN``` in your .env file

Resume to terminal/cli and run:

```yarn```

```expo start```