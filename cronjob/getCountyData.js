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
            // console.log("Finished?");
            
            let countyInfo = convert(html);

            console.log(countyInfo);

            axios.get("http://localhost:3001/api/county_latest_date/")
            .then(dateRes => {
                console.log(dateRes.data[0].date);
                lastDateInDB = dateRes.data[0].date;

                // generate an array with the latest days data
                let i = countyInfo.length - 1;
                let date = countyInfo[i].date;

                // if the latests day's data doesn't match the database data, add to DB
                if(lastDateInDB != date) {
                    console.log("new data exists");
                    let newData = [];
        
                    // get one day's worth of data -- might change this later to get more
                    // if more exists?
                    while(countyInfo[i].date !== lastDateInDB) {
                        newData.unshift(countyInfo[i]);
                        i--;
                    }
                    
                    // console.log(newData);
                    console.log(newData.length);
        
                    // send new day's data to the api route, to be added to the database
                    axios.post("http://localhost:3001/api/county_data/", newData)
                    .then(res => {
                        console.log("success");
                        // console.log(res);
                    })
                }
                else {
                    console.log("the dates match, no need to update");
                }
            
            });

            // fs.writeFile("./countyresults.json", JSON.stringify(countyInfo), function(err) {
            //     if(err) {
            //         return console.log(err);
            //     }
            //     console.log("The file was saved!");
            // }); 


        }
    })
}
module.exports = countyScrape;