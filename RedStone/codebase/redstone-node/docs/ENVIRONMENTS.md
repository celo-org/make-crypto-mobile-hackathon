# RedStone Node environments

RedStone node environments (modes) help to differentiate node configuration for different purposes.

There are 2 main environments, that are already created in the RedStone node:
- PROD (should be used for real long-term node deployment)
- LOCAL (should be used for tests, development and experiments)

Production environment automatically enables services, that are not useful in local environment, such as:
- error reporting
- performance tracking
- publishing on Arweave

## How to configure environments

### Using environment variables
Environments can be configured using environment variable `MODE`. Set it to `PROD` to run redstone node in production environment or to `LOCAL` to run redstone node locally.

### Other environment variables
- **ENABLE_JSON_LOGS** - set this variable to `true` to enable logging in JSON format. It is recommended to set it to `true` if you run the node in production environment.
- **PERFORMANCE_TRACKING_LABEL_PREFIX** - human-friendly name that will be appended to the performace tracking labels. (Examples: `main` for `redstone` provider, `stocks` for `redstone-stocks`, `rapid` for `redstone-rapid` provider)

### Configure in Docker
Dockerfiles are used to build docker images, which are usually executed in Production environment. To configure production environment `ENV` instruction should be added to a Dockerfile.
```dockerfile
ENV MODE=PROD
ENV ENABLE_JSON_LOGS=true
ENV PERFORMANCE_TRACKING_LABEL_PREFIX=stocks
```
