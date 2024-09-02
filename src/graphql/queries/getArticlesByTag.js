import { gql } from 'graphql-tag'
import { ARTICLE_FIELDS } from '../fragments/articleFragments';

export const GET_ARTICLE_BY_TAG = gql`
  query GetArticleByTag($nid: String, $termId: String, $limit: Int) {
    nodeQuery(
      limit: $limit, 
      offset: 0, 
      filter: {
        conditions:[
          {
            operator: EQUAL, 
            field: "field_tags.entity.tid", 
            value: [$termId]
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
