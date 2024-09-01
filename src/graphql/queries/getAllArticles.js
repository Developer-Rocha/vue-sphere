import { gql } from "graphql-tag";

export const GET_ALL_ARTICLES = gql `
  query GetAllArticles {
    nodeQuery(filter: { conditions: [{ field: "status", value: "1" }] }) {
      entities {
        ... on NodeArticle {
          title
          nid
          body {
            value
            format
            processed
          }
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
  }
`;