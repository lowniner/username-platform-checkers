const { eachLine } = require('line-reader');
const lineReader = require('line-reader');
const request = require('request');
const config = require('./config.json')
const questions = require('questions');
const SteamApi = require("steamapi");
const apiuser = new SteamApi(config.steamapikey);
const MojangAPI = require('mojang-api');
const fs = require('fs')


function start() {
console.log("\x1b[0m",`
███████╗██╗   ██╗ ██████╗██╗  ██╗      ██╗██████╗ 
██╔════╝██║   ██║██╔════╝██║  ██║     ██╔╝╚════██╗
███████╗██║   ██║██║     ███████║    ██╔╝  █████╔╝
╚════██║██║   ██║██║     ██╔══██║    ╚██╗  ╚═══██╗
███████║╚██████╔╝╚██████╗██║  ██║     ╚██╗██████╔╝
╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝      ╚═╝╚═════╝`);

function clear() {
    console.clear();
}



setTimeout(clear, 1500);
setTimeout(asktype, 1500);
}

start();

var logger = fs.createWriteStream('log.txt', {
    flags: 'a'
  })
  

function sc(user) {
    request(`https://soundcloud.com/${user}`, function(error, response, body) {
        if (response.statusCode == 404 ) {
            console.log('\x1b[32m',`${user} not taken.`)
            logger.write(`${user} OPEN | SC\n`)
        }
        if (response.statusCode == 200 ) {
            console.log("\x1b[31m",`${user} taken.`);
        }
    })
}


function steam(user) {
    apiuser.resolve(user).then(id => {
        console.log("\x1b[31m",`${user} taken.`)

    }).catch(err => {
        console.log('\x1b[32m',`${user} not taken.`)
        logger.write(`${user} OPEN | STEAM\n`)
    });
}

function lol(user) {
    request(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user}?api_key=${config.lolapikey}`, function(error, response, body){ 
        if (response.statusCode == 200) {
            console.log("\x1b[31m",`${user} taken.`)
        }
        if (response.statusCode == 404) {
            console.log('\x1b[32m',`${user} not taken.`)
            logger.write(`${user} OPEN | LOL\n`)
        }
    })
}

function minecraft(user) {
    MojangAPI.nameToUuid(user, function(err, res) {
        if (!res[0]) {
            console.log('\x1b[32m',`${user} not taken.`);
            logger.write(`${user} OPEN | MINECRAFT\n`)
        }
            
        else
            console.log("\x1b[31m",`${user} taken.`);
    });
}

function asktype() {
    console.log('[1] Minecraft \n[2] LOL\n[3] Steam /ID \n[4] Soundcloud');
    console.log(' ')
    questions.askOne({ info:'Type' }, function(result){
        if (result == 1) {
            console.clear();
            questions.askOne({ info:'File name (make sure to add .txt at the end)' }, function(result) {
                lineReader.eachLine(result, function(line, last) {
                    var replaced = line.replace(' ', '_')
                    minecraft(line);
                }) 
            })
        }
        else if (result == 2) {
            console.clear();
            questions.askOne({ info:'File name (make sure to add .txt at the end)' }, function(result) {
                lineReader.eachLine(result, function(line, last) {
                    let user_url = line.replace(' ', '_')
                    lol(user_url);
                })
            })
        }
        else if (result == 3) {
            console.clear();
            questions.askOne({ info:'File name (make sure to add .txt at the end)' }, function(result) {
                lineReader.eachLine(result, function(line, last) {
                    let users = line.replace(' ', '_');
                    steam(users);
                })
            })
        }
        else if (result == 4) {
            console.clear();
            questions.askOne({ info:'File name (make sure to add .txt at the end)' }, function(result) {
                lineReader.eachLine(result, function(line, last) {
                    let user = line.replace(' ', "_")
                    sc(user);
                })
            })
        }

      })
}
