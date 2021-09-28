# Dockerfile
FROM php:8.0-apache

EXPOSE 80

RUN mkdir /app
WORKDIR /app/

# PHP Extensions
RUN apt-get update -qq && \
    apt-get install -qy \
    git \
    gnupg \
    unzip \
    zip \
    libpq-dev
RUN docker-php-ext-install -j$(nproc) opcache pdo_pgsql
COPY conf/php.ini /usr/local/etc/php/conf.d/app.ini

# Apache
COPY conf/vhost.conf /etc/apache2/sites-available/000-default.conf
COPY conf/apache.conf /etc/apache2/conf-available/z-app.conf

COPY src/ /app/

RUN chown -R www-data:www-data /app/

RUN groupmod -g 998 www-data

RUN a2enmod rewrite remoteip && \
    a2enconf z-app
