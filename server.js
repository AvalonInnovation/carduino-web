
//File system
var fs = require('fs'),
    readline = require('readline'),
    stream = require('stream');

//Lists
var top10lane1 = [{name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},]

var top10lane2 = [{name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},
                  {name:'-',car:'1',ver:'1.0',time:0,status:''},]

var last20 = [{name:'-',car:'1',ver:'1.0',time:0,lane:1},
              {name:'-',car:'1',ver:'1.0',time:0,lane:1},
              {name:'-',car:'1',ver:'1.0',time:0,lane:1},
              {name:'-',car:'1',ver:'1.0',time:0,lane:1},
              {name:'-',car:'1',ver:'1.0',time:0,lane:1},
              {name:'-',car:'1',ver:'1.0',time:0,lane:1},
              {name:'-',car:'1',ver:'1.0',time:0,lane:1},
              {name:'-',car:'1',ver:'1.0',time:0,lane:1},
              {name:'-',car:'1',ver:'1.0',time:0,lane:1},
              {name:'-',car:'1',ver:'1.0',time:0,lane:1},
              {name:'-',car:'1',ver:'1.0',time:0,lane:2},
              {name:'-',car:'1',ver:'1.0',time:0,lane:2},
              {name:'-',car:'1',ver:'1.0',time:0,lane:2},
              {name:'-',car:'1',ver:'1.0',time:0,lane:2},
              {name:'-',car:'1',ver:'1.0',time:0,lane:2},
              {name:'-',car:'1',ver:'1.0',time:0,lane:2},
              {name:'-',car:'1',ver:'1.0',time:0,lane:2},
              {name:'-',car:'1',ver:'1.0',time:0,lane:2},
              {name:'-',car:'1',ver:'1.0',time:0,lane:2},
              {name:'-',car:'1',ver:'1.0',time:0,lane:2},]

function checkEntry(jl) {
    //Shift in to last20
    last20.unshift({name:jl.programmerID, car:jl.carID, ver:jl.controlProgramRevision, time:jl.laptime, lane:jl.lane});
    last20.pop();

    //First clear new tags
    for (var i = 0; i < 10; i++) {
        top10lane1[i].status = '';
        top10lane2[i].status = '';
    }
    
    //Check lane and insert/update time if better
    var entry = {name:jl.programmerID, car:jl.carID, ver:jl.controlProgramRevision, time:jl.laptime, status:'new'};
    if (jl.lane == '1') {
        //For all lines in top 10 lane 1
        for (var i = 0; i < 10; i++) {
            //If Name already in list
            if (top10lane1[i].name == entry.name &&
                top10lane1[i].car == entry.car &&
                parseFloat(entry.time) >= parseFloat(top10lane1[i].time)) {
                //console.log("Name already in top 10 lane 1");
                break;
            }
            //Else if time is better than existing entry
            else if (parseFloat(entry.time) < parseFloat(top10lane1[i].time) || parseFloat(top10lane1[i].time) == 0.0) {
                //console.log("Inserting in top 10 lane 1");
                top10lane1.splice(i, 0, entry);
                for (var j = i+1; j < 11; j++) {
                    //If last element
                    if (j == 10) {
                        top10lane1.pop();
                    }
                    //else if multiple instances of user exists
                    else if (top10lane1[j].name == entry.name) {
                        if (top10lane1[j].car == entry.car) {
                            //console.log("Remove duplicate entry");
                            top10lane1.splice(j,1);
                            break;
                        }
                    }
                }
                break;
            }
        }
    } else if (jl.lane == '2') {
        //For all lines in top 10 lane 1
        for (var i = 0; i < 10; i++) {
            //If Name already in list
            if (top10lane2[i].name == entry.name &&
                top10lane2[i].car == entry.car &&
                parseFloat(entry.time) >= parseFloat(top10lane2[i].time)) {
                //console.log("Name already in top 10 lane 1");
                break;
            }
            //Else if time is better than existing entry
            else if (parseFloat(entry.time) < parseFloat(top10lane2[i].time) || parseFloat(top10lane2[i].time) == 0.0) {
                //console.log("Inserting in top 10 lane 2");
                top10lane2.splice(i, 0, entry);
                for (var j = i+1; j < 11; j++) {
                    //If last element
                    if (j == 10) {
                        top10lane2.pop();
                    }
                    //else if multiple instances of user exists
                    else if (top10lane2[j].name == entry.name) {
                        if (top10lane2[j].car == entry.car) {
                            //console.log("Remove duplicate entry");
                            top10lane2.splice(j,1);
                            break;
                        }
                    }
                }
                break;
            }
        }
    }
}

var instream = fs.createReadStream('data/laps.txt');
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;

var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});

rl.on('line', function(line) {
    console.log(line);
    var jsonline = JSON.parse(line);
    checkEntry(jsonline);
    //console.log(jl.lane + jl.programmerID);
});





//Express and bodyparser handles incoming json package on /api/laps
var express = require('express')
, bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.set('view engine', 'pug');


var http = require('http').Server(app);
//Push updates 
const io = require('socket.io')(http);
io.on('connection',function (client) {
    console.log("Socket connection is ON!");
});
http.listen(8082, function(){
    console.log('listening on *:8080');
});


//Handle POST from track controller (write to file data/laps.txt)
app.post('/api/laps', function(request, response){
    console.log(request.body);      // your JSON

    checkEntry(request.body);
    
    //Write to file
    fs.appendFile('data/laps.txt', JSON.stringify(request.body)+'\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    
    response.send(request.body);    // echo the result back
    io.emit('fileChanged', 'yea file has been changed.');
});



//Handle GET from browser
var path = __dirname;
app.get('/newest', function(req, res) {
    res.sendFile(path + '/data/laps.txt');
});



app.get('/', function (req, res) {  
    res.render(
        'index',
        {lane1: top10lane1, lane2: top10lane2, latest: last20});
})

app.get('/views/:any', function(req, res) {
    var any = req.params.any;
    res.sendFile(path + '/views/' + any);
});

app.get('/node_modules/socket.io-client/dist/:any', function(req, res) {
    var any = req.params.any;
    res.sendFile(path + '/node_modules/socket.io-client/dist/' + any);
});

app.listen(8080);


