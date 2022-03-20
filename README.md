<div id="top"></div>

<div align="center">

  ![Npm][npm-shield]
  ![ci][ci-shield]
  ![GraphQL][graphql-shield]
  [![LinkedIn][linkedin-shield]][linkedin-url]

  [npm-shield]: https://img.shields.io/npm/v/npm.svg?logo=npm
  [ci-shield]: https://github.com/willaug/mfa-nodejs/actions/workflows/mfa-nodejs-ci.yml/badge.svg
  [linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?&logo=linkedin&colorB=0A66C2
  [graphql-shield]: https://img.shields.io/badge/-GraphQL-E10098.svg?&logo=graphql
  
  [linkedin-url]: https://linkedin.com/in/william-augusto

</div>

<br>
<br>

<div align="center">
  <a href="https://github.com/willaug/mfa-nodejs">
    <img src=".github/verified.png" alt="logo" width="80" height="80">
  </a>

  <h3 align="center">
    Multi Factor Authentication
  </h3>

  <p align="center">
    A simple example using the one-time password (OTP) method. 
  </p>
</div>

<br>
<br>
<br>

## About
This project was created to learning and is an example to generate a 2fa method by verification code. Basically, the idea is return a **qr-code** and **code** to user add in your **auth app** and check generated code.

## Features
- Generate a **seed key** and qr-code;
- Add **seed-key** in account row;
- Check verification code.

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started
### Prerequisites
To run it is necessary to have NodeJS installed in your system, prefer version 16. There's a nvm file and you can use it to install or update the node version.

### Installation
  **Clone the repo**
  ```sh
    git clone https://github.com/willaug/mfa-nodejs.git
  ```

  **Install dependencies**
  ```sh
    cd mfa-nodejs && npm i
  ```

### Usage
  **Tests**
  ```sh
    npm t # recommended before to run
  ```

  **Run in production mode**
  ```sh 
    npm start # playground disabled
  ```

  **Run in development mode**
  ```sh
    npm run dev
  ```

  **Access the API**
  ```
    http://localhost:4000
  ```

  **Access the database**
  ```
    http://localhost:3000
  ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Build with
- [ApolloServer](https://www.apollographql.com/)
- [GraphQL](https://www.graphql.com/)
- [OTPLib](https://github.com/yeojz/otplib/)
- [Axios](https://github.com/axios/axios)
- [GoogleChart](https://developers.google.com/chart)
- [Commitizen](https://github.com/commitizen/cz-cli)
- [JsonServer](https://www.npmjs.com/package/json-server)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [Jest](https://github.com/facebook/jest)


<p align="right">(<a href="#top">back to top</a>)</p>

## Contact
You can contact me by:

- 🚀 [linkedin.com/in/william-augusto](https://www.linkedin.com/in/william-augusto)
- 📫 [william.santos315@outlook.com](mailto:william.santos315@outlook.com)

<p align="right">(<a href="#top">back to top</a>)</p>
