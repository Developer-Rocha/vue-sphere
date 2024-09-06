import { ApolloClient, createHttpLink } from '@apollo/client/core'
import cache from './cache'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GRAPHQL_TOKEN}`
  }
})

// Adiciona o token de autenticação, se necessário
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     }
//   }
// });

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: cache
})

export default apolloClient
