# Book Genre Prediction App

This application utilizes a machine learning model developed by Group 9 in ECS 171 Fall 2021 to take a book description/summary as input and return the predicted genre(s) of the book.

https://book-genre-prediction.herokuapp.com/

## Development Info

Application utiliizes Angular for UI/Frontend element and Python for Backend and Flask for the webserver. Application is configured so that the Angular Frontend is served via Flask to keep the project running as a single service due to restrictions with how Heroku, the application host service, encapsulates and isolates their `Dynos` which are what they call their processes. Otherwise a flask server for the backend could talk to an express server for the frontend.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.11.

## Development server

Run `gunicorn wsgi:app` with appropriate dependencies installed to run application locally, this is also how it is deployed on Heroku. Make sure to use `ng build --configuration=production` prior to launching the webserver (gunicorn) for the first time. You also want to re-build after you make any changes locally for them to show up when you restart the webserver.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
