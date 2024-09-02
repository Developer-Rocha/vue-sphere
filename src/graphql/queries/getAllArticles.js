import { gql } from 'graphql-tag'
import { ARTICLE_FIELDS } from '../fragments/articleFragments';

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles {
    nodeQuery(filter: { conditions: [{ field: "status", value: "1" }] }) {
      entities {
        ...ArticleFields
      }
    }
  }
  ${ARTICLE_FIELDS}
`