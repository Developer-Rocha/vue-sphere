import { gql } from 'graphql-tag'
import { ARTICLE_FIELDS } from '../fragments/articleFragments'

export const GET_ARTICLES_BY_TAG = (tag) => gql`
  query GetArticlesByTag(
      $nid: String, 
      ${tag && tag.length ? `$termIds: [String],` : ''} 
      $limit: Int
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
        ...ArticleFields
      }
    }
  }
  ${ARTICLE_FIELDS}
`
