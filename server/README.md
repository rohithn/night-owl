# Node.js Backend for APIs

## Running Locally

### Stack

1. Node.js
2. HarperDB
3. React.js

### 1. HarperDB Setup

The app uses HarperDB as the database. To set up HarperDB, go to [HarperDB Studio](https://studio.harperdb.io/) and follow the instructions [here](https://harperdb.io/docs/harperdb-studio/) to create a new cloud instance. Note down the instance url, username and password. Create a `bookstall` schema and create following tables with given "hash attr.".

- books - `id`
- categories - `id`
- ratings - `id`
- users - `email`

### 2. Node.js Server

```
$ cd server
$ npm install
```

#### Enviroment variables

Rename `.env.example` to `.env` and fill in the params with parameters from the previous step.

#### Run Server

```
$ npm start
```
