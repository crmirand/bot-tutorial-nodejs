var HTTPS = require('https');

const ACCESS_TOKEN = "Ujv9DcYFgJL7blFmzsQe8x50Uadp4IfT91l36lRy";
var fs           = require('fs');
var path         = require('path');
var EventEmitter = require('events').EventEmitter
var assert       = require('assert');

var ImageService = require('../../index').ImageService;
var API          = require('../../index').Stateless;

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
    "Picture Message Test",
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

//*
  API.Bots.destroy(
    ACCESS_TOKEN,
    bot_id,
    function(err,ret) {
      if (err) {
        console.log("Could not destroy ", bot_id);
      } else {
        console.log("Bot destroyed.")
      }
    });
// */

});



function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      criRegex = /.*:'\).*/,
	  sandraRegex = /.*(sandra|watching|i see you|i c u).*/,
	  adamRegex = /.*(adam|Adam| nah|shame|SHAME|shake).*/;
	  

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
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postCriMessage() {
  /*var botResponse, options, body, botReq;


  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
  "bot_id"  : botID,
  "text"    : "",
  "attachments" : [
    {
      "type"  : "image",
      "url"   : "http://i.imgur.com/GL5mwRk.jpg"
    }
  ]
}
console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
  */
  uploadImageEvented(uploader, "cri.jpg");

}

function postSandraMessage() {
  /*
  var botResponse, options, body, botReq;


  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
  "bot_id"  : botID,
  "text"    : "",
  "attachments" : [
    {
      "type"  : "image",
      "url"   : "http://i.imgur.com/1YKYgdQ.jpg"
    }
  ]
}

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
  */
  uploadImageEvented(uploader, "sandra.jpg");

}
function postAdamMessage() {
  /*
  var botResponse, options, body, botReq;


  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
  "bot_id"  : botID,
  "text"    : "",
  "attachments" : [
    {
      "type"  : "image",
      "url"   : "http://i.imgur.com/dMAE2CM.gif"
    }
  ]
}

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
  */
  uploadImageEvented(uploader, "adam.gif");

}


exports.respond = respond;