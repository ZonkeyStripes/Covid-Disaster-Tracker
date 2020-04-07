const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");
// const writeStream = fs.createWriteStream('Tfoodie.csv');

const url = 'https://tucsonfoodie.com/2020/03/19/tucson-takeout-delivery-options/';



request(url, (error, response, html) => {
    if(!error && response.statusCode == 200) {

        const $ = cheerio.load(html);
        const restaurant = $('h2')

        restArr = [];
        optionArr = [];
        linkArr= [];
        
        restaurant.each((i, el) => {
            
            const restaurant = $(el).text();
            
            // console.log(restaurant)
            restArr.push(restaurant);

        });
        console.log(restArr)
        
        const options = $('h5');
        options.each((i, el) => {
            
            const options = $(el).text();            
            // console.log(options)

            optionArr.push(options);
        });
        console.log(optionArr);

        const link = $('#content-main, a');

        link.each((i, el) => {
            
            const link = $(el).attr('href');
            if(i >= 87) {
                linkArr.push(link)
            }
        });

        console.log(linkArr);
        console.log("Finished?");

        }
});