# Book Genre Prediction App

This application utilizes a machine learning model developed by Group 9 in ECS 171 Fall 2021 to take a book description as input and return a predicted genre of book.

https://book-genre-prediction.herokuapp.com/

## Development Info

Application utiliizes Angular for UI/Frontend element and Python for Backend and Flask for the webserver. Application is configured so that the Angular Frontend is served via Flask to keep the project running as a single service due to restrictions with how Heroku, the application host service, encapsulates and isolates their `Dynos` which are what they call their processes. Otherwise a flask server for the backend could talk to an express server for the frontend.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.11.

## Development server

Run `gunicorn wsgi:app` with appropriate dependencies installed to run application locally, this is also how it is deployed on Heroku.

Run `ng serve` for a dev server. (This will serve through Angular not Flask as we have it deployed on Heroku) Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
