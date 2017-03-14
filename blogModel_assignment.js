
// defining a mongoose schema 
// including the module
var mongoose = require('mongoose');
// declare schema object.
var Schema = mongoose.Schema;

var blogSchema = new Schema({

	title 		: {type:String,default:'',required:true},
	language    :{type:String,default:'',required:true},
	subTitle 	: {type:String,default:''},
	blogBody 	: {type:String},
	tags		: [],// name of tags in array
	created		: {type:Date},
	lastModified : {type:Date},
	authorInfo  :  {} ,// information of author in form of obje-ct
	comments :[ {
                      user_name :{type :String ,required:true},
                     comment_body:{type:String ,default:''}

                       } 
                    ],
    upvotes	:{type:Number,default:0},
    downvotes:{type:Number,default:0},
    fshares:[
    			{user_name :{type :String ,required:true}}
    		],
    tshares:[
    			{user_name :{type :String ,required:true}}
    		],
    topFeeds:{}
     
                     


    			




    		




	
	

});


module.exports = mongoose.model('Blog',blogSchema);