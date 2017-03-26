var superagent = require('superagent');
var expect = require('expect.js');
let Promise = require('bluebird');

var config = require('./config');
var port = config.get('port');
let url = `http://localhost:${port}/vehicles`;

let data = [{
  year: 2015,
  manufacturer: 'Audi',
  model: 'A3'
},{
  year: 2015,
  manufacturer: 'Toyota',
  model: 'Yaris'
},{
  year: 1995,
  manufacturer: 'Ford',
  model: 'Crown Victoria'
},{
  manifacturer: 'Ford',
  model: 'Fusion'
}];


describe('moduscreate-api', function(){

  it('Get vehicle list for requirement #1 ex1', function(done){
    superagent.get(`${url}/${data[0].year}/${data[0].manufacturer}/${data[0].model}`)
      .send()
      .end(function (err, res){
	if(err)
	  console.log(err);
	console.log(res.body);
	expect(res.body).to.be.an('object');
	expect(res.body).to.have.property('Count');
	expect(res.body).to.have.property('Results');
	expect(res.body.Count).to.be.above(-1);
	for(let i = 0; i<res.body.Count; i++){
	  expect(res.body.Results[i]).to.have.property('Description');
	  expect(res.body.Results[i]).to.have.property('VehicleId');
	}
	done();
      });
  });

  it('Get vehicle list for requirement #1 ex2', function(done){
    superagent.get(`${url}/${data[1].year}/${data[1].manufacturer}/${data[1].model}`)
      .send()
      .end(function (err, res){
	if(err)
	  console.log(err);
	console.log(res.body);
	expect(res.body).to.be.an('object');
	expect(res.body).to.have.property('Count');
	expect(res.body).to.have.property('Results');
	expect(res.body.Count).to.be.above(-1);
	for(let i = 0; i<res.body.Count; i++){
	  expect(res.body.Results[i]).to.have.property('Description');
	  expect(res.body.Results[i]).to.have.property('VehicleId');
	}
	done();
      });
  });

  it('Get vehicle list for requirement #1 ex3', function(done){
    superagent.get(`${url}/${data[2].year}/${data[2].manufacturer}/${data[2].model}`)
      .send()
      .end(function (err, res){
	if(err)
	  console.log(err);
	console.log(res.body);
	expect(res.body).to.be.an('object');
	expect(res.body).to.have.property('Count');
	expect(res.body).to.have.property('Results');
	expect(res.body.Count).to.be.above(-1);
	for(let i = 0; i<res.body.Count; i++){
	  expect(res.body.Results[i]).to.have.property('Description');
	  expect(res.body.Results[i]).to.have.property('VehicleId');
	}
	done();
      });
  });

   it('Get vehicle list for requirement #1 ex4', function(done){
    superagent.get(`${url}/${data[3].year}/${data[3].manufacturer}/${data[3].model}`)
      .send()
      .end(function (err, res){
	if(err)
	  console.log(err);
	console.log(res.body);
	expect(res.body).to.be.an('object');
	expect(res.body).to.have.property('Count');
	expect(res.body).to.have.property('Results');
	expect(res.body.Count).to.be.above(-1);
	for(let i = 0; i<res.body.Count; i++){
	  expect(res.body.Results[i]).to.have.property('Description');
	  expect(res.body.Results[i]).to.have.property('VehicleId');
	}
	done();
      });
   });

  it('Get vehicle list with POST requirement #2 ex1', function(done){
    superagent.post(url)
      .send({
	"modelYear": 2015,
	"manufacturer": "Audi",
	"model": "A3"
      }).end(function (err, res){
	if(err){
	  console.log(err);
	}
	console.log(res.body);
	expect(res.body).to.be.an('object');
	expect(res.body).to.have.property('Count');
	expect(res.body).to.have.property('Results');
	done();
      });
  });

  it('Get vehicle list with POST requirement #2 ex2', function(done){
    superagent.post(url)
      .send({
	"modelYear": 2015,
	"manufacturer": "Toyota",
	"model": "Yaris"
      }).end(function (err, res){
	if(err){
	  console.log(err);
	}
	console.log(res.body);
	expect(res.body).to.be.an('object');
	expect(res.body).to.have.property('Count');
	expect(res.body).to.have.property('Results');
	done();
      });
  });
  
  it('Get vehicle list with POST requirement #2 ex1', function(done){
    superagent.post(url)
      .send({
	"manufacturer": "Honda",
	"model": "Accord"
      }).end(function (err, res){
	if(err){
	  console.log(err);
	}
	console.log(res.body);
	expect(res.body).to.be.an('object');
	expect(res.body).to.have.property('Count');
	expect(res.body).to.have.property('Results');
	done();
      });
  });

  it('Get vehicle list for requirement #3 ex1 withRating=true', function(done){
    superagent.get(`${url}/${data[0].year}/${data[0].manufacturer}/${data[0].model}?withRating=true`)
      .send()
      .end(function (err, res){
	if(err)
	  console.log(err);
	console.log(res.body);
	expect(res.body).to.be.an('object');
	expect(res.body).to.have.property('Count');
	expect(res.body).to.have.property('Results');
	expect(res.body.Count).to.be.above(-1);
	for(let i = 0; i<res.body.Count; i++){
	  expect(res.body.Results[i]).to.have.property('CrashRating');
	  expect(res.body.Results[i]).to.have.property('Description');
	  expect(res.body.Results[i]).to.have.property('VehicleId');
	}
	done();
      });
  });

  it('Get vehicle list for requirement #3 ex1 withRating=false', function(done){
    superagent.get(`${url}/${data[0].year}/${data[0].manufacturer}/${data[0].model}?withRating=false`)
      .send()
      .end(function (err, res){
	if(err)
	  console.log(err);
	console.log(res.body);
	expect(res.body).to.be.an('object');
	expect(res.body).to.have.property('Count');
	expect(res.body).to.have.property('Results');
	expect(res.body.Count).to.be.above(-1);
	for(let i = 0; i<res.body.Count; i++){
	  expect(res.body.Results[i]).to.not.have.property('CrashRating');
	  expect(res.body.Results[i]).to.have.property('Description');
	  expect(res.body.Results[i]).to.have.property('VehicleId');
	}
	done();
      });
  });

  it('Get vehicle list for requirement #3 ex1 withRating=bananas', function(done){
    superagent.get(`${url}/${data[0].year}/${data[0].manufacturer}/${data[0].model}?withRating=bananas`)
      .send()
      .end(function (err, res){
	if(err)
	  console.log(err);
	console.log(res.body);
	expect(res.body).to.be.an('object');
	expect(res.body).to.have.property('Count');
	expect(res.body).to.have.property('Results');
	expect(res.body.Count).to.be.above(-1);
	for(let i = 0; i<res.body.Count; i++){
	  expect(res.body.Results[i]).to.not.have.property('CrashRating');
	  expect(res.body.Results[i]).to.have.property('Description');
	  expect(res.body.Results[i]).to.have.property('VehicleId');
	}
	done();
      });
  });

  
});

