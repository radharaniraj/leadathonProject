const express = require('express')
const app = express()
const port = 3000
const move_data = require('./getData')

app.get('/', (req, res) => {
    let html = ""
    for(const move in move_data){
        html+=move+" <b>"+move_data[move].name+"</b><br>"
        html+=move_data[move].moves
        html+="<br> <br>"
    }
    res.status(200).send(html)
})
//Get request with a particular code to fetch
app.get('/:code', (req, res) => {
    const code  = req.params.code
    if(code){
        if(move_data[code]){
    const move = move_data[code]
    const responseHtml = `<b> ${move.name}</b><br> ${move.moves}`
    res.status(200).send(responseHtml)
        }
        else{
            res.status(404).send(`Move not found with the code ${code}`)
        }
    }
    else{
        res.status(404).send(`Some error occurred`)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})