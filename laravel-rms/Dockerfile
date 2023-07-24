# Use the official PHP image as the base image
FROM php:8.0-cli

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    git \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy the Laravel application files to the container
COPY . /var/www/html

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Laravel dependencies
RUN composer install

# Copy the entry point shell script to the container
COPY docker-entrypoint.sh /usr/local/bin/

# Set the execution permission for the entry point script
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Download the wait-for-it.sh script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Expose port 8000 (the default Laravel development server port)
EXPOSE 8080

# Set the entry point to execute the shell script
ENTRYPOINT ["docker-entrypoint.sh"]

