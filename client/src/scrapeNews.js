const request = require('request');
// const cheerio = require('cheerio');

const fs = require("fs");
// const writeStream = fs.createWriteStream('Tfoodie.csv');



// function getNews() {
    
    const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6357cdd3d6b24dc4805cd011b911f281';
    const linkArr = [];
    request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            
            const $ = cheerio.load(html);
            const newsHead = $('.news-card-body, .title')
        
        
        newsHead.each((i, el) => {
            
            const news = $(el).attr("href");
            
            // console.log(news);
            linkArr.push(news);
            console.log(i)
        });
        return linkArr;
                
        // console.log(linkArr);
        // console.log("Finished?");
        
    }
});

// }
export default linkArr;