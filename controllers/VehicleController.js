var Client = require('node-rest-client').Client;
var client = new Client();
var _ = require('lodash');
var Promise = require('bluebird');

var config = require('../config');


function pickData(data, response){
  // Parsed response body as js object
  // and mapping to the spec output
  let output = _.pick(data, ['Count', 'Results']);
  let results = output.Results.map( (r) => {
    return {Description: r.VehicleDescription, VehicleId: r.VehicleId};
  });
  output.Results = results;
  return output;
}

function getVehicles(year, manufacturer, model, cb){
  if(!year || (year && isNaN(year))){
   console.log("Bad year data "+year);
   return cb({Count: 0, Results: []});
 }
  let url = `${config.get('nhtsa').url}/modelyear/${year}/make/${manufacturer}/model/${model}?format=json`;
  console.log(url);
  client.get(url, function(data, response){
    let output = pickData(data, response);
    cb(output);
  });
}

function getVehicleRating(vehicleId){
  let url = `${config.get('nhtsa').url}/vehicleId/${vehicleId}?format=json`;
  return new Promise(function (resolve, reject){
    client.get(url, function(data, response){
      let crashRating = data.Results ? data.Results[0].OverallRating : null;
      if(!crashRating){
	reject(new Error("No overall rating"));
      }else{
	resolve(crashRating);
      }
    });
  });
}

module.exports = {
  getVehicles: getVehicles,
  getVehicleRating: getVehicleRating
};
