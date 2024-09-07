import { gql } from 'graphql-tag'

export const TAG_FIELDS = gql`
  fragment TagFields on TaxonomyTermTags {
    description {
      value
      format
      processed
    }
  }
`

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

export const PARAGRAPHS = gql`
  fragment ParagraphsFields on FieldNodeArticleFieldParagraphs {
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

export const ARTICLE_FIELDS = gql`
  fragment ArticleFields on NodeArticle {
    title
    nid
    created
    entityOwner {
      name
    }
    body {
      value
      format
      processed
    }
    fieldTeaser
    fieldImage {
      entity {
        ...ImageFields
      }
    }
    fieldTags {
      targetId
      entity {
        entityId
        tid
        name
        entityBundle
        weight
        ...TagFields
      }
    }
    fieldParagraphs {
      ...ParagraphsFields
    }
  }
  ${PARAGRAPHS}
  ${TAG_FIELDS}
  ${IMAGE_FIELDS}
`
