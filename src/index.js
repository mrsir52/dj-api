const {GraphQLServer} = require('graphql-yoga')
const fetch = require('node-fetch')


const DADURL = `https://icanhazdadjoke.com/`
const CHUCKURL = `https://api.chucknorris.io/jokes/random`


const typeDefs = `
type Query {
  getChuckJoke: chuckresults
  getDadJoke: dadresults
}

type dadresults {
  status: String
  joke: String
}

type chuckresults {
  icon_url: String
  value: String
}
`

const resolvers = {
    Query: {
        async getDadJoke() {
            return await fetch(`${DADURL}`, {
                headers: {
                    "accept": "application/json"
                }
            }).then(res => res.json())
        },
        async getChuckJoke() {
            return await fetch(`${CHUCKURL}`
            ).then(res => res.json())
        },

    },
}

// 3
const server = new GraphQLServer({
    typeDefs,
    resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
