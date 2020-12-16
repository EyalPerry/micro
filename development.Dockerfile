ARG BASE_IMAGE

FROM ${BASE_IMAGE}
ENV NODE_ENV development

VOLUME /app
WORKDIR /app

CMD ["npm", "run", "watch"]