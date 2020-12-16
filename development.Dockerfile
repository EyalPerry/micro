ARG BASE_IMAGE

FROM ${BASE_IMAGE}
ENV NODE_ENV development

VOLUME /app
WORKDIR /app
EXPOSE 3000

CMD ["npm", "run", "watch"]