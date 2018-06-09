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
  <b>Project for IVIS from Gery Hirschfeld & David Heimgartner.</b></br>
</p>

<br />

![divider](./w3tec-divider.png)

## ❯ Table of Contents

- [Getting Started](#-getting-started)
- [Why and How](#-why-and-how)
- [License](#-license)

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

## ❯ Why and How

We are both tennis fans and like to have a nice head to head statistcs app. The goal of this app is to get a good impression of a upcoming tennis game. Like for example, if Roger Federer plays against Rafael Nadal on a grass surface, the app should help making possible prediction on the basis of past matches. 

As a first data source we used the API of the page [Ultimate Tennis Statistics](http://www.ultimatetennisstatistics.com/), dispite this API was amazing we had some trouble to bind it to our app. Therefore, we used this GitHub Repo [JeffSackmann Tennis ATP](https://github.com/JeffSackmann/tennis_atp), that stores a lot of past tennis games, ranking, players and more in several CSV files. This repo with its data is just perfect. To import the data into our app we had to filter and tranform the values in a new format to keep a good performance of the app. Moreover, for the whole in app filtering like piking a surface we used web-workers to improve the web rendering.

![divider](./w3tec-divider.png)

## ❯ License

[MIT](/LICENSE)
