# Covid Disaster Tracker

https://covid-disaster-tracker.herokuapp.com/#/

Harley Cripe, Jake Kravas, Angela Banks, Maria Francis-Moullier

## Purpose

This page provides information for users who are concerned about the COVID-19 pandemic and other natural disasters.  People need a one-stop site where they can get information that helps them stay safe during this unusual period.  Unfortunately, even though the pandemic is ongoing, other disasters have not stopped, and the combination can cause additional challenges.  Our page provides news, COVID-19 case and death data, information about natural disasters, hospital and urgent care locations, and a disaster kit to track what they need to have on hand.

## How to Use

### When Not Logged In

**Home page:** On the home page, users can see a map and table displaying cases of COVID-19 in the United States at a state level, which can also be toggled to show deaths caused by COVID-19.  The map data on the home page is live, pulled from the covidtracking.com API.

The chart data displays data at a state and county level.  The user may select the state and county they wish to view.  The charts show cases and deaths as compared to the US average or state average, and also displays change over time.  The chart data comes from the New York Times data repository (https://github.com/nytimes/covid-19-data), and is generally updated daily.

**COVID Spread page** This page shows the change in COVID-19 cases and deaths over the previous day.  This data is displayed in table and map format.  This data also comes from the New York Times data repository.

**News page** The news page shows a selection of recent news stories related to COVID-19 on the left side of the page.  These are pulled from the gNews API (https://gnews.io/).  On the right side, there is a selection of frequently asked questions about the virus, and a description of symptoms of the disease.  Below those columns, there is a video animation showing more about the virus.

**Disaster page** When the user is not logged in, this page displays a list of all US states that have had a FEMA declared disaster in 2020, as well as maps of three default states with pins indicating the county where the disasters occured.  The state list is collapsible and expands to show the details of the disasters that occurred.  This data comes from the FEMA Disaster Declaration API (https://www.fema.gov/data-sets#APIs).

**Disaster Kit page** This page allows a user to create a list of items they or their families might need to have on-hand for disaster preparedness.  This list is initially populated with a standard list of items that ready.gov recommends all families have available to be ready for disasters, but users may add additional items that they specifically need, or delete items that do not apply to them.

On the left, users may search for a particular state and county, and will see in the results recent disasters that have impacted this county.  They also get the option to add specific items targeted to the types of disasters that are likely to occur in their area.  **When the user is not logged in, the items in the Disaster Kit will not persist if the user leaves the page.**

### When Logged Into an Account

**Account Creation** When a user first creates an account, they may select up to three state/county combinations to track.  This can be where they live, or where friends and families live, or anywhere they're interested in tracking.

**Dashboard page** The user dashboard shows mini-maps for the counties that the user is tracking, so they can watch their own location as well as that of family members or friends.  It displays COVID-19 cases and deaths for the tracked counties, as well as the locations of urgent care facilities and hospitals located in the county.  The locations are displayed in text and marked on the map with pins.  The urgent case/hospital locations come from the Homeland Infrastructure Foundation-Level Data (HIFLD).

Additionally, there is a national map by county which displays COVID-19 cases and deaths.  This data also comes from the New York Times repository.

**Home page** This page behaves the same as when the user is not logged in.

**COVID Spread page** This page behaves the same as when the user is not logged in.

**News page** This page behaves the same as when the user is not logged in.

**Disaster page** When the user is logged in, this page displays a list of all US states that have had a FEMA declared disaster in 2020, as well as the states that they are tracking, with disasters indicating by pins if any occurred in that state.  The state list is collapsible and expands to show the details of the disasters that occurred.  This data comes from the FEMA Disaster Declaration API (https://www.fema.gov/data-sets#APIs).

**Disaster Kit page** This page behaves largely the same as when the user is not logged in. **However, the data is stored in the user database, so the list is persistent between logins when the user is logged in.**


## Technologies Used

The page is programmed in JavaScript, with a React frontend.  To create the maps, we used the Leaflet library, with React Leaflet to adapt it for React.  The charts were created with Chart.js.  The program was created in Node, and the server uses Express.  We used Axios to access our APIs.  We also used a small amount of jQuery.

The backend database is a MySQL database, which stores user emails and passwords, as well as the location of the counties and states that the user wants to track, and the user's disaster kits.  We also store the NY Times repository data in the database, across three tables.  There is also an archive of the FEMA data in the database.  We used Sequelize to programmatically interact with the database.  To authenticate our user sessions, we used passport with the local strategy, and bcrypt to hash our passwords before storing them in the database.

An automated task runs once per hour to check if there is any new data in the New York Times repository on the national, state or county level.  If so, it is added to the database.

The page was styled with CSS.  We used Bootstrap and React Bootstrap for much of the styling, and then some manual CSS for fine-tuning and media queries for additional mobile responsiveness.

## Attributions

We used a number of different sources to gather data for this project.

Live COVID case and death data from the covidtracking.com API, used on the home page.

COVID-19 case and death data from The New York Times, based on reports from state and local health agencies.  https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html

Natural disaster information from the FEMA Disaster Declaration API.  https://www.fema.gov/data-sets#APIs

Locations of hospitals and urgent cares from Homeland Infrastructure Foundation-Level Data (HIFLD).  https://hifld-geoplatform.opendata.arcgis.com/datasets/urgent-care-facilities/geoservice

News stories related to COVID-19 from gNews API.  https://gnews.io/

## License

[MIT](https://choosealicense.com/licenses/mit/)