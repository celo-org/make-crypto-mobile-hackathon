# Cambridge Cryptgraphic's Codebase

Want to play around with our project? Here are some options:

## 1. Give me a live version!

Sure, just visit https://hackathon.cambridgecryptographic.com/

## 2. I want to deploy my own version

Sure, we have a docker ready setup that builds and runs a production version:

```
docker build -t proof-of-deposit .
docker run -p 443:3000 proof-of-deposit
```

Now just visit https://localhost/

## 3. I want to do it from scratch!

Wow, you sure are hardcore.

1. Install `nodejs` ([instructions here](https://nodejs.org/en/download/)). We personally used v16.13.0

2. Install `truffle` v5.4.0 (we encountered some deployment bugs on later versions)
    ```
    npm install -g truffle@5.4.0
    ```

3. Install modules to run our stuff
    ```
    cd contracts && npm install
    cd ../webapp && npm install
    ```

4. Deploy smart contracts
   ```
   cd ../contracts && truffle migrate --network alfajores
   ```

5. Copy ABIs to WebApp
    ```
    cp build/contracts/Election.json ../webapp/utils/abis/
    cp build/contracts/LockedCGLD.json ../webapp/utils/abis/
    cp build/contracts/LockedCUSD.json ../webapp/utils/abis/
    cp build/contracts/LockedCEUR.json ../webapp/utils/abis/
    ```

6. Start the WebApp in dev mode! 
    ```
    cd webapp && yarn run dev
    ```

7. Play around on http://localhost:3001/!!
