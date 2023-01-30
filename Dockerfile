FROM trafex/php-nginx:latest

# Install composer from the official image
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Install node.js
USER root
RUN apk add --update nodejs npm
USER nobody