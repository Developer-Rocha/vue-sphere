import { gql } from 'graphql-tag'
import { ARTICLE_FIELDS } from '../fragments/articleFragments'

export const GET_ALL_ARTICLES = (search, hasTag) => gql`
  query GetAllArticles(
    ${search ? `$title: [String],` : ''} 
    ${hasTag ? `$tag: [String],` : ''}
    $limit: Int, 
    $language: LanguageId,
    $langcode: String
    ) {
    nodeQuery(
      filter: { 
        conditions: [
          { 
            field: "status", 
            value: "1" 
          },
          {
            operator: EQUAL,
            field: "langcode.value",
            value: [$langcode]
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
