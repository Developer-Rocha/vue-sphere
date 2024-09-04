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
          {
            operator: NOT_EQUAL
            field: "nid"
            value: [$nid]
          },
          {
            operator: EQUAL,
            field: "langcode.value",
            value: [$langcode]
          }
          ${
            tag && tag.length
              ? `
          ,{
            operator: IN, 
            field: "field_tags.entity.tid", 
            value: $termIds
          }
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
