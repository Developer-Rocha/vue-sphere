import { gql } from 'graphql-tag'
import { ARTICLE_FIELDS } from '../fragments/articleFragments'

export const GET_ARTICLE_BY_ID = gql`
  query GetArticleById($nid: String, $language: LanguageId) {
    nodeById(id: $nid, language: $language) {
      entityTranslation(language: $language) {
        ...ArticleFields
      }
    }
  }
  ${ARTICLE_FIELDS}
`
