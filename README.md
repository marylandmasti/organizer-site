# Maryland Masti Organizer Site Development Prototype

## About

This is a web application that uses DynamoDB, ExpressJS, ReactJS, and NodeJS.
Currently the feature set only includes CRUD functionality, working with 2 NoSQL databases to store and read data from.

## Purpose

This project is a development prototype as part of a larger project for UMD's Maryland Masti, a student led organization that organizes and hosts an annual dance competition. Organizers are given access to a website that will allow them to manually add, delete, or update participant data and add announcements that will eventually be view by the dance teams.

## Progress

Completed:

- CRUD operations for announcements
- CRUD operations for registered participants

In Progress:

- Login system
- Sorting announcements

Upcoming:

- Automatically add id when adding to database
- CRUD operations for individual team schedules
- Add data from a QR code to database of checked in participants

<br/>
<br/>
<br/>

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
