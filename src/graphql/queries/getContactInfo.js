import { gql } from 'graphql-tag'

export const GET_CONTACT_INFO = gql`
  query GetContactInfo {
    configPagesQuery(
      filter: { conditions: [{ field: "type", value: "contact", operator: EQUAL }] }
    ) {
      entities {
        ... on ConfigPagesContact {
          id
          type {
            targetId
          }
          title: fieldTitle
          email: fieldEmail
          phone: fieldPhone {
            value
          }
          address: fieldAddress {
            countryCode
            locality
            postalCode
            addressLine1
            addressLine2
          }
          text: fieldText {
            value
          }
        }
      }
    }
  }
`
