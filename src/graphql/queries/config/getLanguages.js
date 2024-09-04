import { gql } from 'graphql-tag'

export const GET_LANGUAGES = gql`
  query getLanguages {
    availableLanguages {
      name
      id
    }
  }
`
