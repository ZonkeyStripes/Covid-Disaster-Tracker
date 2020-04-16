// Requiring our models and passport as we've configured it

let db = require("../models");
let passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {

    console.log("** login** req.user on the server: ");
    console.log(req.user);
    
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
      // display_name: req.user.display_name
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log("hit api/signup");
    console.log(req.body);

    db.User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then(function () {
        res.json({
          email: req.body.email
        })
      })
      .catch(function (err) {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    console.log("/logout api route is FIRING!");
    req.logout();
    res.redirect("/login");
  });


  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea

      res.json({
        email: req.user.email,
        id: req.user.id,
        display_name: req.user.display_name
      });
    }
  });

  // GET ROUTES FOR ACCESSING THE DATABASE

  app.get("/api/getGroupbyID/:gid", function(req, res) {

    console.log("req.params.gid = " + req.params.gid);

    db.Group.findOne({
      where: {
        id: req.params.gid
      }
    }).then(function(dbGroup) {
      res.json(dbGroup);
    })

  });


// Route for getting all picks for a specific member on a specific week
app.get("/api/user_picks/:memid/:week", function(req, res) {
  console.log("hit the user_picks get by week route");
  
  let member_id = req.params.memid;
  console.log("member id is " + member_id);


  db.Pick.findAll({
    where: {
      week: req.params.week,
      MemberId: member_id
    }
  }).then(function(dbPick) {
    res.json(dbPick);
  })
});



// Route for getting all picks for a specific member for all weeks
app.get("/api/user_picks/:memid", function(req, res) {
  console.log("hit the user_picks get all weeks route");
  
  let member_id = req.params.memid;
  console.log("member id is " + member_id);

  db.Pick.findAll({
    where: {
      MemberId: member_id
    }
  }).then(function(dbPick) {
    res.json(dbPick);
  })
});


// Get route to return all users in a group
app.get("/api/group_users/:id", function(req, res) {
  console.log("hit the group_users get route");

  let group_id = req.params.id;
  console.log("/api/group_users on the server: ");
  console.log("group_id is " + group_id);

  db.User.findAll({
    include: [
      {
        model: db.Member, 
        include: [
            db.Group
        ],
        where: {
          GroupId: group_id
        },
      }
    ]
  }).then(function(dbUser) {
    res.json(dbUser);
  })
});

// Get request to search user data base for email match //
app.get("/api/member/:newMemberEmail", function(req, res) {
  console.log("The /api/member/:newMemberEmail route is FIRING!");
  let newGroupMember = req.params.newMemberEmail;
  console.log("the email sent through path params is " + newGroupMember);

  db.User.findAll({
    where: {
      email: req.params.newMemberEmail
    }
  }).then(function(dbUser) {
    console.log("new member data returned to client");
    res.json(dbUser)
    })
  })



// route to return a specific week's schedule
app.get("/api/week_schedule/:week", function(req, res) {

  console.log("hit /api/week_schedule, week is " + req.params.week);

  db.Schedule.findAll({
    where: {
      week: req.params.week
    }
  }).then(function(dbSchedule) {

    console.log(dbSchedule);
    res.json(dbSchedule);
  })

});


//GET request to render League page /////
app.get("/league/:groupId:loggedin_id", function(req, res){
  console.log("api route /league/:groupId is FIRING")
  let loggedin_id = req.params.loggedin_id;
  console.log("loggedin_id is " + loggedin_id);
  let groupId = req.params.groupId;
  console.log("groupId is " + groupId);

    db.Group.findOne({
      where: {
        id: groupId
      }
    }).then(function(dbGroup) {
      console.log("*******log of dbGroup below");
      console.log(dbGroup);

      let leagueObject = {
        name: dbGroup.dataValues.name
      }
      console.log(leagueObject);
      res.render("league", leagueObject);
    })
  
})

// route to return the entire season's schedule
app.get("/api/schedule/", function(req, res) {

  console.log("hit /api/schedule");

  db.Schedule.findAll({}).then(function(dbSchedule) {

    console.log(dbSchedule);
    res.json(dbSchedule);
  })

});


// route to return a specific week and game's schedule info
app.get("/api/game_schedule/:week/:game", function(req, res) {

  console.log("hit /api/game_schedule, week is " + req.params.week + " and game is " + req.params.game);

  db.Schedule.findAll({
    where: {
      week: req.params.week,
      game_number: req.params.game
    }
  }).then(function(dbSchedule) {

    console.log(dbSchedule);
    res.json(dbSchedule);
  })

});


