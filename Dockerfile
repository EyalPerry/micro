ARG BASE_IMAGE
ARG BUILDER_IMAGE
ARG APP_NAME
ARG HEAP_SIZE

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
## The tradeoff is that you cant use some ports, such as 80.
USER node

ENV NODE_ENV production
ENV X_APP_NODE_HEAP_SIZE ${HEAP_SIZE}

## Adjust max node.js heap size. 
## Default behavior does not utilize the container resources properly.
## Reccomendation is to set this value to ~75 percent of the container resource,
## To allow other processes / paging / daemons some breathing room
CMD ["node", "--max-old-space-size=${X_APP_NODE_HEAP_SIZE}", "."]