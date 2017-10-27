# SlotCarduino
This repo contains source files for hosting a simple web server for showing lap times for the SlotCarduino project.

## Getting started
To get the code up and running:
- Install node.js and npm
- Instal node packages `npm install`
- Run server `node server.js`
- Access page at localhost:8008

The times sent from track controller are stored in a text file in `data/laps.txt`, to clear times simply clear the file, or remove (or rename file) and create an empty text file.

## Test send data
```
$ cat p.json
{
    "protocolVersion": "0.1",
    "lane": "1",
    "timestamp": "123",
    "laptime": "10.5",
    "carID": "2",
    "programmerID": "Test",
    "controlProgramRevision": "1.0"
}
$ curl -H "Content-Type: application/json" -X POST -d @p.json http://127.0.0.1:8080/api/laps
```
