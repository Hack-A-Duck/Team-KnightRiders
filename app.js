var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));




               //DATA-BASE Setup
// =====================================================
var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/BlogApp",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://blogHAB:blogHAB@cluster1.kce6v.mongodb.net/blogHAB?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});


// mongodb+srv://blogHAB:<password>@cluster1.kce6v.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.set('useFindAndModify', false);

var BlogSchema = new mongoose.Schema({
	title: String,
	image:String,
	body:String
	
});
//************

var Blog = mongoose.model("Data",BlogSchema);




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
			
			res.render("index",{Blog:body});
		}
		
	});
});
	
	// ************* Index route Ended******************

                     // New Route
		// =======================================

app.get("/blogs/new",function(req,res){
	res.render("new");
});

// ************************************* New Route Ended****************************

                  // Post Route
  // =======================================
app.post("/blogs",function(req,res){
	var title = req.body.Title;
    var image = req.body.Image;
	var des = req.body.Description;
	var newData = {title:title,image:image,body:des};
	
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
	
	Blog.findById(req.params.id,function(err,body){
		if(err){
			console.log("Error At id Line");
		}else{
			res.render("detail",{blog:body});
			
		}
		
	});
  });
	
// *********************************************************

                          // Edit Route
 // =====================================================================
app.get("/blogs/:id/edit",function(req,res){
	Blog.findById(req.params.id,function(err,body){
		if(err){
			console.log("Error At edit id Line")
		}else{
			res.render("edit",{blog:body});
			
		}
		
	});
 
});
 // put route
app.put("/blogs/:id",function(req,res){
	
	
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
app.delete("/blogs/:id",function(req,res){
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


// ************************************* Post Route Ended****************************
// app.listen("3000",function(){
// 	console.log("Server Started");
// });

// app.listen(process.env.port,process.env.ip);

app.listen(process.env.PORT,process.env.IP);