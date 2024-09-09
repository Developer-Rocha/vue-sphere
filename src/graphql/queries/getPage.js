import { gql } from 'graphql-tag'
import { PAGE_FIELDS } from '../fragments/pageFragments'

export const GET_PAGE = gql`
  query GetPage($id: String!, $language: LanguageId!) {
    nodeById(id: $id, language: $language) {
      ...PageFields
    }
  }
  ${PAGE_FIELDS}
`
