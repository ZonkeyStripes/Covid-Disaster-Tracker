// Requiring our models and passport as we've configured it

let db = require("../models");
let passport = require("../config/passport");
const Axios = require("axios");
const Sequelize = require('sequelize');

module.exports = function (app) {


  // USER LOGIN/LOGOUT/CREATE ROUTES

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, return a json object with email and id
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {

    console.log("** login** req.user on the server: ");
    console.log(req.user);

    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
      ftu: req.user.firstTimeUse
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log("hit api/signup");

    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function (us) {
        res.json({
          email: req.body.email,
          id: us.dataValues.id
        })
      })
      .catch(function (err) {
        console.log(err);
        res.status(401).json(err);
      });
  });

  app.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
      res.clearCookie('connect.sid');
      // Don't redirect, just print text
      res.send('Logged out');
    });
  });


  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      // res.json({});
      console.log("user is not logged in");
      res.status(401).json("user is not logged in");
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      //console.log(res);

      res.json({
        email: req.user.email,
        id: req.user.id,
        ftu: req.user.firstTimeUse
      });
    }
  });

// GET ROUTES

app.get("/api/location/:id", function(req, res){
  let userId = req.params.id;

  console.log("userId = " + userId);
  
  db.Location.findAll({
    where: {
      UserId: userId
    }
  }).then(function(dbLocation) {
    res.json(dbLocation);
  })
})


// gets the most recent data for a specific county/state combo
app.get("/api/get_most_recent_data/:county/:state", function(req, res) {

  db.CountyData.findOne({
      order: [
        ['id', 'DESC']
      ],
    where: {
      county: req.params.county,
      state: req.params.state
    }
  }).then(function(dbRecentCounty) {
    // console.log(dbRecentCounty);
    res.json(dbRecentCounty);
  })
})

app.get("/api/all_locations", function(req, res){
  
  console.log("api/all_locations")

  db.Location.findAll({})
  .then(function(dbLocation) {
    // console.log(dbLocation);
    res.json(dbLocation);
  })
})

app.get("/api/disasterkit/:id", function(req, res){
  
  console.log("/api/disasterkit/:id")
  console.log(req.params.id);

  let userId = req.params.id;
  
  db.DisasterKit.findAll({
    where: {
      UserId: userId
    }
  }).then(function(dbKit) {
    console.log(dbKit);
    res.json(dbKit);
  })
});


// gets the last entry in the state database, by id
app.get("/api/state_latest_date/", function(req, res) {
  console.log("GET /api/state_latest_date/");
  db.StateData.findAll({
    order: [
      ['id', 'DESC']
    ],
    limit: 1
  })
  .then(function(result) {
    res.json(result);
  })
})

// gets the last entry in the county database, by id
app.get("/api/county_latest_date/", function(req, res) {
  db.CountyData.findAll({
    order: [
      ['id', 'DESC']
    ],
    limit: 1
  })
  .then(function(result) {
    res.json(result);
  })
})

// gets the last entry in the national database, by id
app.get("/api/national_latest_date/", function(req, res) {
  db.NationalData.findAll({
    order: [
      ['cases', 'DESC']
    ],
    limit: 1
  })
  .then(function(result) {
    res.json(result);
  })
})



// route that gets all state data for one date, matching the data passed as a parameter
app.get("/api/state_data/:todaydate", function(req, res) {
  console.log("GET /api/state_data/");
  console.log(req.params.todaydate);
  db.StateData.findAll({
    where: {
      date: req.params.todaydate
    }
  })
  .then(function(result) {
    res.json(result);
  })
})


// route that gets all county data for one date, matching the data passed as a parameter
app.get("/api/county_data/:todaydate", function(req, res) {
  // console.log("GET /api/county_data/");
  // console.log(req.params.todaydate);
  db.CountyData.findAll({
    where: {
      date: req.params.todaydate
    }
  })
  .then(function(result) {
    res.json(result);
  })
})

// get all national data for all dates
app.get("/api/national_data/", function(req, res) {
  db.NationalData.findAll({})
  .then(function(result) {
    res.json(result);
  })
})

// get all state data for all dates
app.get("/api/state_data/", function(req, res) {
  db.StateData.findAll({})
  .then(function(result) {
    res.json(result);
  })
})

