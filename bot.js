var HTTPS = require('https');

const ACCESS_TOKEN = "Ujv9DcYFgJL7blFmzsQe8x50Uadp4IfT91l36lRy";
var fs           = require('fs');
var path         = require('path');
var EventEmitter = require('events').EventEmitter
var assert       = require('assert');

var ImageService = require('groupme').ImageService;
var API          = require('groupme').Stateless;

var botID = process.env.BOT_ID;
var picture_url;

/************************************************************************
 * Here we show an example of uploading an image
 * and providing an EventEmitter interface to the process.
 ***********************************************************************/

var uploadImageEvented = function(eventEmitter, path) {

  ImageService.post(
      path, 
      function(err,ret) {
        if (err) {
          eventEmitter.emit('error', err);
        } else {
          eventEmitter.emit('success', ret);
        }
      });

  eventEmitter.emit('start');

  return eventEmitter;

}

/************************************************************************
 * Helper function for posting a picture message
 ***********************************************************************/

var postImageAsBot = function(eventEmitter, access_token, botID, picture_url) {


  API.Bots.post(
    access_token,
    botID,
    "",
    {picture_url:picture_url},
    function(err,ret) {
      if (err) {
        eventEmitter.emit('error', err);
      } else {
        eventEmitter.emit('success', ret);
      }
    });

  eventEmitter.emit('start');

  return eventEmitter;

}
/************************************************************************
 * The logic of this example built around EventEmitters
 ***********************************************************************/

var errorFunc = function(err) {
  console.log(err);
  process.exit(1);
}

var uploader = new EventEmitter();
var poster   = new EventEmitter();


uploader.on('error', errorFunc);
poster.on('error', errorFunc);

uploader.on('success', function(data) {
  console.log("Successfully uploaded image:", data);
  assert(data.picture_url);
  picture_url = data.picture_url;
  postImageAsBot(poster, ACCESS_TOKEN, botID, picture_url);
});

poster.on('success', function(ret) {
  console.log("Successfully posted picture message using bot!", ret);

});



function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      criRegex = /.*:'\).*/,
	  sandraRegex = /.*(sandra|Sandra|watching|i see you|i c u).*/,
    adamRegex = /.*(adam|Adam| nah|shame|SHAME|shake).*/,
    hannahRegex = /.*(Hannah|hannah|emily|Emily|flaccid|welp).*/;
    vinnieRegex = /.*(Vinnie|vinnie|u won't|pussy|do it|lame).*/;
    sophiaRegex = /.*(Sophia|sophia|sleep|turn up|turnip|party|drink|altitude|club).*/;
	  

  if(request.text && criRegex.test(request.text)) {
    this.res.writeHead(200);
    postCriMessage();
    this.res.end();
  } 
  else if(request.text && sandraRegex.test(request.text)){
	this.res.writeHead(200);
    postSandraMessage();
    this.res.end();
  }
  else if(request.text && adamRegex.test(request.text)){
	this.res.writeHead(200);
    postAdamMessage();
    this.res.end();
  }
  else if(request.text && hannahRegex.test(request.text)){
	this.res.writeHead(200);
    postHannahMessage();
    this.res.end();
  }
  else if(request.text && vinnieRegex.test(request.text)){
	this.res.writeHead(200);
    postVinnieMessage();
    this.res.end();
  }
  else if(request.text && sophiaRegex.test(request.text)){
	this.res.writeHead(200);
    postSophiaMessage();
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postCriMessage() {
  uploadImageEvented(uploader, "./cri.jpg");

}

function postSandraMessage() {
  uploadImageEvented(uploader, "./sandra.jpg");

}
function postAdamMessage() {
  uploadImageEvented(uploader, "./adam.gif");

}

function postHannahMessage(){
    uploadImageEvented(uploader, "./hannah.gif");
}

function postVinnieMessage(){
    uploadImageEvented(uploader, "./vinnie.gif");
}

function postSophiaMessage(){
    uploadImageEvented(uploader, "./sophia.gif");
}


exports.respond = respond;