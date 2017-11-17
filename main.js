const https = require('http');
const { diff, addedDiff, deletedDiff, detailedDiff, updatedDiff } = require("deep-object-diff");

var prettyjson = require('prettyjson');
var lamps = [];

// var exec = require('child_process').exec,
//     child;

//  child = exec('hue-simulator --port=8080',
//  function (error, stdout, stderr) {
//      console.log('stdout: ' + stdout);
//      console.log('stderr: ' + stderr);
//      if (error !== null) {
//           console.log('exec error: ' + error);
//      }
//  });



 function printLights(data){

    console.log(prettyjson.render( data, {
  keysColor: 'green',
  dashColor: 'magenta',
  stringColor: 'white'
}));

 }



function initialGet(){

 
https.get('http://localhost:8080/api/newdeveloper', (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
   // console.log(JSON.parse(data).lights);
  lamps = formatData(JSON.parse(data).lights);
  printLights(lamps);


  
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

}

function isEmpty(obj){
  return Object.keys(obj).length === 0;
}

 function updateGet(){

  https.get('http://localhost:8080/api/newdeveloper', (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
   // console.log(JSON.parse(data).lights);
  var newLamps = formatData(JSON.parse(data).lights);
  checkDiff(newLamps);

  return;
 


  
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

 }

 function checkDiff(newLamps){
  var checkForUpdate = updatedDiff(lamps,newLamps);

  if(!isEmpty(checkForUpdate)){
    
    
    console.log("Changes detected: ");
    var formatedChanges = formatNewData(checkForUpdate);
    printLights(formatedChanges);


  }

  lamps = newLamps;

  return;

 // console.log("checking for updates", checkForUpdate);
 }

 function formatNewData(updatedData){

 for (var key in updatedData){
  var updatedLights = [];
  

    for (var innerkey in updatedData[key]){

      var updatedLight = {};

      updatedLight.id = parseInt(key) + 1;
      
      updatedLight[innerkey] = updatedData[key][innerkey]
       updatedLights.push(updatedLight);

      
    }

    

 }

 //console.log("checking updatedLight", updatedLight);

 return updatedLights;


 }

function formatData(data){

  var newLights = [];

  for (var key in data){

    var newLight = {};
    newLight.name = data[key].name;
    newLight.id = key;
    newLight.on = data[key].state.on;
    var brightness = Math.round(data[key].state.bri/254 * 100);
    if (brightness > 100){
      brightness = 100;
    }
    else if (brightness <= 0 ){
      brightness = 0;
    }
    newLight.brightness = brightness;

    //console.log("checking newLight", newLight);

    newLights.push(newLight);



  }

  return newLights;

}





function makePostRequest(input1, input2){

  https.post('http://localhost:8080/api/newdeveloper', (resp) => {
  let data = '';
 
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
 
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).lights);
  });
 
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

}


var getData = initialGet();

setInterval(updateGet, 1000);
//console.log(getData);


// console.log(prettyjson.render( data, {
//   keysColor: 'rainbow',
//   dashColor: 'magenta',
//   stringColor: 'white'
// }));

