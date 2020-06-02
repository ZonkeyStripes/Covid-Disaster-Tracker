const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");
const axios = require("axios");
const convert = require("./csvtojson.js");
const writeStream = fs.createWriteStream('us-counties.json');

const url = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv';

function countyScrape() {

    request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            
            const $ = cheerio.load(html);
            restArr = [];
            console.log("Finished?");
            
            let countyInfo = convert(html);
            //Database work
            // axios.post('http://localhost:3001/counties', countyInfo)
            // .then(function(res, req) {})
            // .catch((error) => {
            //     console.log(error);
            //     res.json(error)
            // })

            // console.log(stateInfo);

            fs.writeFile("./countyresults.json", JSON.stringify(countyInfo), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 


        }
    })
}
module.exports = countyScrape;