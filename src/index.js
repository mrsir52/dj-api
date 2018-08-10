const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')


const URL = `https://icanhazdadjoke.com/`


const typeDefs = `
type Query {
  getJoke: results
}

type results {
  status: String
  joke: String
}
`

const resolvers = {
    Query: {
        async getJoke() {
            return await fetch(`${URL}`, {
                headers: {
                    "accept": "application/json"
                }
            }).then(res => res.json())
        },
    },
}

// 3
const server = new GraphQLServer({
    typeDefs,
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
