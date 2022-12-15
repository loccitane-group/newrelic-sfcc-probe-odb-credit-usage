// ----------------------------  SETTINGS --------------------------------

/*
Change this date by the starting date of your B2C Commerce Cloud contract,
so that the credit consumption will be calculated since this date.
*/
const CONTRACT_START_DATE = '2018-01-01';


/*
Add here your Sandbox API client id and secret from the Account Manager.
*/
const CLIENT_ID = 'YOUR SANDBOX API CLIENT ID';
const CLIENT_SECRET = 'YOUR SANDBOX API CLIENT SECRET';

// ----------------------------  PROGRAM --------------------------------

if (https == null) {
    var https = require('https');
}

var qs = require('querystring');

var options = {
  'method': 'POST',
  'hostname': 'account.demandware.com',
  'path': '/dw/oauth2/access_token',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  'auth': {
    user: CLIENT_ID,
    password: CLIENT_SECRET
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    var jsonBody = JSON.parse(body);
    var access_token = jsonBody.access_token;


var today = (new Date()).toISOString().substring(0, 10);

var options = {
  'method': 'GET',
  'hostname': 'admin.us01.dx.commercecloud.salesforce.com',
  'path': '/api/v1/realms/bdtw/usage?from=' + CONTRACT_START_DATE + '&to=' + today,
  'headers': {
    'Authorization': 'Bearer ' + access_token
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());

    var data = JSON.parse(body).data;

    $util.insights.set('realmId', data.id);
    $util.insights.set('createdSandboxes', data.createdSandboxes);
    $util.insights.set('activeSandboxes', data.activeSandboxes);
    $util.insights.set('deletedSandboxes', data.deletedSandboxes);
    $util.insights.set('sandboxSeconds', data.sandboxSeconds);
    $util.insights.set('minutesUp', data.minutesUp);
    $util.insights.set('minutesDown', data.minutesDown);
    $util.insights.set('totalMinutes', data.minutesUp + data.minutesDown * 0.3);
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();
    
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = qs.stringify({
  'grant_type': 'client_credentials'
});

req.write(postData);

req.end();
