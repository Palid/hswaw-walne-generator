FROM node:current-alpine as builder

# install and cache app dependencies
WORKDIR /app/
COPY . /app/
RUN node --version
RUN npm install
RUN npm run build

# ------------------------------------------------------
# Production Build
# ------------------------------------------------------
FROM node:current-alpine
WORKDIR /app
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/build /app/build
COPY --from=builder /app/node_modules /app/node_modules
CMD node "/app/build"
