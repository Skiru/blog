FROM composer:1.10.16 as composer-prod
WORKDIR /app
COPY ./composer.json ./
COPY ./composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-progress --no-suggest --ignore-platform-reqs

FROM mkoziol/purpleclouds:php-base

ENV APP_ENV=prod \
    APP_SECRET=ca6777ca3b9d07d5a38d4f68036f232d \
    APP_SECRET=s$cretf0rt3s \
    ECORP_IDP_LOGIN_URL="https://ecorp.purplecloud.pl/idp/login" \
    ECORP_AUTHORIZE_URI="https://ecorp.purplecloud.pl/oauth/v2/auth" \
    ECORP_TOKEN_URI="https://ecorp.purplecloud.pl/oauth/v2/token" \
    ECORP_CLIENT_ID="1_5u4eu250w64ggcw00484g4w8sc4s8kog4040owk8k48scs84oo" \
    ECORP_CLIENT_SECRET="5rkau3utb10cg84so400wwc8ocs4ggg40c4c0880k8484wwks4" \
    ECORP_REDIRECT_URI="https://blog.purplecloud.pl/oauth/v2/code" \
    MONGODB_CONNECTION="mongodb://mrrobot:root@blog_blog_purple_clouds_mongo_1:27017" \
    ASSETS_URL="https://purplecloud.pl"

COPY ./ /var/www/html
COPY --from=composer-prod /app/vendor /var/www/html/vendor

RUN yarn install
RUN yarn encore production

RUN rm -rf /var/www/html/public/assets/build/*
COPY ./public/assets/build /var/www/html/public/assets/build

RUN chmod 777 -R /var/www/html
