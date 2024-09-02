import { gql } from 'graphql-tag'
import { ARTICLE_FIELDS } from '../fragments/articleFragments';

export const GET_ARTICLES_BY_TAG = gql`
  query GetArticleByTag($nid: String, $termIds: [String], $limit: Int) {
    nodeQuery(
      limit: $limit, 
      offset: 0, 
      filter: {
        conditions:[
          {
            operator: IN, 
            field: "field_tags.entity.tid", 
            value: $termIds
          },
          {
            operator: NOT_EQUAL
            field: "nid"
            value: [$nid]
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
