FROM php:8.1-fpm

RUN usermod -u 1000 www-data
RUN usermod -G staff www-data

RUN apt-get update && \
    apt-get install -y debian-archive-keyring libonig-dev libpng-dev libjpeg-dev libpq-dev git zip unzip sudo wget curl sqlite3 python3 libsqlite3-dev libcurl4-gnutls-dev gnupg libzip-dev libzstd-dev && \
    rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-jpeg=/usr
RUN docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd
RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
RUN docker-php-ext-configure mysqli --with-mysqli=mysqlnd

RUN yes | pecl install igbinary

RUN docker-php-ext-install pdo && \
    docker-php-ext-install pdo_mysql && \
    docker-php-ext-install mysqli && \
    docker-php-ext-install pgsql && \
    docker-php-ext-install pdo_pgsql && \
    docker-php-ext-install pdo_sqlite && \
    docker-php-ext-install gd && \
    docker-php-ext-install mbstring && \
    docker-php-ext-install opcache && \
    docker-php-ext-install zip && \
    docker-php-ext-install calendar && \
    docker-php-ext-install sockets && \
    docker-php-ext-install pcntl && \
    docker-php-ext-enable igbinary

RUN { \
    echo 'opcache.memory_consumption=128'; \
    echo 'opcache.interned_strings_buffer=8'; \
    echo 'opcache.max_accelerated_files=4000'; \
    echo 'opcache.revalidate_freq=2'; \
    echo 'opcache.fast_shutdown=1'; \
    echo 'opcache.enable_cli=1'; \
    echo 'opcache.load_comments=1'; \
    } >> /usr/local/etc/php/conf.d/docker-php-ext-opcache.ini

RUN { \
    echo 'upload_max_filesize=256M'; \
    echo 'post_max_size=256M'; \
    echo 'memory_limit = 512M'; \
    echo 'display_errors=0'; \
    echo 'log_errors=1'; \
    echo 'error_log=/tmp/php_errors.log'; \
    } >> /usr/local/etc/php/conf.d/docker-php-core.ini

RUN rm -rf /var/www/html \
    && chmod 0777 /tmp/

RUN rm -rf /var/cache/apk/*

# composer
RUN set -eu; \
    EXPECTED_CHECKSUM="$(php -r 'copy("https://composer.github.io/installer.sig", "php://stdout");')"; \
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"; \
    ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")"; \
    if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]; \
    then \
    >&2 echo 'ERROR: Invalid installer checksum'; \
    rm composer-setup.php; \
    exit 1; \
    fi; \
    php composer-setup.php --quiet --install-dir=/usr/local/bin --filename=composer; \
    RESULT=$?; \
    rm composer-setup.php; \
    exit $RESULT;

# nodejs
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get -y install nodejs
