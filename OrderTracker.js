var request = require('request');

var OrderTracker = class OrderTracker{
	
	constructor(options){
	  	this.username = options.username;
	  	this.password = options.password;
	  	this.apikey = options.apikey;
	  	this.environment = options.environment;

	  	if(this.environment=="test"){
  			this.uri = "https://wwwcie.ups.com/rest/Track";
		}
		else if(this.environment=="production"){
		  	this.uri = "https://onlinetools.ups.com/rest/Track";
		}
		else{
			throw "Illegal environment specified";
		}
	}

	lookup(trackingCode){
	  	var payload = {
					"UPSSecurity": {
					"UsernameToken": {
						"Username": this.username, "Password": this.password}, 
					"ServiceAccessToken": {
						"AccessLicenseNumber": this.apikey}}, 
					"TrackRequest": {
						"Request": { 
							"RequestOption": "1",
							"TransactionReference": {
								"CustomerContext": "Your Test Case Summary Description"}
						},
						"InquiryNumber": trackingCode
					}
				};
		
		var uri = this.uri;

		return new Promise(function(resolve, reject){

		  	request({
			  		uri: uri,
			  		method: "POST",
		  		}, function(error, response, body){
		  			if (!error && response.statusCode == 200) {
		  				var data = JSON.parse(body);
		  				resolve(data);
		  			}
		  			else{
						console.error("Tracking request failed");
						console.error(error);
						console.error(response);
						reject(Error(error));
		  			}
		  		}
		  	); 
		});
	}
}

module.exports = OrderTracker;






