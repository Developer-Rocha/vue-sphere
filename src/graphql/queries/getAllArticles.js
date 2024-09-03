import { gql } from 'graphql-tag'
import { ARTICLE_FIELDS } from '../fragments/articleFragments'

export const GET_ALL_ARTICLES = (search, hasTag) => gql`
  query GetAllArticles(
    ${search ? `$title: [String],` : ''} 
    ${hasTag ? `$tag: [String],` : ''}
    $limit: Int, 
    ) {
    nodeQuery(
      filter: { 
        conditions: [
          { 
            field: "status", 
            value: "1" 
          }
          ${
            search
              ? `
            ,{
              operator: LIKE,
              field: "title",
              value: $title
            }
          `
              : ''
          }
          ${
            hasTag
              ? `
          ,{
            operator: IN, 
            field: "field_tags.entity.tid", 
            value: $tag
          }
          `
              : ''
          }
        ] 
      }
      limit: $limit
      sort: {field: "created" direction: DESC}
    ){
      entities {
        ...ArticleFields
      }
    }
  }
  ${ARTICLE_FIELDS}
`
