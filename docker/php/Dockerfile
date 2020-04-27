FROM php:7.4-fpm

RUN apt-get update && apt-get install -y libpq-dev git unzip zlib1g-dev libzip-dev libjpeg62-turbo-dev libmcrypt-dev libpng-dev libonig-dev libcurl4-openssl-dev pkg-config libssl-dev
RUN docker-php-ext-install zip bcmath opcache
RUN docker-php-ext-enable zip bcmath opcache
RUN pecl install mongodb
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ENV APP_ENV=prod \
    APP_SECRET=ca6777ca3b9d07d5a38d4f68036f232d \
    APP_SECRET=s$cretf0rt3s \
    ECORP_IDP_LOGIN_URL="http://ecorp.purpleclouds.local/idp/login" \
    ECORP_AUTHORIZE_URI="http://ecorp.purpleclouds.local/oauth/v2/auth" \
    ECORP_TOKEN_URI="http://ecorp.purpleclouds.local/oauth/v2/token" \
    ECORP_CLIENT_ID="1_1p4ny5gyjmv488csc8oc44w48oo4k00wkkksgk80k0c0wo8gco" \
    ECORP_CLIENT_SECRET="4fkoqjt0hzeoc484sgwgk440so8kogo0w0oow0kwkw8s0oko8c" \
    ECORP_REDIRECT_URI="http://blog.purpleclouds.local/oauth/v2/code" \
    MONGODB_CONNECTION="mongodb://mrrobot:root@blog_blog_purple_clouds_mongo_1:27017"

COPY ./composer.json ./
COPY ./composer.lock ./
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini

RUN composer install --no-dev --no-scripts --ignore-platform-reqs --optimize-autoloader

RUN  mkdir -p /var/www/html/var/log/
COPY ./ /var/www/html

RUN chmod 777 -R /var/www/html
