// from auth to cross verify
var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"); 



//*************************************** */
// var express = require("express");
var app = express();
// var bodyParser = require("body-parser");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));




               //DATA-BASE Setup
// =====================================================
// var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/BlogApp",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://blogHAB:blogHAB@cluster1.kce6v.mongodb.net/blogHAB?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});


// mongodb+srv://blogHAB:<password>@cluster1.kce6v.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.set('useFindAndModify', false);

var BlogSchema = new mongoose.Schema({
	title: String,
	image:String,
	body:String,
	uid:String,
	uname:String
	
});
//************

var Blog = mongoose.model("Data",BlogSchema);
// ======================================================================================
						  //"Passports Imports" //
			// ===============================================

			app.use(require("express-session")({
				secret : "Rusty is the best and cutest dog in the world",
				resave : false , 
				saveUninitialized : false
			}));
			
			app.use(passport.initialize());
			app.use(passport.session());
			
			passport.use(new LocalStrategy(User.authenticate()));
			passport.serializeUser(User.serializeUser());
			passport.deserializeUser(User.deserializeUser());
			

// ************************************************************************************			


              // RESTFUL Routes:-
// ==========================================================

     // Index
// =======================
app.get("/",function(req,res){
	res.redirect("/blogs");
});



app.get("/blogs",function(req,res){

		Blog.find({},function(err,body){
		if(err){
			console.log("Error At /blogs Route");
			console.log(err);
		}else{
			
			res.render("index",{Blog:body,cu:req.user});
		}
		
	});
});
	
	// ************* Index route Ended******************

                     // New Route
		// =======================================

app.get("/blogs/new",isLoggedIn,function(req,res){
	
	res.render("new",{cu:req.user});
});

// ************************************* New Route Ended****************************

                  // Post Route
  // =======================================
app.post("/blogs",isLoggedIn,function(req,res){
	var title = req.body.Title;
    var image = req.body.Image;
	var des = req.body.Description;
	var uid=req.body.uid;
	var uname=req.body.uname;
	var newData = {title:title,image:image,body:des,uid:uid,uname:uname};
	
	Blog.create(newData,function(err,body){
		if(err){
			console.log("Error At Post Route");
			console.log(err);
		}else{
			res.redirect("/blogs");
			
		}
	});
});

      //Detail Route
// ======================================
  app.get("/blogs/:id",function(req,res){
	//   console.log("For Blog ID");
	// console.log(req);
	Blog.findById(req.params.id,function(err,body){
		if(err){
			console.log("Error At id Line");
		}else{
			res.render("detail",{blog:body,cu:req.user});
			
		}
		
	});
  });
	
// *********************************************************

                          // Edit Route
 // =====================================================================
app.get("/blogs/:id/edit",isLoggedIn,function(req,res){
	Blog.findById(req.params.id,function(err,body){
		if(err){
			console.log("Error At edit id Line")
		}else{
			res.render("edit",{blog:body});
			
		}
		
	});
 
});
 // put route
app.put("/blogs/:id",isLoggedIn,function(req,res){
	
	
	var title = req.body.Title;
     var image = req.body.Image;
	var des = req.body.Description;
	var newData = {title:title,image:image,body:des};
	
	Blog.findByIdAndUpdate(req.params.id,newData,function(err,updatedBody){
		if(err){
		 res.redirect("/blogs");
		}else{
			
			res.redirect("/blogs/"+req.params.id);
		}
		
	});
	
});
           
// ***********************************************************************/
          // Delete route
// ===================================================
app.delete("/blogs/:id",isLoggedIn,function(req,res){
			Blog.findByIdAndRemove(req.params.id,function(err){
				if(err){
					res.redirect("/blogs");
					console.log("Error");
					console.log(err);
				}else{
					res.redirect("/blogs");
				}
			});

});
// ************************************************


// Authentication Routes:-
// ===============================

// /show signup form
app.get("/register",function(req, res) {
    res.render("register");
});

// app.get("/success",isLoggedIn, function(req, res){
// 	res.render("success"); 
//  });

// handling user sign up
app.post("/register",function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    User.register(new User({username : req.body.username}), req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("/register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/");
        });
    });
});

//LOGIN ROuTES
// var temp;
app.get("/login",function(req, res) {

	res.render("login");
	
});
//login logic
//middleware
app.post("/login",passport.authenticate("local", {

    successRedirect:"/",
    failureRedirect: "/login"
    }),function(req,res){
		
});

app.get("/logout",function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next){

    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



// ********************************Auth routes ends***********************8



// isLoggedIn

// ************************************* Post Route Ended****************************

//wrong route
app.get("/wrong",function(req,res){
	res.render("wrong");
})

app.listen("3000",function(){
	console.log("Server Started");
});

// app.listen(process.env.port,process.env.ip);

// app.listen(process.env.PORT,process.env.IP);

// de8dc6f4472a1f06ef54d889163b699d062cf9a0