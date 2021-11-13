# Book Genre Prediction App

This application utilizes a machine learning model developed by Group 9 in ECS 171 Fall 2021 to take a book description/summary as input and return the predicted genre(s) of the book.

https://book-genre-prediction.herokuapp.com/

## Development Info

Application utiliizes Angular for UI/Frontend element and Python for Backend and Flask for the webserver. Application is configured so that the Angular Frontend is served via Flask to keep the project running as a single service due to restrictions with how Heroku, the application host service, encapsulates and isolates their `Dynos` which are what they call their processes. Otherwise a flask server for the backend could talk to an express server for the frontend.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.11.

## Development server

Instructions for Linux:
In the terminal go to the project directory, I recommend setting up a virtual environment to keep the package dependencies controlled, you will need to have `nodejs` and `npm` installed in order to handle the packages. At that point, you should be able to run `npm install` to download package dependecies that are outlined in `packages.json`.

Once packages are installed, run `ng build --configuration=production` in order to build the application. After that, run `gunicorn wsgi:app` to host the application locally. Depending on how you port bind `gunicorn` it should be available at `localhost:8000` in your web-browser.

The trained NN model had to be stored in AWS S3 bucket due to its sheer size. As a result we have to use `awscli` when running locally and have console aws credentials set via `aws configure` in order for the code to be able to download the model when it starts up. There is an AWS IAM User, genre-prediction-app, that has a key setup whose credentials are being used. These credentials also have to be set on Heroku as well so it can access the S3 bucket files when the app is deployed. Docs here [https://devcenter.heroku.com/articles/s3](https://devcenter.heroku.com/articles/s3)

You also want to re-build and restart the webserver, in that order, if you want to see any changes you've made to the application appear in the web-browser.

Not sure if this will work the same for MacOS, in that I am not sure if `npm` will work the same way to download dependecies, once you have the appropriate packages it should be the same though. If you are on Windows I recommend using WSL/WSL2 to run this, which is what I use for all this anyhow.

For application debug `gunicorn wsgi:app --capture-output --log-level debug --timeout 90` to run the app will output `gunicorn` logs as well as the debug logs in the app itself.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
