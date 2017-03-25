var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var config = require('./config');

config.set('baseDir', process.cwd());

var app = express();
app.set('port', (process.argv[2] || config.get('port')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var VehicleController = require('./controllers/VehicleController');

function vehiclesResponse(year, manufacturer, model, res){
  VehicleController.getVehicles(year, manufacturer, model, function(output){
    res.json(output);
  });
}

function vehiclesResponseWithRating(year, manufacturer, model, res){
  VehicleController.getVehicles(year, manufacturer, model, function(output){
    Promise.map(output.Results, v => {
      let vehicleId = v.VehicleId;
      return VehicleController.getVehicleRating(vehicleId).then(rating => {
	v.CrashRating = rating;
	return v;
      });
    }).then(results => {
      output.Results = results;
       res.json(output);
    }).catch( e => {
      console.log(e);
      res.json({Count: 0, Results: []});
    });
  });
}

app.get('/', (req, res, next) => {
  res.json({msg: 'ModusCreate API!'});
});

app.get('/vehicles/:year/:manufacturer/:model', (req, res, next) =>{
  console.log('GET /vehicles/:year/:manufacturer/:model');
  let year = req.params.year;
  let manufacturer = req.params.manufacturer;
  let model = req.params.model;

  if(req.query.withRating){
    if(req.query.withRating === 'true'){
       vehiclesResponseWithRating(year, manufacturer, model, res);
    }else{
      console.log("Bad data");
      res.json({Count: 0, Results: []});
    }
  }else{
    vehiclesResponse(year, manufacturer, model, res);
  }
});

app.post('/vehicles', (req, res, next) => {
  console.log('POST /vehicles/');
  let year = req.body.modelYear;
  let manufacturer = req.body.manufacturer;
  let model = req.body.model;
  vehiclesResponse(year, manufacturer, model, res);
});


app.listen(app.get('port'), () =>{
  console.log("Startig app on port:", app.get('port'));
});
