FROM node:20

WORKDIR /usr/src/nuxt-app

# copy the app, note .dockerignore
COPY . ./

RUN npm install

RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD [ "node", "./.output/server/index.mjs" ]
