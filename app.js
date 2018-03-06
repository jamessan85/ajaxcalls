var express = require("express");
var http = require("http");
var path =  require("path");
var request_middleware = require("request");
var bodyParser = require("body-parser");
var fs = require('fs');
var stringify = require('csv-stringify')

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

var staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res, next) {
    res.render('index')
});

app.post("/", function(req, res, next) {

    var company = req.body.company.toLowerCase()
    var employees = req.body.employees
    var results = [];
    var gender_total = [];
    var age_totals = [];
    var columns = {
        1: 'First Name',
        2: 'Surname',
        3: 'Postcode',
        4: 'Gender',
        5: 'DOB',
        6: 'Salary'
    }

    switch(company) {
        case 'finance':
            var males = Math.round(51 / 100 * employees);
            var females = Math.round(49 / 100 * employees);
            var age_18_24 = Math.round(10 / 100 * employees)
            var age_25_49 = Math.round(69 / 100 * employees)
            var age_50_64 = Math.round(21 / 100 * employees)
            break;
        case 'construction':
            var males = Math.round(80 / 100 * employees);
            var females = Math.round(20 / 100 * employees);
            var age_18_24 = Math.round(10 / 100 * employees)
            var age_25_49 = Math.round(63 / 100 * employees)
            var age_50_64 = Math.round(27 / 100 * employees)
            break;
        case 'manufacturing':
            var males = Math.round(76 / 100 * employees);
            var females = Math.round(24 / 100 * employees);
            var age_18_24 = Math.round(9 / 100 * employees)
            var age_25_49 = Math.round(61 / 100 * employees)
            var age_50_64 = Math.round(30 / 100 * employees)
            break;
        case 'public_admin':
            var males = Math.round(44 / 100 * employees);
            var females = Math.round(57 / 100 * employees);
            var age_18_24 = Math.round(4 / 100 * employees)
            var age_25_49 = Math.round(65 / 100 * employees)
            var age_50_64 = Math.round(31 / 100 * employees)
            break;
        case 'health_and_care':
            var males = Math.round(21 / 100 * employees);
            var females = Math.round(79 / 100 * employees);
            var age_18_24 = Math.round(9 / 100 * employees)
            var age_25_49 = Math.round(60 / 100 * employees)
            var age_50_64 = Math.round(31 / 100 * employees)
            break;
        case 'hospitality':
            var males = Math.round(47 / 100 * employees);
            var females = Math.round(53 / 100 * employees);
            var age_18_24 = Math.round(31 / 100 * employees)
            var age_25_49 = Math.round(52 / 100 * employees)
            var age_50_64 = Math.round(17 / 100 * employees)
            break;
        case 'retail':
            var males = Math.round(51 / 100 * employees);
            var females = Math.round(49 / 100 * employees);
            var age_18_24 = Math.round(20 / 100 * employees)
            var age_25_49 = Math.round(56 / 100 * employees)
            var age_50_64 = Math.round(24 / 100 * employees)
            break;
        case 'education':
            var males = Math.round(29 / 100 * employees);
            var females = Math.round(71 / 100 * employees);
            var age_18_24 = Math.round(7 / 100 * employees)
            var age_25_49 = Math.round(62 / 100 * employees)
            var age_50_64 = Math.round(31 / 100 * employees)
            break;
        case 'transport':
            var males = Math.round(75 / 100 * employees);
            var females = Math.round(25 / 100 * employees);
            var age_18_24 = Math.round(6 / 100 * employees)
            var age_25_49 = Math.round(62 / 100 * employees)
            var age_50_64 = Math.round(32 / 100 * employees)
            break;
        case 'other':
            var males = Math.round(50 / 100 * employees);
            var females = Math.round(50 / 100 * employees);
            var age_18_24 = Math.round(10 / 100 * employees)
            var age_25_49 = Math.round(63 / 100 * employees)
            var age_50_64 = Math.round(27 / 100 * employees)
            break;      
    }

    var date = new Date();
    var year_min = date.getFullYear() - 20;
    var year_mid = date.getFullYear() - 35;
    var year_max = date.getFullYear() - 57;

    // push m to gender_total
    for(var i = 0; i < males; i++) {
        gender_total.push('M');
    }
    // push f to gender total
    for(var i = 0; i < females; i++) {
        gender_total.push('F');
    }

    var gender_total = gender_total.sort(function() { return 0.5 - Math.random() })

    // push 18-24 to age_totals
    for(var i = 0; i < age_18_24; i++) {
        var day = Math.floor((Math.random() * 28) + 1)
        var month = Math.floor((Math.random() * 12) + 1)
        age_totals.push( day + '/' + month + '/' + year_min);
    }
    // push 25-49 to age_totals
    for(var i = 0; i < age_25_49; i++) {
        var day = Math.floor((Math.random() * 28) + 1)
        var month = Math.floor((Math.random() * 12) + 1)
        age_totals.push( day + '/' + month + '/' + year_mid);
    }
    // push 50-64 to age_totals
    for(var i = 0; i < age_50_64; i++) {
        var day = Math.floor((Math.random() * 28) + 1)
        var month = Math.floor((Math.random() * 12) + 1)
        age_totals.push( day + '/' + month + '/' + year_max);
    }
    // push all results to array to create CSV data
    for (var i = 0; i < employees; i++) {
        results.push(['Company', 'Employee ' + i, req.body.post_code, gender_total[i], age_totals[i], '27,000']);
    }

    stringify(results, { header: true, delimiter: ',', columns: columns }, (err, output) => {
        if (err) throw err;
        fs.writeFile('list.csv', output, 'utf8', function (err) {
            if (err) {
                console.log("This didn't work, fool")
                res.render('done', {message: 'Ruh Roh, looks like we hit an issue, please try again'});
            } else {
                console.log("Saved")
                res.render('done', {message: 'CSV Created!'});
            }
        })
    })    
    
});

app.get("/ajax", function(req, res, next) {
    res.render('ajax');
})

app.get("/done", function(req, res, next) {
    res.render('done')
});

app.post("/balls", function (req, res, next) { //submit post to get data from ajax call
    var data = req.body
    console.log(data);
    res.contentType('json');
    res.send({ some: JSON.stringify({response:'json'}) });
  })

http.createServer(app).listen(3002, function(){
    console.log("App started on port 3002.");
});

function searchHouse(search) {
    var options = { method: 'GET',
    url: "https://api.companieshouse.gov.uk/search/companies?q=" + search,
    headers:
    {
    "Authorization": "6KaW1I5wL8yABgbvDA-qSYJXY9ShNc3bpqbuBsMD"
    },
    json: true };

    request_middleware(options, function (error, response, body) {   
        if (error) throw new Error(error);
        res.render('index', {companies: companies});    
    });
}

