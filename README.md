# Social-Network-API-CM
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A RESTful social network API that handles "Users", "Thoughts", and "Reactions".

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

## Installation

Use your favorite software package manager, such as Node Package Manager, to install the dependencies listed in the package.json file. Transpile the typescript files in the src folder into Javascript. The "build" script can be used to perform this action via Node Package Manager.

## Usage

Start the Social-Network-API-CM server with the "start" script in the package.json file. Use your favorite API development platform, such as Insomnia, to execute the application functions. See the link below for a short video demonstration of the Social-Network-API-CM in action.

[Video Demo](https://drive.google.com/file/d/1vxR0M-b9au4QWJ5t7COZnSiltZ9p9JHB/view?usp=sharing)

### /api/users

- GET all user profiles
- POST a new user profile

### /api/users/:userId

- GET the profile of a  specific user determined by _id
- PUT an update to a user profile specified by _id
- DELETE a user profile specified by _id

### /api/users/:userId/friends/:friendId

- POST to add new friend to the friend list on a user profile
- DELETE to remove a friend from the friend list on a user profile

### /api/thoughts

- GET all thoughts
- POST to create a new thought

### /api/thoughts/:thoughtId

- GET a single thought specified by its _id
- PUT to update a thought specified by its _id
- DELETE to remove a thought specified by its _id

### /api/thoughts/:thoughtId/reactions

- POST to create a reaction stored in the reactions array of a specific thought
- DELETE to pull and remove a reaction specified by the reactionId value

## Contributing

Contact Christopher Makousky for inqueries about making contributions to this project.

## Tests

Use your favorite API development platform to test the following functions.

    GIVEN a social network API

    WHEN I enter the command to invoke the application
    THEN my server is started and the Mongoose models are synced to the MongoDB database

    WHEN I open API GET routes in Insomnia for users and thoughts
    THEN the data for each of these routes is displayed in a formatted JSON

    WHEN I test API POST, PUT, and DELETE routes in Insomnia
    THEN I am able to successfully create, update, and delete users and thoughts in my database

    WHEN I test API POST and DELETE routes in Insomnia
    THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Questions

https://github.com/CMakousky

christopher.makousky@gmail.com

## License

MIT License