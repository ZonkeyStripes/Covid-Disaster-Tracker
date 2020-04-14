import React, { useState, useEffect } from "react";
import API from "../utils/API";

function News() {

    // findNews() {
        const [articles, setArticles] = useState([]);
        const [formObject, setFormObject] = useState({
            title: "",
            description: "",
            url: ""
        })
        //on load start function
        useEffect(() => {
            loadNews()
        }, []);
    
        function loadNews() {

            API.getNews()
            .then(res => {
                console.log(res.data.articles)
                setArticles(res.data.articles)
            })
            .catch(err => console.log(err));
        };
    
    // }

        return (
    <div className="container">
        <h2>COVID-19 in the United States</h2>
        <ul>
            {/* loops thru articles, displays on page */}
        {articles.map(article => {
                  return (
                      
                  <li>
                    <strong>{article.title}</strong>
                    <br></br>
                    {article.description}
                    <br></br>
                  <a href= {article.url}> {article.url} </a>
                    <hr></hr>
                  </li>

                  );
                })}
        </ul>
    </div>

        )
}

export default News;

