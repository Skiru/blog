FROM bitnami/nginx:latest

COPY ./docker/assets/nginx.conf /opt/bitnami/nginx/conf/nginx.conf

RUN mkdir /static/assets
RUN mkdir /static/assets/uploads

COPY ./public/assets /static/assets

RUN chmod 777 -R /static/assets
