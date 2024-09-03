import { gql } from 'graphql-tag'
import { ARTICLE_FIELDS } from '../fragments/articleFragments';

export const GET_ARTICLES_BY_TAG = (tIds) => gql`
  query GetArticlesByTag(
      $nid: String, 
      ${tIds && tIds.length ? `$termIds: [String],` : ''} 
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
          ${tIds && tIds.length ? `
          ,{
            operator: IN, 
            field: "field_tags.entity.tid", 
            value: $termIds
          }
          ` : ''}
        ],
      }){
      entities {
        ...ArticleFields
      }
    }
  }
  ${ARTICLE_FIELDS}
`
