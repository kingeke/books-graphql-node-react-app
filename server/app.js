const express = require('express')
const app = express()
const port = 3000;
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

app.get('/', (req, res) => {
    res.json({
        status: 'hey'
    })
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`)
})