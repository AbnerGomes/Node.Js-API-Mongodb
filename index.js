require('dotenv').config()

//inicial
const express = require('express')
const app = express()
const mongoose = require('mongoose')



//ler JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())


//rotas da api
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//porta para o expres disponibilizar a aplicação

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.nx0dn.mongodb.net/bancodaApi?retryWrites=true&w=majority`)
.then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
    
})
.catch((err) => console.log(err))

