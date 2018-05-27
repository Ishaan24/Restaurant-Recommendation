  var ejs = require("ejs");
  var mysql = require('mysql');
  var PythonShell = require('python-shell');
  var dbconn =  mysql.createConnection({
  host     : 'restaurant.cj3bln36gwtc.us-west-1.rds.amazonaws.com',
    user     : 'master',
    password : 'master123',
    database : 'master',
    port   : 3306
    });
  dbconn.connect(function(err){
    if(err){
      console.log('Database connection error');
    }else{
      console.log('Database connection successful');
    }
  });



	exports.login = function(req, res){
		     res.render('login',{}); 
  };

  exports.logout = function(req,res)
	{
		req.session.destroy();
		res.redirect('/');
	};

  exports.userRegister = function(req, res){
  	var name=req.param('name');
    var email=req.param('email');
    var password=req.param('password');
    var x=[];
    x= name.split(" ");
    firstName=x[0];
    lastName=x[1];
    var sendObj={
      status:null
    }
  	console.log(email);
    req.session.firstName=firstName;
    req.session.lastName=lastName;
    req.session.email=email;
    var sql = "INSERT INTO user (first_name,last_name,email,password) VALUES ('"+firstName+"','"+lastName+"','"+email+"','"+password+"');";
    dbconn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      sendObj.status=200;
      res.send(sendObj);
    });
  };



  exports.userLogin = function(req, res){
    var email=req.param('email');
    var password=req.param('password');
    var sendObj={
      status:null
    }
    console.log(email);
    if(email=="admin@gmail.com" && password=="admin"){
      sendObj.status=203;
      res.send(sendObj);
    }

    var sql = "select * from user where email='"+email+"';";
    dbconn.query(sql, function (err, records) {
      if (err) {
        sendObj.status=202;
        res.send(sendObj);
      }
      else if(records.length==0){
        sendObj.status=202;
        res.send(sendObj);
      }
      else{
        if(password == records[0].password){
          console.log("ok");
          console.log(records[0].first_name);
          req.session.firstName=records[0].first_name;
          req.session.lastName=records[0].last_name; 
          req.session.email=records[0].email;
          req.session.city=records[0].location;
          console.log("C:"+records[0].location);
          console.log("C1:"+req.session.city);
          req.session.userId=records[0].user_id;
          sendObj.status=200;
          res.send(sendObj);
        }
        else{
          console.log("Passwords not matching");
          sendObj.status=201;
          res.send(sendObj);
        }
      }
    });
  };


  exports.userhome = function(req,res){
    console.log("inside userhome get");
    var sendObj={
      status:null
    };
    var options = {
      mode: 'text',
      //pythonPath: 'path/to/python',
      pythonOptions: ['-u'],
      scriptPath: '/Users/Tirath/Desktop/OneDrive/CMPE_256/Project/restaurant-analysis/public/angularjs',
      args: [req.session.email]
    };

      PythonShell.run('256Project.py', options, function (err, results) {
      if (err) throw err;
      console.log('Python script executed');
    
      var sql = "select user_id,location from user where email='"+req.session.email+"';";
      dbconn.query(sql, function (err, records) {
      if (err) {
        throw err;
      }
      else{

        req.session.userId=records[0].user_id;
        req.session.city=records[0].location;
        console.log("User ID:"+req.session.userId);
        var id=req.session.userId;
        var sql1="SELECT * FROM restaurant inner join user_rec on user_rec.restaurant_ID=restaurant.Restaurant_ID and user_rec.user_id='"+id+"';";
        
        //var sql1="SELECT * FROM restaurant inner join user_rec on user_rec.restaurant_ID=restaurant.Restaurant_ID and user_id="+46+";";
        
        dbconn.query(sql1, function (err, records) {
        
          if (err) {
            throw err;
          }
          else {
            console.log("ok");
            req.session.records=records;
            res.render('userhome',{"firstName":req.session.firstName,"restaurants":records});
          }

        });  
        }
      
    });

    });

};





exports.userloginhome = function(req,res){
    console.log("inside loginuserhome get");
    var sendObj={
      status:null
    };
    
      var sql = "select user_id,location from user where email='"+req.session.email+"';";
      dbconn.query(sql, function (err, records) {
      if (err) {
        throw err;
      }
      else{
        req.session.userId=records[0].user_id;
        req.session.city=records[0].location;
        console.log("User ID:"+req.session.userId);
        console.log("User ID:"+typeof(req.session.userId));
        var id=req.session.userId;
        var sql1="SELECT * FROM restaurant inner join user_rec on user_rec.restaurant_ID=restaurant.Restaurant_ID and user_rec.user_id='"+id+"';";
        //var sql1="SELECT * FROM restaurant inner join user_rec on user_rec.restaurant_ID=restaurant.Restaurant_ID and user_id="+46+";";
        dbconn.query(sql1, function (err, records) {
        if (err) {
          throw err;
        }
        else{
          console.log("ok");
          req.session.records=records;
          console.log(records[0].Latitude);
          res.render('userhome',{"firstName":req.session.firstName,"restaurants":records});
        }
        });  
        }
      
    });

};

exports.userInfo = function(req,res){
    console.log("inside userhome get");

  res.render('userInfo',{"firstName":req.session.firstName});
};

exports.admin = function(req,res){
    console.log("inside admin get");

  res.render('admin',{});
};



exports.userPreferences = function(req, res){
    var location=req.param('location');
    req.session.city=location;
    var price=req.param('price');
    var cuisines=req.param('cuisines');
    var table=req.param('table');
    var delivery=req.param('online');
    console.log('del:'+delivery);
    console.log('table:'+table);
    var email=req.session.email;
    var sendObj={
      status:null
    }
    console.log(email);
    console.log(cuisines);

    //var sql = "UPDATE user SET location='"+location+"',preferred_cuisine='"+cuisines+"',preferred_price='"+price+"' WHERE email='"+email+"';";
    var sql = "UPDATE user SET location='"+location+"',preferred_cuisine='"+cuisines+"',preferred_price='"+price+"',preferred_table='"+table+"',preferred_delivery='"+delivery+"' WHERE email='"+email+"';";
    dbconn.query(sql, function (err, records) {
      if (err) throw err;
      console.log("1 record updated");
      sendObj.status=200;
      res.send(sendObj);
    });
  };


  exports.topRated = function(req,res){
    console.log("inside top rated get");
    console.log("city:"+req.session.city);
    var sql = "select * from restaurant where City='"+req.session.city+"'order by Aggregate_rating desc;";
    dbconn.query(sql, function (err, records) {
      if (err) {
        throw err;
      }
      else{
        var top=records;
        console.log(top);
        res.render('toprated',{"firstName":req.session.firstName,"restaurants":top});
        }
      
    });

};


exports.mostVoted = function(req,res){
    console.log("inside top rated get");
    console.log("city:"+req.session.city);
    var sql = "select * from restaurant where City='"+req.session.city+"'order by Votes+0 desc;";
    dbconn.query(sql, function (err, records) {
      if (err) {
        throw err;
      }
      else{
        var vote=records;
        console.log(vote);
        res.render('mostvoted',{"firstName":req.session.firstName,"restaurants":vote});
        }
      
    });

};


