const { eachLine } = require('line-reader');
const lineReader = require('line-reader');
const request = require('request');
const config = require('./config.json')
const questions = require('questions');
const SteamApi = require("steamapi");
const apiuser = new SteamApi(config.steamapikey);
const MojangAPI = require('mojang-api');
const fs = require('fs');
const sleep = require('system-sleep');



function start() {
console.log("\x1b[0m",`
███████╗██╗   ██╗ ██████╗██╗  ██╗      ██╗██████╗ 
██╔════╝██║   ██║██╔════╝██║  ██║     ██╔╝╚════██╗
███████╗██║   ██║██║     ███████║    ██╔╝  █████╔╝
╚════██║██║   ██║██║     ██╔══██║    ╚██╗  ╚═══██╗
███████║╚██████╔╝╚██████╗██║  ██║     ╚██╗██████╔╝
╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝      ╚═╝╚═════╝`);
console.log('----------------------------------------------------------------------')
console.log('Multiple platforms username checker made by such#1111')
console.log('All rights reserved - Astro - 2020')
console.log('Gr33tz: Forever - Magic')
console.log('----------------------------------------------------------------------')

function clear() {
    console.clear();
}



setTimeout(clear, 2300);
setTimeout(asktype, 2300);
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
    sleep(500);
}


function github(user) {
    request(`https://github.com/${user}`, function(error, response, body) {
        if(response.statusCode == 404) {
            console.log('\x1b[32m',`${user} not taken.`)
            logger.write(`${user} OPEN | GitHub\n`)
        }
        if (response.statusCode == 200 ) {
            console.log("\x1b[31m",`${user} taken.`);
        }
    })
    sleep(500);
}
function cracked(user) {
    request(`https://cracked.to/${user}`, function (error, response, body){
        if(response.statusCode == 404) {
            console.log('\x1b[32m',`${user} not taken.`)
            logger.write(`${user} OPEN | Cracked\n`)
        }
        if (response.statusCode == 200 ) {
            console.log("\x1b[31m",`${user} taken.`);
        }
    })
    sleep(500);
}

function welove(user){
    request(`https://weheartit.com/${user}`, function(error, response, body) {
        if(response.statusCode == 404) {
            console.log('\x1b[32m',`${user} not taken.`)
            logger.write(`${user} OPEN | We<3\n`)
        }
        if (response.statusCode == 200 ) {
            console.log("\x1b[31m",`${user} taken.`);
        }
    })
    sleep(500);
}

function codea(user) {
    request(`https://www.codecademy.com/profiles/${user}`, function (error, response, body) {
        if(response.statusCode == 404) {
            console.log('\x1b[32m',`${user} not taken.`)
            logger.write(`${user} OPEN | CodeAcademy\n`)
        }
        if (response.statusCode == 200 ) {
            console.log("\x1b[31m",`${user} taken.`);
        }
    })
    sleep(500);
}

function steam(user) {
    apiuser.resolve(user).then(id => {
        console.log("\x1b[31m",`${user} taken.`)

    }).catch(err => {
        console.log('\x1b[32m',`${user} not taken.`)
        logger.write(`${user} OPEN | STEAM\n`)
    });
    sleep(500);
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
    sleep(500);
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
    sleep(500);
}

function tiblar(user) {
    request(`https://tiblar.com/${user}`, function(error, response, body){ 
        if (response.statusCode == 200) {
            console.log("\x1b[31m",`${user} taken.`)
        }
        if (response.statusCode == 404) {
            console.log('\x1b[32m',`${user} not taken.`)
            logger.write(`${user} OPEN | Tib\n`)
        }
    })
    sleep(500);
}

function asktype() {
    console.log('[1] Minecraft \n[2] LOL\n[3] Steam /ID \n[4] Soundcloud\n[5] GitHub\n[6] Cracked.to\n[7] We<3\n[8] CodeAcademy\n[9] Tiblar (New Social)');
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
        else if (result == 5) {
            console.clear();
            questions.askOne({ info:'File name (make sure to add .txt at the end)' }, function(result) {
                lineReader.eachLine(result, function(line, last) {
                    github(line);
                })
            })
        }
        else if (result == 6) {
            console.clear();
            questions.askOne({ info:'File name (make sure to add .txt at the end)' }, function(result) {
                lineReader.eachLine(result, function(line, last) {
                    let user_url = line.replace(' ', '-');
                    cracked(user_url);
                })
            })
        }
        else if (result == 7) {
            console.clear();
            questions.askOne({ info:'File name (make sure to add .txt at the end)' }, function(result) {
                lineReader.eachLine(result, function(line, last) {
                    let user_url = line.replace(' ', '_');
                    welove(user_url);
                })
            })
        }
        else if (result == 8) {
            console.clear();
            questions.askOne({ info:'File name (make sure to add .txt at the end)' }, function(result) {
                lineReader.eachLine(result, function(line, last) {
                    let user_url = line.replace(' ', '_');
                    codea(user_url);
                })
            })
        }
        else if( result == 9) {
            console.clear();
            questions.askOne({ info:'File name (make sure to add .txt at the end)' }, function(result) {
                lineReader.eachLine(result, function(line, last) {
                    let user_url = line.replace(' ', '_');
                    tiblar(user_url);
                })
            })
            
        }

      })
}
