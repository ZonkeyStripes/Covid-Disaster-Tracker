const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");
const axios = require("axios");
const convert = require("./csvtojson");

const PORT = process.env.PORT || 3001;

function getNationalData() {

    const url = 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv';

    request(url, (error, response, html) => {
        if (!error && response.statusCode == 200) {

            const $ = cheerio.load(html);

            // convert csv to json format
            let nationalInfo = convert(html);

            console.log(nationalInfo);

            let server_URL = "http://localhost:" + PORT + "/api/national_latest_date/";
            let post_URL = "http://localhost:3001/api/national_data/";

            if(process.env.NODE_ENV === "production") {
                server_URL = "https://covidtestdb.herokuapp.com/api/national_latest_date/";
                post_URL = "https://covidtestdb.herokuapp.com/api/national_data/";
            }

            axios.get(server_URL)
            .then(dateRes => {
                console.log(dateRes.data[0].date);
            
                lastDateInDB = dateRes.data[0].date;
                // generate an array with the latest days data
                let i = nationalInfo.length - 1;
                console.log(i);
                let date = nationalInfo[i].date;

                console.log("lastDateInDB is " + lastDateInDB);

                // if the latests day's data doesn't match the database data, add to DB
                if(lastDateInDB != date) {
                    console.log("new data exists");
                    let newData = [];

                    while(nationalInfo[i].date !== lastDateInDB) {
                        newData.unshift(nationalInfo[i]);
                        i--;
                    }
        
                    console.log(newData.length);
        
                    // send new day's data to the api route, to be added to the database
                    axios.post(post_URL, newData)
                    .then(res => {
                        console.log("success");
                        // console.log(res);
                    })
                }
                else {
                    console.log("the dates match, no need to update");
                }
            })
        }
    });
}

module.exports = getNationalData;