// get all county data for all dates -- performance issues, try to avoid using
app.get("/api/county_data/", function(req, res) {
  db.CountyData.findAll({})
  .then(function(result) {
    res.json(result);
  })
})

// get all county data for last month
app.get("/api/county_data/last_month/:latestDate", function(req, res) {

  console.log("in last month route");
  console.log(req.params.latestDate);

  let latestDate = req.params.latestDate;

  let dateArray = [];
  dateArray.unshift(latestDate);
  let newDate = latestDate;

  for(let i = 0; i < 30; i++) {
    newDate = getPreviousDate(newDate);
    // console.log(newDate);
    dateArray.unshift(newDate);
  }

  console.log(dateArray);

  db.CountyData.findAll({
    where: {
      date: dateArray // Same as using `id: { [Op.in]: [1,2,3] }`
    }
  })
  .then(function(result) {
    res.json(result);
  })
})


// calculate previous date, given a string formatted "YYYY-MM-DD"
// return in same string format
function getPreviousDate(date) {

  let year = parseInt(date.substring(0, 4));
  let month = parseInt(date.substring(5, 7));
  let day = parseInt(date.substring(8, 10));

  // create Date object
  let dateObj = new Date(year, month - 1, day);

  // Getting required values
  const newyear = dateObj.getFullYear();
  const newmonth = dateObj.getMonth();
  const newday = dateObj.getDate();

  // Creating a new Date (with the delta)
  const previousDate = new Date(newyear, newmonth, newday - 1);

  // final result

  const finalyear = previousDate.getFullYear();
  let finalmonth = previousDate.getMonth() + 1;
  if(finalmonth < 10) {
      finalmonth = "0" + finalmonth;
  }

  let finalday = previousDate.getDate();
  if(finalday < 10) {
      finalday = "0" + finalday;
  }


  const final = finalyear + "-" + finalmonth + "-" + finalday;

  console.log("previous date is: " + final);

  return final;
}


// get news on coronavirus from gnews.io
app.get("/api/covidnews/", function (req, res) {

  Axios.get("https://gnews.io/api/v3/search?q=coronavirus&token=260ad6598318e70842a0c954b398cb58")
  .then(result => {

    console.log(result.data);
    res.json(result.data);
  });
})


// get all disasters - not including COVID 19
app.get("/api/all_disasters_non_coivd", function (req, res) {

  db.FemaDisaster.findAll({
    where: {
      incidentType: {
        [Sequelize.Op.not]: 'Biological'
      }
    }
  })
  .then(function(result) {
    res.json(result);
  })
})


// get all disasters for a specified state - not including COVID 19
app.get("/api/all_disasters_non_coivd/:state", function (req, res) {

  db.FemaDisaster.findAll({
    where: {
      incidentType: {
        [Sequelize.Op.not]: 'Biological'
      },
      state: req.params.state
    }
  })
  .then(function(result) {
    res.json(result);
  })
})


// POST ROUTES

// create new location entry for a user
app.post("/api/add_location", function (req, res) {
  console.log("hit /api/add_location");

  db.Location.create({
    state: req.body.state,
    county: req.body.county,
    UserId: req.body.uid
  })
  .then(function () {

    let locationObject = {
      state: req.body.state,
      county: req.body.county,
      UserId: req.body.uid
    }
    console.log("Below is the log of the newly created locationObject");
    console.log(locationObject);
    res.json(locationObject);
  });
});

// create new location entry for a user
app.post("/api/set_user_ftu", function (req, res) {
  console.log("hit /api/set_user_ftu");
  console.log(req.body);

  db.Location.create({
    state: req.body.state,
    county: req.body.county,
    UserId: req.body.uid
  })
  .then(function () {

    let locationObject = {
      state: req.body.state,
      county: req.body.county,
      UserId: req.body.uid
    }
    console.log("Below is the log of the newly created locationObject");
    console.log(locationObject);
    res.json(locationObject);
  });
});


