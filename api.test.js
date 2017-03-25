var superagent = require('superagent');
var expect = require('expect.js');
var config = require('./config');
var port = config.get('port');
let url = `http://localhost:${port}/vehicles`;

describe('moduscreate-api', function(){

  it('Get vehicle list for requirement #1', function(done){
    let data = {
      year: 2015,
      manufacturer: 'Audi',
      model: 'A3'
    };
    superagent.get(`${url}/${data.year}/${data.manufacturer}/${data.model}`)
      .send()
      .end(function (err, res){
	if(err)
	  console.log(err);
	expect(res.body).to.be.an('object');
	done();
      });
  });
});

