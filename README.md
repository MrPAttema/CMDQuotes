# CMDQuotes
The base for the awsome CMDQuotes.nl website.

## Install
Just run the application with the NPM command, quite simple.
```sh
$ npm run serve
```

### API Calls
So with the application you have four API calls that you can make to https://api.patrickattema.nl.

| Call | Version | Method |
| ------ | ------ | ------ |
| /read | v3 | GET |
| /create | v3 | POST |
| /vote | v3 | POST |
| topvoted | v3 | GET | 

API Syntax:
```sh
https://api.patrickattema.nl/<Version>/quotes/<Call>
```

#### Future plans

 - Migrate V3 API to Digital Den API (This will happen soon, the new API will have OAuth2).
