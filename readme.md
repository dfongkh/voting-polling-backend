# Voting System (Backend)

This is the backend server for the voting system app.

The Frontend part is below:

- [Frontend App](https://github.com/dfongkh/voting-react)

## Step 1 - Basic Requirements

You will need:

- [Git](http://git-scm.com/downloads)
- [node](https://nodejs.org/)
- [yarn](https://yarnpkg.com/en/docs/install) (Optional. Not Required if you use NPM)

Please install them if you don't have them already.

## Step 2 - Clone the repository:

From the command line, clone the repository:

```sh
$ git clone https://github.com/dfongkh/polling-voting-backend.git
```

## Step 3 Install Dependencies

If you are using npm run from the root of the repository:

```sh
npm run install
```

## Step 4 - Create a MongoDB Atlas Database

- [Set up MongoDB Atlas Tutorial](https://docs.atlas.mongodb.com/getting-started/)

After that, navigate to db.js file, replace 'mongodblink' with the connection string of your databse.

## Step 5 - Run the app

Once the dependencies are installed, you can run the app for a lesson:

Run Server

```sh
npm run start
```

Your app should be running on localhost:5000
