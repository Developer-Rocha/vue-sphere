import { gql } from 'graphql-tag'
import { ARTICLE_FIELDS } from '../fragments/articleFragments'

export const GET_ARTICLE = gql`
  query GetArticle($language: LanguageId!, $path: String!) {
    nodeQuery(
      filter: {
        conjunction: AND
        conditions: [
          { field: "type", value: ["article"], operator: EQUAL }
          { field: "status", value: ["1"], operator: EQUAL }
          { field: "field_path_alias", value: [$path], operator: LIKE }
        ]
      }
      offset: 0
      limit: 1
    ) {
      entities {
        entityTranslation(language: $language) {
          ...ArticleFields
        }
      }
    }
  }
  ${ARTICLE_FIELDS}
`
