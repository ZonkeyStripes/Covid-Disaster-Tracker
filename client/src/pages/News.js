import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Extras from "../components/NewsExtra";
import "../App.css";
import Questions from "../components/Questions";
import Symptoms from "../components/Symptoms";
import Axios from "axios";

function News() {

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

        //API.getNews()
        Axios.get("/api/covidnews/")
            .then(res => {
                console.log(res.data.articles)
                setArticles(res.data.articles)
            })
            .catch(err => console.log(err));
    };

    return (
      <div className="container newscon mx-auto">
        <div className="row">

            <div className="col-lg-6 col-md-6 col-sm-6 container newslist">
                <h2 className="newshead">COVID-19 in the United States</h2>
                <hr></hr>
                <ul>
                    {/* loops thru articles, displays on page */}
                    {articles.map(article => {
                        return (
                            <li>
                                <strong>{article.title}</strong>
                                <br></br>
                                {article.description}
                                <br></br>
                                <a href={article.url}> {article.url} </a>
                                <hr></hr>
                            </li>
                        );
                    })}
                </ul>
                    <p>Sourced from:</p>
                    <a href="https://gnews.io/">https://gnews.io/</a>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 faqs">
                <h2 className="faqhead">Frequently Asked Questions</h2>
                <hr></hr>
                <div className="stuff">
                        <Questions />
                </div>
                <br />
                <Symptoms />
                <p> See more FAQS at the CDC website here:<br></br>
                    <a href="https://www.cdc.gov/coronavirus/2019-ncov/faq.html">
                        https://www.cdc.gov/coronavirus/2019-ncov/faq.html</a>
                </p>
            </div>
            <div className="row viddiv col-lg-12">
            <Extras />
            </div>
        </div>
      </div>
    )


}

export default News;