// create default DisasterKit
app.post("/api/default_disasterkit", function(req, res) {
  console.log("hit /api/default_disasterkit");

  let disasterItems = ["Water (three days supply)", 
  "Food (three day supply)", 
  "Battery-powered or hand crank radio",
  "Flashlight",
  "First aid kit",
  "Extra batteries",
  "Whistle (to signal for help)",
  "Dust mask",
  "Plastic sheeting and duct tape",
  "Moist towelettes",
  "Wrench or pliers",
  "Manual can opener",
  "Local maps",
  "Cell phone with chargers"
  ]

  let itemList = [];


  disasterItems.forEach(item => {
    db.DisasterKit.create({
      item: item,
      UserId: req.body.uid
    })
    .then(function (kit) {
  
      // console.log("Inserted item" + kit.item);
      itemList.push(kit);
      if (itemList.length === disasterItems.length) {
          res.status(200).json(itemList);
      }
    }).catch(function (error) {
      res.status(500).json(error);            
    });
  })
})


// create new disaster kit item for a user
app.post("/api/add_dkitem", function (req, res) {
  console.log("hit /api/add_dkitem");
  console.log(req.body);

  db.DisasterKit.create({
    item: req.body.text,
    UserId: req.body.uid
  })
  .then(function (dbKit) {

    let dkObject = {
      id: dbKit.id,
      item: dbKit.item,
      UserId: req.body.uid
    }
    // console.log("Below is the log of the newly created dkObject");
    // console.log(dkObject);
    res.json(dkObject);
  });
});


app.post("/api/add_multiple_dkitems", function(req, res) {
  console.log(req.body.list);

  let disasterItems = req.body.list;

  let itemList = [];


  disasterItems.forEach(item => {
    db.DisasterKit.create({
      item: item,
      UserId: req.body.uid
    })
    .then(function (kit) {
  
      // console.log("Inserted item" + kit.item);
      itemList.push(kit);
      if (itemList.length === disasterItems.length) {
          res.status(200).json(itemList);
      }
    }).catch(function (error) {
      res.status(500).json(error);            
    });
  })
})




// add new state_data
app.post("/api/state_data/", function(req, res) {

  let newStateData = req.body;
  // console.log("***************");
  // console.log(newStateData);

  let dataList = [];

  newStateData.forEach(item => {
    console.log(item);
    db.StateData.create({
      date: item.date,
      state: item.state,
      fips: item.fips,
      cases: item.cases,
      deaths: item.deaths
    })
    .then(function (response) {
  
      dataList.push(response);
      if (dataList.length === newStateData.length) {
        res.status(200).json(dataList);
      }
    }).catch(function (error) {
      res.status(500).json(error);            
    });
  })
})


// add new county data
app.post("/api/county_data/", function(req, res) {
  console.log("POST /api/county_data");

  let newCountyData = req.body;

  let dataList = [];

  // iterate through each new county and add to DB
  newCountyData.forEach(item => {
    console.log(item);
    db.CountyData.create({
      date: item.date,
      county: item.county,
      state: item.state,
      fips: item.fips,
      cases: item.cases,
      deaths: item.deaths
    })
    .then(function (response) {
  
      dataList.push(response);

      // if all items added successfully, return status 200
      if (dataList.length === newCountyData.length) {
        res.status(200).json(dataList);
      }
    }).catch(function (error) {
      res.status(500).json(error);            
    });
  })
})


// add new data to NationalData table
app.post("/api/national_data/", function(req, res) {
  console.log("hit /api/national_data");

  console.log(req.body);

  let newNationalData = req.body;

  let dataList = [];

  newNationalData.forEach(item => {
    console.log(item);
    db.NationalData.create({
      date: item.date,
      cases: item.cases,
      deaths: item.deaths
    })
    .then(function (response) {
  
      dataList.push(response);
      if (dataList.length === newNationalData.length) {
        res.status(200).json(dataList);
      }
    }).catch(function (error) {
      res.status(500).json(error);            
    });
  })
})






// PUT ROUTES

app.put("/api/set_user_ftu", function (req, res) {

  console.log("hit /api/set_user_ftu");
  console.log(req.body);
  db.User.update({ firstTimeUse: req.body.value }, {
    where: {
      id: req.body.uid
    }
  })
  .then(function (dbMember) {
    res.json({});
  });

});


  // DELETE ROUTES

  app.delete("/api/delete_dkitem/:id", function (req, res) {
    console.log("Made it to delete disaster kit item function");

    db.DisasterKit.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbKit) {
      res.json(dbKit);
    });
  });

}