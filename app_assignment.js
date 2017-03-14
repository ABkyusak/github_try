var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// calling mongoose module 
var mongoose = require('mongoose');
var dbPath  = "mongodb://localhost/myblogapp";

// command to connect with database
db = mongoose.connect(dbPath)

var Blog = require('./blogModel_assignment.js');

var blogO = mongoose.model('Blog');

app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));

//lets define configuration of database 

var middleware = require('./middleware_assign.js');

mongoose.connection.once('open', function() {

	console.log("database connection open success");

});

// include the model file 

app.use(function(req,res,next){
	
	console.log("the url that was hit is",req.originalUrl);
	next();
	
	
});




// route to create a new blog
app.post('/create',function(req,res){
      

		var blogN = new blogO({
		  title : req.body.title,
		  subTitle :req.body.subTitle,
		  blogBody : req.body.blogBody 
		  	
		});
		
		var date = Date.now();
		blogN.created = date;
		
		
		var authorI = { Name : req.body.Name, Address: req.body.Address};
		blogN.authorInfo = authorI;
		
		var tagged = (req.body.tags != undefined && req.body.tags != NaN)?req.body.tags.split(','):' ';
		blogN.tags = tagged;
		
		blogN.save(function(err){
			if(err)
				console.log("failed to save");
			else
				res.send(blogN);
		});
});

//API to check route is working
  app.get('/',function(req,res){
	  res.send("blog in progess");
  });
  
  
  
  app.get('/findPBlog/:id',middleware.checkValid,function(req,res,next){
	  
	  //alert("123");
	  if(res.status == 404){
		 // res.send("wrong id entered");
		 
		// console.log("2");
		  next("not valid  id ");
	  }
	
		blogO.findOne({'_id':req.params.id},function(err,result){
			    
				if(err){
					res.status = 403;
					next("id not found");
				}
				else
					res.send(result);
			
		});
});

app.use(function(err,req,res,next){
	
	//console.log(err);
	if(res.status == 404){
		res.send(err);
	//	console.log("3");
	}else if(res.status == 403){
		res.send(err);
		
	}
	next();
});

//API to view all blogs




app.get('/findAll',function(req,res){
	
	  blogO.find(function(err,result){
		  if(err)
			  console.log(err);
		  else
			  res.send(result);
	  });
});

// if user enter a wrong route 

app.get('/*',function(req,res){
	     res.send("u have entered a wrong route");
});


app.put('/update/:id',function(req,res){
	
	var update = req.body;
	
	blogO.findOneAndUpdate({'_id':req.params.id},update,function(err,result){
		if(err)
			res.send(err);
	    else
			res.send(result);
	});
	
});


app.post('/delete/:id',function(req,res){
	
	blogO.remove({'_id':req.params.id},function(err,result){
		
				if(err)
					res.send(err);
				else
					res.send(result);
	});
	
	
	/*blogO.find({'_id':req.params.id}).remove().exec(function(err, data){
		
			if(err)
					res.send(err);
			else
					res.send(data);
	});
		*/
});







app.listen(3000,function(){
	console.log("app listening on port 3000")
});