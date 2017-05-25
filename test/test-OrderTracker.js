var chai = require('chai');
var OrderTracker = require('../OrderTracker');

describe('OrderTrackerTests', function() {
  it('OrderTracker should initialize with config', function(done){
  	var config = {
  		username: "blah",
  		password: "password",
  		apikey: "abcdefgh",
  		environment: "test"
  	}

  	var orderTracker = new OrderTracker(config);

  	chai.assert.isNotNull(orderTracker);

  	done();
  });

  it('OrderTracker should call api', function(done){
  	var config = {
  		username: "blah",
  		password: "password",
  		apikey: "abcdefgh",
  		environment: "test"
  	}

  	var orderTracker = new OrderTracker(config);

  	orderTracker.lookup("123456").then(function(data){
  		chai.assert.isNotNull(data);
  		console.log(data);
  		done();
  	});

  })
});