import { gql } from 'graphql-tag'

export const POST_WEBFORM = gql`
  mutation PostWebform($values: String!) {
    submitForm(values: $values) {
      errors
      submission {
        entityId
        entityLabel
        id
      }
    }
  }
`
