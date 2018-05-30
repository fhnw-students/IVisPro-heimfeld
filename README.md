<h1 align="center">IVisPro</h1>

<p align="center">
  <a href="https://david-dm.org/fhnw-students/IVisPro-heimfeld">
    <img src="https://david-dm.org/fhnw-students/IVisPro-heimfeld/status.svg?style=flat" alt="dependency" />
  </a>
  <a href="https://travis-ci.org/fhnw-students/IVisPro-heimfeld">
    <img src="https://travis-ci.org/fhnw-students/IVisPro-heimfeld.svg?branch=master" alt="travis" />
  </a>
</p>

<p align="center">
  <b>Project for ivis from Gery Hirschfeld & David Heimgartner.</b></br>
</p>

<br />

![divider](./w3tec-divider.png)

## ❯ Why

TODO

![divider](./w3tec-divider.png)

## ❯ Table of Contents

- [Getting Started](#-getting-started)

## ❯ Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install yarn globally

```bash
npm install yarn -g
```

### Step 2: Configure the new Project

Fork or download this project. Configure your package.json for your new project.

Then copy the `.env.example` file and rename it to `.env`.

### Step 3: Serve your App

Go to the project dir and start your app with this npm script.

```bash
yarn serve
```

![divider](./w3tec-divider.png)

## ❯ License

[MIT](/LICENSE)

## API Calls

/*
http://www.atpworldtour.com/en/rankings/singles?rankDate=2018-05-14&rankRange=0-100&countryCode=all&ajax=true
*/
// export async function getContributors(playerId: string, opponentId: string, ): Promise<Contributor[]> {
//   const response = await Vue.$http.get(`/matchesTable?playerId=${playerId}&opponent=OPP_${opponentId}&h2h=true&current=1&rowCount=-1&sort%5Bdate%5D=desc&searchPhrase=&season=&fromDate=&toDate=&level=&bestOf=&surface=&indoor=&round=&tournamentId=&score=&outcome=&_=1527608334235`, Object.assign(atpApiConfig, {}));
//   return plainToClass<Contributor, Contributor[]>(Contributor, response.data);
// }

// /*

// // All games between two players
// http://www.ultimatetennisstatistics.com/matchesTable?playerId=3819&opponent=OPP_4742&h2h=true&current=1&rowCount=-1&sort%5Bdate%5D=desc&searchPhrase=&season=&fromDate=&toDate=&level=&bestOf=&surface=&indoor=&round=&tournamentId=&score=&outcome=&_=1527608334235

// // Search for player
// http://www.ultimatetennisstatistics.com/autocompletePlayer?term=waw
// */

// https://codepen.io/NilsWe/pen/FemfK/

// https://codyhouse.co/demo/vertical-timeline/index.html