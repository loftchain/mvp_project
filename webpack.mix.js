let mix = require('laravel-mix');

mix.setPublicPath('./');
mix.js('./vue_app/app', 'public/js')
  .sass('./vue_app/app.scss', 'public/css');