// route to return the member ID that corresponds to a User ID and Group ID pair
app.get("/api/get_memberID/:id/:gid", function(req, res) {

  console.log("hit api/get_memberID, id is " + req.params.id + " gid is " + req.params.gid);

  db.Member.findOne({
    where: {
      UserId: req.params.id,
      GroupId: req.params.gid
    }
  }).then(function(dbMember) {

    res.json(dbMember);
  })
});


// Get route to return all groups belonging to a user
app.get("/api/getallgroups/:uid", function(req, res) {
  console.log("hit the getallgroups get route");

  let uid = req.params.uid;
  console.log("uid is " + uid);

  db.Group.findAll({
    include: [
      {
        model: db.Member, 
        include: [
            db.User
        ],
        where: {
          UserId: uid
        },
      }
    ]
  }).then(function(dbGroup) {
    res.json(dbGroup);
  })
});







  // POST ROUTES

  // POST request to create a new league and add to database //
  app.post("/api/group", function (req, res) {
    console.log("The create a new group api is FIRING");
    db.User.findAll({
    })
    db.Group.create({
      name: req.body.name,
      UserId: req.body.uid
    })
    .then(function () {

      let groupObject = {
        name: req.body.name
      }
      console.log("Below is the log of the newly created groupObject");
      console.log(groupObject);
      res.json(groupObject);
    });
  });

  // GET route to retrun all group table data
  app.get("/api/groups/:name", function(req, res) {
    console.log("/api/groups/:name route is FIRING!");
    // Query to search groups table where name matches params.name data //
    db.Group.findAll({
      where: {
        name: req.params.name
      }
    }).then(function(dbGroup) {
      res.json(dbGroup);
    })
  })


  // add a new group member from the page to add a new league
  // input is an object with "user_id" and "GroupId" keys
  app.post("/api/member", function (req, res) {
    console.log("post /api/member/ route");
    console.log(req.body);

    db.Member.create(req.body
      ).then(function (dbMember) {
      res.json(dbMember);
      console.log("league creator added to group");

    });
  });

  // Similar to above POST - this also adds a new member to a group once it's been created.
  // The difference from above POST request is that this one will query members table to make sure that member to be added 
  // isn't already a member.
  // input is an object with groupID and newMemberUserId

  app.post("/api/new_member/", function (req, res) {
    console.log("post /api/new_member/ route")
    console.log(req.body);

    db.Member.findOrCreate({
      where: {
        GroupId: req.body.GroupId,
        UserId: req.body.UserId
      }
    }
    ).then(function (dbMember) {
      res.json(dbMember);
      console.log("new member added to group");
    })
  })



  // add a new pick
  // input is an object with "week", "game_number","prediction" and "MemberId" keys
  app.post("/api/pick", function (req, res) {
    console.log("post /api/pick/ route");
    console.log(req.body);

    db.Pick.create(req.body).then(function (dbPick) {
      res.json(dbPick);
    });
  });


  // add a new result
  // input is an object with "week", "game_number", "winner", "winner_name", and "loser_name" keys
  app.post("/api/result", function (req, res) {
    console.log("post /api/result/ route");
    console.log(req.body);

    db.Result.create(req.body).then(function (dbResult) {
      res.json(dbResult);
    });
  });


  // DELETE ROUTES

  app.delete("/api/delete_group/:gid", function (req, res) {
    console.log("Made it to delete group function");

    db.Group.destroy({
      where: {
        id: req.params.gid
      }
    }).then(function (dbGroup) {
      res.json(dbGroup);
    });
  });

  app.delete("/api/delete_member/:mid", function (req, res) {
    console.log("Made it to delete member function");

    db.Member.destroy({
      where: {
        id: req.params.mid
      }
    }).then(function (dbMember) {
      res.json(dbMember);
    });
  });

  // PUT ROUTES

  app.put("/api/update_user_dn/:id", function (req, res) {

    console.log("The user id being modified is: " + req.params.id);
    console.log("req.body" + req.body);
    console.log("req.body.display_name " + req.body.display_name);
    db.User.update({ display_name: req.body.display_name }, {
      where: {
        id: req.params.id
      }
    });
  });


  // update an already existing pick to a new prediction
  // input is an object with "id" and "prediction" keys
  app.put("/api/pick", function (req, res) {

    //console.log("req.body" + req.body);

    console.log("req.body.id = " + req.body.id);
    console.log("req.body.prediction = " + req.body.prediction);
    
    db.Pick.update({ 
      prediction: req.body.prediction 
    }, {
      where: {
        id: req.body.id
      }
    });
  });



}