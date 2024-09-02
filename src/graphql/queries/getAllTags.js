import { gql } from 'graphql-tag'

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    taxonomyTermQuery(limit: 6) {
      entities {
        entityId
        entityLabel
      }
    }
  }
`
