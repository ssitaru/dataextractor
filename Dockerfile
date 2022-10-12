FROM mhart/alpine-node:16

VOLUME /app/data

COPY . /app
WORKDIR /app
RUN npm i && npm run build

ENTRYPOINT npm run start

EXPOSE 8182