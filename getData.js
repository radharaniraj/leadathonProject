let move_data = {}

const axios = require("axios");
const cheerio = require("cheerio");
// URL of the page we want to scrape
const url = "https://www.chessgames.com/chessecohelp.html";

// Async function which scrapes the data
async function scrapeData() {
    try {
        // Fetch HTML of the page we want to scrape
        const { data } = await axios.get(url);
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data);
        // Select all the list items in plainlist class
        const listItems = $("body > font > p > table > tbody > tr > td > font");
        
        for (let i = 0; i < listItems.length; i+=2){
            const code = $(listItems[i]).text()
            const [name, steps] = $(listItems[i+1]).text().split('\n')
            const obj = {
                    "name": name,
                    "moves": steps
            }
            move_data[code] = obj
           // console.log(i, listItems.length)
        }
    } catch (err) {
        console.error(err);
    }
}
// Invoke the above function
scrapeData();

module.exports = move_data