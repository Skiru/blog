FROM nginx:latest

COPY ./docker/assets/default.conf /etc/nginx/conf.d/default.conf
COPY ./public /static

RUN chmod 777 -R /static