FROM composer:1.10.16 as composer-prod
WORKDIR /app
COPY ./composer.json ./
COPY ./composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-progress --no-suggest --ignore-platform-reqs

FROM php:7.4-fpm-alpine

RUN apk add --no-cache \
    $PHPIZE_DEPS \
    openssl-dev && \
    docker-php-ext-install bcmath && \
    docker-php-ext-enable bcmath && \
    docker-php-ext-install opcache && \
    docker-php-ext-enable opcache && \
    rm -rf /tmp/pear

RUN apk add --update npm yarn

RUN  mkdir -p /var/www/html/var/log/

COPY ./docker/php/php.ini /usr/local/etc/php/php.ini
COPY ./docker/php/php-fpm-pool.conf /etc/php7/php-fpm.d/www.conf

RUN pecl install mongodb

ENV APP_ENV=prod \
    APP_SECRET=ca6777ca3b9d07d5a38d4f68036f232d \
    APP_SECRET=s$cretf0rt3s \
    ECORP_IDP_LOGIN_URL="https://ecorp.purplecloud.pl/idp/login" \
    ECORP_AUTHORIZE_URI="https://ecorp.purplecloud.pl/oauth/v2/auth" \
    ECORP_TOKEN_URI="https://ecorp.purplecloud.pl/oauth/v2/token" \
    ECORP_CLIENT_ID="4_4s2r0jk457ok4sw4c84cog8go4sgwkk4s0gw084kos080kww08" \
    ECORP_CLIENT_SECRET="4zejysz8c000g80o8o04gwko80k8c4cc40840c0o4kgcsc0048" \
    ECORP_REDIRECT_URI="https://blog.purplecloud.pl/oauth/v2/code" \
    MONGODB_CONNECTION="mongodb://mrrobot:root@blog_blog_purple_clouds_mongo_1:27017" \
    ASSETS_URL="https://purplecloud.pl"

RUN  mkdir -p /var/www/html/var/log/
COPY ./docker/php/php.ini /etc/php7/conf.d/php.ini
COPY ./ /var/www/html
COPY --from=composer-prod /app/vendor /var/www/html/vendor

RUN yarn install
RUN yarn encore production

RUN chmod 777 -R /var/www/html
