var HTTPS = require('https');


var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      criRegex = /.*:'\).*/,
	  sandraRegex = /.*(sandra|watching|i see you|i c u).*/,
	  adamRegex = /.*(adam|Adam|nah|shame|SHAME|shake).*/;
	  

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
}

function postSandraMessage() {
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
}
function postAdamMessage() {
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
}


exports.respond = respond;