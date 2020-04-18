const request = require('request');
const fs = require("fs");

    
    const url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6357cdd3d6b24dc4805cd011b911f281';
    const linkArr = [];
    request(url, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            
            const $ = cheerio.load(html);
            const newsHead = $('.news-card-body, .title')
        
        
        newsHead.each((i, el) => {
            
            const news = $(el).attr("href");
            
            linkArr.push(news);
            console.log(i)
        });
        return linkArr;
                        
    }
});

export default linkArr;