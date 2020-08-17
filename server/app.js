const express = require('express')
const app = express()
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 8000
app.use(cors())

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db connected')).catch((err) => console.log(err.message))

app.get('/', (req, res) => {
    res.json({
        status: 'Welcome, visit /graphql to view the api docs.'
    })
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
})