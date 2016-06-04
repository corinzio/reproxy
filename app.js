var cfg = require("./config.json");

var http = require('http'),
      httpProxy = require('http-proxy'),
      HttpProxyRules = require('http-proxy-rules');

  // Set up proxy rules instance
  var proxyRules = new HttpProxyRules({
    rules: cfg.rules,
    default: cfg.default // default target
  });

  // Create reverse proxy instance
  var proxy = httpProxy.createProxyServer({rejectUnauthorized: false,
  secure: false});

  // Create http server that leverages reverse proxy instance
  // and proxy rules to proxy requests to different targets
  http.createServer(function(req, res) {
    console.log("Request: "+ req.url);
    // a match method is exposed on the proxy rules instance
    // to test a request to see if it matches against one of the specified rules
    var target = proxyRules.match(req);
    if (target) {
      console.log("Target: "+target);
      //add authentication to target if needed
      if(cfg.auth[target] !== undefined){
        var user = cfg.auth[target].user;
        var passwd = cfg.auth[target].passwd;
        var authstr = new Buffer(user+':'+passwd).toString('base64');
        req.headers.Authorization = 'Basic'+" "+authstr;
        console.log("Added Header: "+req.headers.Authorization );
      }
      return proxy.web(req, res, {
        target: target
      });
    }

    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('The request url and path did not match any of the listed rules!');
  }).listen(8080,function(arg){
    console.log("Listening on port 8080");
  });
