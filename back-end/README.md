# The World Right Now - Back-end

[![Travis branch](https://img.shields.io/travis/kris71990/worldleaders/master.svg)](https://travis-ci.org/kris71990/worldleaders)
![Coverage](https://img.shields.io/badge/coverage-97%25-brightgreen.svg)
[![David](https://img.shields.io/david/expressjs/express.svg)]( https://github.com/kris71990/worldleaders)
![version](https://img.shields.io/badge/version-2.0.0-orange.svg)
[![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg)](https://github.com/kris71990/worldleaders)


**Author Kris Sakarias**

**Version 2.0.0**

## Overview

This is a full-stack application that informs the user about the current social, political, and economic state of the countries in the world. 

The back-end server and REST API is built with Node and powered by Express and MongoDB. All data is collected from the CIA API (https://github.com/iancoleman/cia_world_factbook_api#data). This data comes in the form of a single very large JSON object, which The World Right Now utilizes to perform its CRUD functionality for the purposes of this app. The server does a very large amount of parsing and validation to a ensure a smooth and accurate user experience.

The front-end is built with React. The user can select a country from the dropdown menu to view the latest information about it. A fair amount of parsing and validation also occurs on the front-end. 

The current functionality for the backend is described below. More features are currently in the works.


## Documentation

**Starting the Server**:

`git clone https://github.com/kris71990/worldleaders.git`

`cd front-end npm i` 

`cd back-end npm i`

`mongod`

`/back-end: npm run start`

`/front-end: npm run watch`


**Database Models**:

There are currently two models controlling the structure of the data in the back-end

```
Country
System
```

Any country in the world can be stored in the country collection of the Country model. A system (and only one) can only be created for a country that exists in the country collection (1:1 relationship). Each system holds a unique reference number to the country it represents. 


**Back-end Functionality**:

1. POST to /countries
    - Required Parameters
      - `countryName` - the name of some country in the world (use quotes for multiple words)
    - Example request 
       - `http POST localhost:${PORT}/countries countryName=benin`
    - The above request will retrieve and parse data from the CIA world factbook for Benin, save the relevant data into the database, and return the saved data.

2. GET from /countries/:id
    - Required Parameters
      - `id` - the id of some country currently in the database
    - Example request 
      - `http GET localhost:${PORT}/countries/5b130b049fe61724b1d83609`
    - The above request will return the country with the given id from the database, if it exists.

3. GET from /countries/all
    - No required parameters
    - Example request
      - `http GET localhost:${PORT}/countries/all`
    - Returns a JSON object with all information for every country in the database

4. GET from /countries/list
    - No required parameters
    - Example request
      - `http GET localhost:${PORT}/countries/list`
    - Returns a filtered version of /countries/all, an array of all countries in the system with only the countryName and id. This keeps the front end cleaner for the purposes of rendering the landing page.

5. PUT to /countries/:id
    - Required Parameters
      - `id` - the id of some country currently in the database
    - Example request
      - `http POST localhost:${PORT}/countries/5b130b049fe61724b1d83609`
     - The above request will find the country in the database and check if it is the most recent information. If there is more recently updated info from the world factbook, the country is updated with the new information and returned.

6. DELETE /countries/:id
    - Required parameters
      - `id` - the id of the country to be deleted
    - Example request
      - `http DELETE localhost:${PORT}/countries/5b130b049fe61724b1d83609`
    - This endpoint is rarely needed and validation for it will not succeed unless the country requested to be deleted has also been deleted from the CIA world factbook. 

7. A POST to /system
    - Required Parameters
      - `countryName` - the name of some country in the database
      - `countryId` - the Mongo ObjectId of the country in the database
    - Example request 
      - `http POST localhost:${PORT}/system countryName=benin countryId=5b130b049fe61724b1d83609`
    - The above request will verify that the Benin currently exists in the 'country' collection in the database, and that it does not already reference an existing governmental system. If Benin exists without reference to a system, the post will retrieve and parse Benin's governmental system data and save it to the database, with reference to Benin's entry in the 'country' collection.

8. A GET from /system/:country
    - Required Parameters
       - `country` - the name of some country currently in the database
    - Example request 
       - `http GET localhost:${PORT}/system/benin`
    - The above request will return the governmental system data for Benin.

9. A PUT to /system/:country
    - Required Parameters
       - `country` - the name of some country currently in the database
    - Example request 
       - `http PUT localhost:${PORT}/system/benin`
    - The above request will check if what exists in the database is the most current data from the CIA World Factbook. If so, it merely returns the same data. If not, it updates and returns the newest data.

## Testing

All the functionality in the app is tested using the Jest library. 

To run tests: `npm run test`