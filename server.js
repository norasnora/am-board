// content of index.js
var https = require('https');
const express = require('express');
var request = require("request")
const app = express();

const port = process.env.PORT || 3000;

const server = app.listen(port);


var Flickr = require("flickrapi"),
    flickrOptions = {
	  api_key: "1234ABCD1234ABCD1234ABCD1234ABCD",
	  secret: "9764f13c05b7dd1e",
	  endpoint:'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos'
    };

server.timeout = 1000 * 60 * 10; // 10 minutes

// Use middleware to set the default Content-Type
// app.use(function (req, res, next) {
//     res.header('Content-Type', 'application/json');
//     next();
// });


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Content-Type', 'application/json');
  next();
});


app.get('/api/photos', (req, resp) => {
	var cdata = [];
	var str="";
	var str2 = "";
	var url = 'https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&user_id=52010134@N05&api_key=d9ad2d315dd33f36080a375d112ebbc9&extras=url_o&format=json&nojsoncallback=1'
	//var url2 = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&photo_id=';
	https.get(url, function(res) {
     if (res.statusCode >= 200 && res.statusCode < 400) {
     	res.on('data',function(data_){
     		str += data_.toString();
     		//data.push('https://www.flickr.com/photos/latvijas_armija/'+photoid);

     	});
     	res.on('end',()=>{
     		try{
     			const data = JSON.parse(str);
     			console.log(JSON.stringify(data));
     			arr = data['photos']['photo'];
     			for(var i in arr){     				
     				cdata.push(arr[i]['url_o']);
     			}
     				resp.send(JSON.stringify(cdata));
     			

     		}catch(er){
     			console.log(er);
     		}
     	});
     	
     }
   });


})


