FROM bitnami/nginx:latest

USER 0

COPY ./docker/assets/nginx.conf /opt/bitnami/nginx/conf/server_blocks/nginx.conf

RUN mkdir -p /static/assets
RUN mkdir -p /static/assets/uploads

COPY ./public/assets /static/assets

RUN chmod 777 -R /static/assets
