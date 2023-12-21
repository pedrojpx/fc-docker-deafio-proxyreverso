const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}
const mysql = require('mysql')
const select = `select name from nodedb.people;`

const random_name = require('node-random-name')

app.get('/', (req,res) => {
    const connection = mysql.createConnection(config)
    const name = random_name()
    const insert = "INSERT INTO people(name) values(\'" + name + "\')"
    connection.query(insert)
    
    connection.query(select, function (err, result, fields) {
        var names = ""
        for (r of result) {
            names += "<li>" + r.name + "</li>"
        }
        res.send('\
        <h1>Full Cycle Rocks</h1>\
        <br><ul>' + names + '</ul></br>')
    })
    connection.end
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})