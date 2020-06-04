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

            // convert csv to json format
            let stateInfo = convert(html);

            console.log(stateInfo);

            axios.get("http://localhost:3001/api/state_latest_date/")
            .then(dateRes => {
                console.log(dateRes.data[0].date);
            
                lastDateInDB = dateRes.data[0].date;
                // generate an array with the latest days data
                let i = stateInfo.length - 1;
                let date = stateInfo[i].date;

                // if the latests day's data doesn't match the database data, add to DB
                if(lastDateInDB != date) {
                    console.log("new data exists");
                    let newData = [];
        
                    while(stateInfo[i].date === date) {
                        newData.push(stateInfo[i]);
                        i--;
                    }
        
                    console.log(newData.length);
        
                    // send new day's data to the api route, to be added to the database
                    axios.post("http://localhost:3001/api/state_data/", newData)
                    .then(res => {
                        console.log("success");
                        // console.log(res);
                    })
                }
                else {
                    console.log("the dates match, no need to update");
                }
            })


            // fs.writeFile("./stateresults.json", JSON.stringify(stateInfo), function(err) {
            //     if(err) {
            //         return console.log(err);
            //     }
            //     console.log("The file was saved!");
            // }); 
        }
    });
}

module.exports = stateScrape;


