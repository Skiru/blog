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
    ECORP_CLIENT_ID="1_251s6do5d36sw8gsw80ksw4cok4oc44o40c0gg00o88g0s4k0c" \
    ECORP_CLIENT_SECRET="1k0sws4tirq8k80kcgggw0go044sw8sksw8c8s8kkks8o80woc" \
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
