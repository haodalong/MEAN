var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var url = require('url');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
//创建mongodb连接
var db = require('mongoskin').db('mongodb://localhost:27017/test');

console.log('__dirname:'+__dirname);
console.log('path:'+path);

// load the video files and the index html page
fs.readFile(path.resolve(__dirname,"public/index.html"), function (err, data) {
    if (err) {
        throw err;
    }
    indexPage = data;    
});

fs.readFile(path.resolve(__dirname,"public/video/example.mp4"), function (err, data) {
    if (err) {
        throw err;
    }
    mp4_file = data;
});

fs.readFile(path.resolve(__dirname,"public/video/example2.mp4"), function (err, data) {
    if (err) {
        throw err;
    }
    mp4_file2 = data;
});


app.get('/', function (req, res) {
  //res.send('Hello World!');
  var reqResource = url.parse(req.url).pathname;
	
    console.log("Resource: " + reqResource);
	
	if(req.headers.range==null){
		req.headers.range= 'bytes=0-';
	}	
	
	var total;
	
	if(reqResource == "video/example.mp4"){
		total = mp4_file.length;
	}
	
	if(reqResource == "video/example2.mp4"){
		total = mp4_file2.length;
	}
	
	//console.log(req.headers);    
	var range = req.headers.range;
	var positions = range.replace(/bytes=/, "").split("-");
	var start = parseInt(positions[0], 10);
	// if last byte position is not present then it is the last byte of the video file.
	var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
	var chunksize = (end-start)+1;

	if(reqResource == "video/example.mp4"){
		res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total, 
							 "Accept-Ranges": "bytes",
							 "Content-Length": chunksize,
							 "Content-Type":"video/mp4"});
		res.end(mp4_file.slice(start, end+1), "binary");

	}
	if(reqResource == "video/example2.mp4"){
		res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total, 
							 "Accept-Ranges": "bytes",
							 "Content-Length": chunksize,
							 "Content-Type":"video/mp4"});
		res.end(mp4_file2.slice(start, end+1), "binary");

	}  
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
    
});



//为应用/user/all.do路径定义的 GET 请求，查询所有users记录：
app.get('/user/all.do', function(req, res) {
	
	db.collection('user').find().toArray(function(err, result) {
	  if (err) throw err;
	  //console.log(result);
	  res.send(result);
});
	
	
});

//为应用/user/del.do路径定义的 GET 请求，删除相关记录：
app.get('/user/del.do', function(req, res) {
	var card_id=req.param('card_id')
	db.collection('user').remove( { card_id : card_id }, 1 )
	res.send(card_id);
});


//为应用/user/update.do路径定义的 GET 请求，更新所有users记录：
app.get('/user/update.do', function(req, res) {
	var user=JSON.parse(req.param('user'));
	console.log(user.phone);
	db.collection('user').update(
	   { card_id: user.card_id },
	   {
		 card_id: user.card_id,
		 name:user.name,
		 phone:user.phone,
		 birthday:user.birthday,
		 description:user.description
	   }
	);
	res.send('updateOK');
});

app.get('/user/add.do', function(req, res) {
	var user=JSON.parse(req.param('user'));
	console.log(user.phone);
	db.collection('user').insert(
	   {
		 card_id: user.card_id,
		 name:user.name,
		 phone:user.phone,
		 birthday:user.birthday,
		 description:user.description
	   }
	);
	res.send('addOK');
});


// respond with users object when a GET request is made to the homepage
//这里涉及到跨域，首先在nodejs上允许所有的跨域请求
/*
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);//让options请求快速返回
    else  next();
});
*/
