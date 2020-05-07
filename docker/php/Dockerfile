FROM php:7.4-fpm

RUN apt-get update && apt-get install -y libpq-dev git unzip zlib1g-dev libzip-dev libjpeg62-turbo-dev libmcrypt-dev libpng-dev libonig-dev libcurl4-openssl-dev pkg-config libssl-dev
RUN docker-php-ext-install zip bcmath opcache
RUN docker-php-ext-enable zip bcmath opcache
RUN pecl install mongodb
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

ENV APP_ENV=prod \
    APP_SECRET=ca6777ca3b9d07d5a38d4f68036f232d \
    APP_SECRET=s$cretf0rt3s \
    ECORP_IDP_LOGIN_URL="http://ecorp.purpleclouds.pl/idp/login" \
    ECORP_AUTHORIZE_URI="http://ecorp.purpleclouds.pl/oauth/v2/auth" \
    ECORP_TOKEN_URI="http://ecorp.purpleclouds.pl/oauth/v2/token" \
    ECORP_CLIENT_ID="1_5ps4hydqvuo0gcwkccgcwgsksss80kc0kc8oks8w44w4kwg8co" \
    ECORP_CLIENT_SECRET="1t7ul5l62v8k8844cgscwc0w8kg4wcg8koosgosg0s48c48wkc" \
    ECORP_REDIRECT_URI="http://blog.purpleclouds.pl/oauth/v2/code" \
    MONGODB_CONNECTION="mongodb://mrrobot:root@blog_blog_purple_clouds_mongo_1:27017" \
    ASSETS_URL="http://purpleclouds.pl:8900/assets"

COPY ./composer.json ./
COPY ./composer.lock ./
COPY ./docker/php/php.ini /usr/local/etc/php/php.ini

RUN composer install --no-dev --no-scripts --ignore-platform-reqs --optimize-autoloader

RUN  mkdir -p /var/www/html/var/log/
COPY ./ /var/www/html

RUN chmod 777 -R /var/www/html
