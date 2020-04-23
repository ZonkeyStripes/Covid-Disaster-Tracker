const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");
// const writeStream = fs.createWriteStream('Tfoodie.csv');

const url = 'https://www.who.int/news-room/q-a-detail/q-a-coronaviruses';

request(url, (error, response, html) => {
    if(!error && response.statusCode == 200) {

        const $ = cheerio.load(html);
        const main = $('.sf-accordion__summary')

        restArr = [];
        // optionArr = [];
        // linkArr= [];
        
        main.each((i, el) => {
            
            const main = $(el).find("p").text();
            
            // console.log(main)
            restArr.push(main);

        });
        console.log(restArr)
        
        // const options = $('h5');
        // options.each((i, el) => {
            
        //     const options = $(el).text();            
        //     // console.log(options)

        //     optionArr.push(options);
        // });
        // console.log(optionArr);

        // const link = $('#content-main, a');

        // link.each((i, el) => {
            
        //     const link = $(el).attr('href');
        //     if(i >= 87) {
        //         linkArr.push(link)
        //     }
        // });

        // console.log(linkArr);
        console.log("Finished?");

        }
});
