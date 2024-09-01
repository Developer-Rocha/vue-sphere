import { gql } from "@apollo/client/core";

export const ARTICLE_FRAGMENT = gql `
fragment ArticleFields on NodeArticle {
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
`;
