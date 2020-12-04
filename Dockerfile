ARG BASE_IMAGE
ARG BUILDER_IMAGE
ARG APP_NAME
ARG HEAP_SIZE
ARG SERVICE_NAME

FROM ${BUILDER_IMAGE}
WORKDIR /build

COPY . .
RUN ["npm", "run", "ci"]
ENV NODE_ENV production
ENV X_APP_NAME ${APP_NAME}
RUN ["npx", "run", "build"]
RUN ["npm", "prune", "--production"]

FROM ${BASE_IMAGE}

WORKDIR /app

COPY --from=0 /build/node_modules ./node_modules
COPY --from=0 /build/dist ./
COPY ./.deployment.env ./

## Attackers will not gain privileged access to container / host
USER node

ENV NODE_ENV production
ENV X_APP_HEAP_SIZE ${HEAP_SIZE}
ENV X_APP_SERVICE_NAME ${SERVICE_NAME}

## Adjust max node.js heap size. 
## Default behavior does not utilize the container resources properly.
## Reccomendation is to set this value to ~75 percent of the container resource,
## To allow other processes / paging / daemons some breathing room
CMD ["node", "--max-old-space-size=${X_APP_HEAP_SIZE}", "."]