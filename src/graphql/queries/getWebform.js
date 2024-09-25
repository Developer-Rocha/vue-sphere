import { gql } from 'graphql-tag'

export const GET_WEBFORM = gql`
  query GetWebform($webform_id: String) {
    webformById(webform_id: $webform_id) {
      elements {
        ... on WebformElementTextField {
          id
          title
          type
          placeholder
          maxLength
          required {
            message
          }
        }
        ... on WebformElementEmail {
          id
          title
          type
          placeholder
          multiple {
            message
          }
          required {
            message
          }
        }
        ... on WebformElementPhone {
          id
          title
          type
          placeholder
          required {
            message
          }
        }
        ... on WebformElementTextarea {
          id
          title
          type
          placeholder
          maxLength
          required {
            message
          }
        }
      }
    }
  }
`
