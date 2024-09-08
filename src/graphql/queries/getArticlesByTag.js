import { gql } from 'graphql-tag'
import { ARTICLE_FIELDS } from '../fragments/articleFragments'

export const GET_ARTICLES_BY_TAG = (tag) => gql`
  query GetArticlesByTag(
      $nid: String, 
      ${tag && tag.length ? `$termIds: [String],` : ''} 
      $limit: Int,
      $language: LanguageId,
      $langcode: String
    ) {
    nodeQuery(
      limit: $limit, 
      offset: 0, 
      filter: {
        conditions:[
          { field: "nid", value: [$nid], operator: NOT_EQUAL },
          { field: "langcode.value", operator: EQUAL,value: [$langcode] }
          ${
            tag && tag.length
              ? `
              ,{ field: "field_tags.entity.tid", operator: IN, value: $termIds }
            `
              : ''
          }
        ],
      }){
        entities {
        ... on NodeArticle {
          entityTranslation(language: $language) {
            ...ArticleFields
          }
        }
      }
    }
  }
  ${ARTICLE_FIELDS}
`
