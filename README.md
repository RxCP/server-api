<p align="center">
  <a href="https://circleci.com/gh/RxCP/serveradmin">
    <img src="https://circleci.com/gh/RxCP/serveradmin.svg?style=svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D8-brightgreen.svg" alt="node version">
  <a href="https://badge.fury.io/js/%40foal%2Fcore">
    <img src="https://badge.fury.io/js/%40foal%2Fcore.svg" alt="npm version">
  </a>
  <a href="https://snyk.io/test/npm/@foal/core">
    <img src="https://snyk.io/test/npm/@foal/core/badge.svg" alt="Known Vulnerabilities">
  </a>
  <a href="https://github.com/RxCP/serveradmin/commits/master">
    <img src="https://img.shields.io/github/commit-activity/y/RxCP/serveradmin.svg" alt="Commit activity">
  </a>
  <a href="https://github.com/RxCP/serveradmin/commits/master">
    <img src="https://img.shields.io/github/last-commit/RxCP/serveradmin.svg" alt="Last commit">
  </a>
</p>

## Requirements
- Docker Engine
- Docker Compose
- NodeJs (>=8)

## Development
### Running the app for the first time
Create .env file (see .env.example for the list of available environment variables) or run
```
npm run init:env
```

### Starting the app
```
docker-compose up
```
or run containers in the background
```
docker-compose up -d
```
