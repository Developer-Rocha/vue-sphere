import { gql } from 'graphql-tag'

export const GET_ARTICLE_BY_ID = gql`
  query GetArticleById($nid: String) {
    nodeById(id: $nid, language: EN) {
      ... on NodeArticle {
        title
        nid
        created
        entityOwner {
          name
        }
        body {
          value
          format
          processed
        }
        fieldTeaser
        fieldImage {
          entity {
            ... on MediaImage {
              fieldMediaImage {
                url
              }
            }
          }
        }
        fieldTags {
          targetId
          entity {
            entityId
            tid
            name
            entityBundle
            weight
            ... on TaxonomyTermTags {
              description {
                value
                format
                processed
              }
            }
          }
        }
      }
    }
  }
`
