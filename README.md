# Foodgram
Foodgram is a WebApp made for foodies. Here you can post pictures, like, unlike, comment, follow, unfollow and much more things.
## Tech Stack
- Languages: 
  - <img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/> <img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>

- Frontend
  - <img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="MaterializeCSS" src="https://img.shields.io/badge/-materialize--css-ff69b4?style=for-the-badge&logo=materialize--css&logoColor=white"/>

- Backend
  - <img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/>

- Database
  - <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/>
## Contribution Guidelines :green_heart:

With your contribution, we can make this project... awesome :tada:. Now, to make a hassle-free workflow, I implore you all to follow these guidelines!


## :ballot_box_with_check: Prerequisites
- Node.js (version 12+)
- npm (version 6+)
- MongoDB (version 4+)

## :arrow_down: Clone and Install

- First, fork this repository :fork_and_knife: and follow the given instructions:

```bash
# clone the forked repository to your local machine
$ git clone https://github.com/<YOUR-GITHUB-USERNAME>/Foodgram.git

# navigate to the project's directory
$ cd Foodgram

# install the dependencies for server
$ npm install

# install client dependencies
$ cd client && npm install

```
## :heavy_plus_sign: Include Remote Repo

- Make sure :mag: you are in the root of the repository:

## :construction: Setup Local Environment

For running this project locally :truck:, you need to setup and define the environment variables for both the server.

Create `develop.js` file inside the `config` folder in the root directory with the following variables:

```bash
module.exports = {
	MONGOURI=<your-mongodb-atlas-uri-key>
	JWT_PASS=<any-random-string>
	EMAIL=<your-email-for-sending-emails> # for nodemailer
	PASS=<your-email-password>
}
```

**Default Ports:**
- React (or Client) - 3000
- Node.js (or Server) - 5000

**Note:** In order to run the client (properly), you need to have the server running at port 5000.

## :cyclone: Run the Project

- Client:

```bash
# running locally
$ cd client
$ npm start

# building locally
$ npm run build
```

- Server

```bash
# running locally
# in root directory
$ npm myapp.js
```

## :page_with_curl: Workflow

- Always raise or claim an issue before making a pull request.

- To claim an issue, just leave a comment and you'll be assigned on first come, first serve basis.

- Make sure to squash your commits for cleaner commit history.

- In your pull request, never forget to mention the issue you are solving, like so - Fixes #2 (issue number).

- In this project, we will try to adhere to Gitflow :recycle:. So, make sure request to `master`, like :

```bash
# include the latest changes (as mentioned before)
$ git checkout master
$ git pull upstream master --rebase

# create a feature branch
$ git checkout -b <NEW-BRANCH-NAME>

# make your changes to the codebase
# add your changes
$ git add .

# make your commit
$ git commit -m "<YOUR-COMMIT-MESSAGE>"

# pull any new changes from the “staging” branch (staging branch here is the develop branch) and resolve any conflicts.
# finally, push the branch
$ git push origin <YOUR-GITHUB-USERNAME>/<FEATURE-BRANCH>
```

#### Submit a pull request :rocket: from your forked repo (feature branch) to this repo (master branch) and you are done. :tada:



 
