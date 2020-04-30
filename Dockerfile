ARG APP_NAME="myapp"

FROM node:12 AS build

COPY . ./

ARG APP_NAME
ENV REACT_APP_APP_NAME=$APP_NAME
RUN echo "ARGS is ${REACT_APP_APP_NAME}"

RUN yarn install
RUN yarn build

EXPOSE 3000

## Second stage image
FROM node:12
COPY package.json ./

ARG APP_NAME
ENV REACT_APP_APP_NAME=$APP_NAME
RUN echo "ARGS is ${REACT_APP_APP_NAME}"
# Move the UI server into ./build, and create a public/ folder to serve from
COPY --from=build public ./public
# Need to do this so the Firebase config can be generated at runtime (don't have to keep static credentials)
COPY --from=build scripts ./scripts
COPY --from=build node_modules ./node_modules

COPY --from=build build ./build
CMD yarn serve