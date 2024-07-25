# Proyecto-DAW
Laravel 10 API.

### Models
* User
* Product
* Provider
* Contact
* Format
* Category

#### Usage
Clone the project via git clone or download the zip file.
```
git clone git@github.com:samartin4/proyecto-daw-api.git
```
##### .env
Copy the example env file and make the required configuration changes in the .env file
##### Composer Install
Install all the dependencies using composer
```
composer install
```
##### Generate Key
Generate a new application key
```
php artisan key:generate
```
##### Run Migrations
Run the database migrations
```
php artisan migrate
```
Or empty the database and then run the migrations
```
php artisan migrate:fresh
```
##### Database Seeding
Run the following command to seed the database with dummy content.
```
php artisan db:seed
```

### API EndPoints
##### Product
* Product POST Create `/api/v1/products`
* Product GET Index `/api/v1/products`
* Product GET Show `/api/v1/products/{id}`
* Product PUT Update `/api/v1/products/{id}`
* Product DELETE Destroy `/api/v1/products/{id}`
##### Format
* Product POST Create `/api/v1/formats`
* Product GET Index `/api/v1/formats`
* Product GET Show `/api/v1/formats/{id}`
* Product PUT Update `/api/v1/formats/{id}`
* Product DELETE Destroy `/api/v1/formats/{id}`
##### Category
* Product POST Create `/api/v1/categories`
* Product GET Index `/api/v1/categories`
* Product GET Show `/api/v1/categories/{id}`
* Product PUT Update `/api/v1/categories/{id}`
* Product DELETE Destroy `/api/v1/categories/{id}`
##### Auth
* Register POST Store `/register`
* Login POST Store `/login`
* Forgot password POST Store `/forgot-password`
* Reset password POST Store `/reset-password`
* Verify email GET `/verify-email/{id}/{hash}`
* Verification notification POST store `/email/verification-notification`
* Logout POST destroy `/logout`


