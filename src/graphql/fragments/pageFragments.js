import { gql } from 'graphql-tag'

export const IMAGE_FIELDS = gql`
  fragment ImageFields on MediaImage {
    fieldMediaImage {
      url
    }
  }
`

export const PARAGRAPH_TEXT = gql`
  fragment ParagraphText on ParagraphText {
    fieldTitle
    fieldText {
      value
    }
  }
`

export const PARAGRAPH_TEXT_WITH_IMAGE = gql`
  fragment ParagraphTextWithImage on ParagraphTextWithImage {
    fieldImage {
      entity {
        ...ImageFields
      }
    }
    fieldTitle
    fieldText {
      value
    }
  }
  ${IMAGE_FIELDS}
`

export const PARAGRAPH_IMAGE = gql`
  fragment ParagraphImage on ParagraphImage {
    fieldImage {
      entity {
        ...ImageFields
      }
    }
  }
  ${IMAGE_FIELDS}
`

export const PAGE_PARAGRAPHS = gql`
  fragment PageParagraphsFields on FieldNodePageFieldParagraphs {
    entity {
      ...ParagraphText
      ...ParagraphTextWithImage
      ...ParagraphImage
    }
  }
  ${PARAGRAPH_TEXT}
  ${PARAGRAPH_TEXT_WITH_IMAGE}
  ${PARAGRAPH_IMAGE}
`

export const PAGE_FIELDS = gql`
  fragment PageFields on NodePage {
    title
    nid
    fieldBanner {
      entity {
        ...ImageFields
      }
    }
    fieldParagraphs {
      ...PageParagraphsFields
    }
  }
  ${PAGE_PARAGRAPHS}
  ${IMAGE_FIELDS}
`
