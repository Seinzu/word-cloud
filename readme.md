# Readme

## Introduction

The word cloud is designed to load a JSON file describing a group of topics and visualise the topics to demonstrate
the degree of interest in each topic and the sentiment of the discussion of the topics (positive, negative, neutral).

## Pre-requisites

In order to install and use this project you must make sure that you have node and NPM installed (tested with node=5.3 and npm=~3.8). All other dependencies will be installed as part of the later parts of this documentation.

## Installation and use

To install and start the project clone this git repository and then use the following commands in the root directory of the project:

```
npm install
npm run build
npm start
```

Then visit http://localhost:8000 (by default).

To run the internal tests (using Jest) issue the following command in the root directory:

```
npm run test
```

## Technology used

The project is built in React and uses the Redux library to manage the state of the application. The Bootstrap CSS framework is used to provide generic markup elements to contain the React components. Other styling was produced using LESS. Compilation of JS and CSS is performed using Webpack and Babel.
