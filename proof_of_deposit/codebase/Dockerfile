FROM node:16.13.0

# install truffle for deploying contracts
RUN npm install -g truffle@5.4.0

# copy stuff over
RUN mkdir /code
COPY contracts /code/contracts
COPY webapp /code/webapp

# install modules
RUN cd /code/contracts && npm install
RUN cd /code/webapp && npm install

# deploy contracts and copy abis over to webapp
RUN cd /code/contracts && truffle migrate --network alfajores --reset && \
    cp build/contracts/Election.json ../webapp/utils/abis/ && \
    cp build/contracts/LockedCGLD.json ../webapp/utils/abis/ && \
    cp build/contracts/LockedCUSD.json ../webapp/utils/abis/ && \
    cp build/contracts/LockedCEUR.json ../webapp/utils/abis/

ENV NODE_ENV=production
# patch usecontract-kit before building
RUN cd /code/webapp && \
    cp usecontract-kit-patch/connect.js node_modules/\@celo-tools/use-contractkit/lib/modals/ && \
    yarn run build

# create certs for ssl
RUN cd /code/webapp && openssl req -x509 -out certs/localhost.crt -keyout certs/localhost.key \
  	-newkey rsa:2048 -nodes -sha256 \
  	-subj '/CN=localhost' -extensions EXT -config certs/openssl.cnf

WORKDIR /code/webapp
ENTRYPOINT node server.js