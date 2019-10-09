FROM node:12-alpine

# Set working directory and permissions on it
ENV APP_DIR /usr/src/enjoyingredients
RUN mkdir -p ${APP_DIR} && chown -R node:node ${APP_DIR}
WORKDIR ${APP_DIR}

# Install node dependencies
COPY package*.json ./
USER node
RUN npm ci

# Copy the source code and build it production-ready
COPY --chown=node:node . .
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["npm", "run", "start"]
