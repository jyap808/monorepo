var DefaultBuilder = require("truffle-default-builder");

module.exports = {
  build: new DefaultBuilder({
    "index.html": "index.html",
    "answer.html": "answer.html",
    "question.html": "question.html",
    "your.html": "your.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "ask.js": [
      "javascripts/ask.js"
    ],
    "answer.js": [
      "javascripts/answer.js"
    ],
    "jquery-3.1.1.min.js": [
      "javascripts/jquery-3.1.1.min.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
  }),
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    }
  }
};