






exports.checkValid = function(req,res,next){
	var input = String(req.params.id);
	
	for(i in input)
	{
		if((input[i]>= '0' && input[i] <='9') || (input[i] >= 'a'  && input[i] <= 'z')){
			//console.log("under if statement middleware");
		
			
		}else{
			res.status = 404;
			console.log("1");
			next();
		}
	}
	next();
	
}
	