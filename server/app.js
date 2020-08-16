const express = require('express')
const app = express()
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds011495.mlab.com:11495/gql-test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('db connected')).catch((err) => console.log(err.message))

app.get('/', (req, res) => {
    res.json({
        status: 'hey'
    })
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(process.env.PORT, () => {
    console.log(`server is up and running on port ${process.env.PORT}`)
})