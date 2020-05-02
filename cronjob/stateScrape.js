const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");
const axios = require("axios");
const convert = require("./csvtojson")

function stateScrape() {

    const url = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv';

    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {

            const $ = cheerio.load(html);

            restArr = [];
            // console.log("Finished?");

            let stateInfo = convert(html);
            // Database work
            axios.post('http://localhost:3001/states', stateInfo)
                .then(function(res, req) {})
                .catch((error) => { 
                    console.log(error);
                    res.json(error);
                 })
            // console.log(stateInfo);
        }
    });
}

module.exports = stateScrape;


