import { ApolloClient, createHttpLink } from '@apollo/client/core'
import cache from './cache'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GRAPHQL_TOKEN}`
  }
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: cache
})

export default apolloClient
