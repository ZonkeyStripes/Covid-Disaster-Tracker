# Covid Disaster Tracker

https://covid-disaster-tracker.herokuapp.com/#/

Harley Cripe, Jake Kravas, Angela Banks, Maria Francis-Moullier

## Purpose

This page provides information for users who are concerned about the COVID-19 pandemic and other natural disasters.  People need a one-stop site where they can get information that helps them stay safe during this unusual period.  Our page provides news, COVID-19 case and death data, information about natural disasters, hospital and urgent care locations, and a disaster kit to track what they need to have on hand.

## Description
On the home page, users can see data about cases of COVID-19 by state in both map, chart and list form.  They can toggle between seeing information about cases and information about deaths caused by the pandemic.  They can see information about the US generally and if they choose to make a login, they can track up to three counties and see the pandemic's effects there, as well as natural disasters.  The user dashboard shows mini-maps for the counties that the user is tracking, so they can watch their own location as well as that of family members or friends.  Users can also see up to date news stories relating to COVID-19, and create a disaster kit to keep track of items they or their families might need for disaster preparedness.

## Technologies Used

The page is programmed in Javascript, with a React frontend.  To create the maps, we used the Leaflet library, with React Leaflet to adapt it for React.  The charts were created with Chart.js.  The program was created in Node, and the server uses Express.  We used Axios to access our APIs.  We also used a small amount of jQuery.

The backend database is a MySQL database, which stores user emails and passwords, as well as the location of the counties and states that the user wants to track.  We used Sequelize to programmatically interact with the database.  To authenticate our user sessions, we used passport with the local strategy, and bcrypt to hash our passwords before storing them in the database.

The page was styled with CSS.  We used Bootstrap and React Bootstrap for much of the styling, and then some manual CSS for fine-tuning and media queries for additional mobile responsiveness.

## Attributions

We used a number of different sources to gather data for this project.

COVID-19 case and death data from The New York Times, based on reports from state and local health agencies.  https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html

Natural disaster information from the FEMA Disaster Declaration API.  https://www.fema.gov/data-sets#APIs

Locations of hospitals and urgent cares from Homeland Infrastructure Foundation-Level Data (HIFLD).  https://hifld-geoplatform.opendata.arcgis.com/datasets/urgent-care-facilities/geoservice

News stories related to COVID-19 from News API.  https://newsapi.org/

## License

[MIT](https://choosealicense.com/licenses/mit/)