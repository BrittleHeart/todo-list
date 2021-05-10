FROM node:16-alpine3.11

LABEL maintainer="Bartosz Pazdur <b.pazdur@yahoo.com>"
LABEL version="1.0"
LABEL description="Image for study project for Silesian University of Zabrze. For faculty management and organization"

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3500

ENTRYPOINT [ "npm", "run", "dev" ]