#!/bin/bash

# Wait for MySQL container to be ready
/usr/local/bin/wait-for-it.sh laravel_mysql:3306 -t 60

# Run migrations
cd /var/www/html

# Run migrations
php artisan migrate

# Run tests
php artisan test

# Start the Laravel development server
php artisan serve --host=0.0.0.0 --port=8080