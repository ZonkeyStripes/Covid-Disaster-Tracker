import React, { useState } from 'react';
import FAQ from './FAQ';

function Questions() {
  const [faqs, setfaqs] = useState([
    {
      question: "What is the source of the virus?",
      answer: "COVID-19 is caused by a coronavirus called SARS-CoV-2. Coronaviruses are a large family of viruses that are common in people and may different species of animals, including camels, cattle, cats, and bats.  Rarely, animal coronaviruses can infect people and then spread between people. This occurred with MERS-CoV and SARS-CoV, and now with the virus that causes COVID-19.",
      open: false
    },
    {
      question: "How does the virus spread?",
      answer: "The virus that causes COVID-19 is thought to spread mainly from person to person, mainly through respiratory droplets produced when an infected person coughs or sneezes. These droplets can land in the mouths or noses of people who are nearby or possibly be inhaled into the lungs. Spread is more likely when people are in close contact with one another (within about 6 feet). COVID-19 seems to be spreading easily and sustainably in the community (“community spread”) in many affected geographic areas. Community spread means people have been infected with the virus in an area, including some who are not sure how or where they became infected.",
      open: false
    },
    {
      question: "Can someone who has COVID-19 spread the illness to others?",
      answer: "The virus that causes COVID-19 is spreading from person-to-person. People are thought to be most contagious when they are symptomatic (the sickest). That is why CDC recommends that these patients be isolated either in the hospital or at home (depending on how sick they are) until they are better and no longer pose a risk of infecting others. More recently the virus has also been detected in asymptomatic persons. How long someone is actively sick can vary so the decision on when to release someone from isolation is made using a test-based or non-test-based strategy (i.e. time since illness started and time since recovery) in consultation with state and local public health officials. The decision involves considering the specifics of each situation, including disease severity, illness signs and symptoms, and the results of laboratory testing for that patient.",
      open: false
    }, 
    {
      question: "Why are we seeing a rise in cases?",
      answer: "The number of cases of COVID-19 being reported in the United States is rising due to increased laboratory testing and reporting across the country. The growing number of cases in part reflects the rapid spread of COVID-19 as many U.S. states and territories experience community spread. More detailed and accurate data will allow us to better understand and track the size and scope of the outbreak and strengthen prevention and response efforts.",
      open: false
    }
  ]);

      const toggleFAQ = index => {
        setfaqs(faqs.map((faq, i) => {
          if(i === index) {
            faq.open = !faq.open
          } else {
            faq.open = false;
          }
  
          return faq;
        }))
      }

  return (
    <div className="sum">
      <div className="other">
        {faqs.map((faq, i) => (
          <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
  );
}

export default Questions;
