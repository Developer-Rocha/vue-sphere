import { gql } from 'graphql-tag'

export const ESPAZIUM = gql`
  query nodeInfoArticle($language: LanguageId!, $path: String!) {
    info: nodeQuery(
      filter: {
        conjunction: AND
        conditions: [
          { field: "type", value: ["article"], operator: EQUAL }
          { field: "status", value: ["1"], operator: EQUAL }
          { field: "field_seo_path", value: [$path], operator: LIKE }
        ]
      }
      offset: 0
      limit: 1
    ) {
      entities(language: $language) {
        id: entityId
        bundle: entityBundle
        ...NodeSchoolArticleInfo
        __typename
      }
      __typename
    }
  }

  fragment NodeSchoolArticleInfo on NodeSchoolArticle {
    title
    paid: fieldPaidContent
    seoPath: fieldSeoPath
    lead: fieldLeadText {
      value
      processed
      __typename
    }
    publish: fieldPublishingDate {
      value
      __typename
    }
    metatags: entityMetatags {
      key
      value
      __typename
    }
    body {
      value
      processed
      __typename
    }
    gallery: fieldSlides {
      entity {
        ... on ParagraphEducationSliderItem {
          caption: fieldCaption {
            value
            processed
            __typename
          }
          media: fieldMedia {
            entity {
              ...MediaImage
              ...MediaVideo
              ...MediaUploadVideo
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    school: fieldSchool {
      entity {
        ...School
        __typename
      }
      __typename
    }
    fos: fieldFos {
      entity {
        ...NodeInfoFOSTaxonomy
        __typename
      }
      __typename
    }
    articleCategories: fieldArticleCategory {
      entity {
        ...ArticleCategoryTerms
        __typename
      }
      __typename
    }
    __typename
  }

  fragment ArticleCategoryTerms on TaxonomyTermArticleCategory {
    id: entityId
    title: entityLabel
    bundle: entityBundle
    url: entityUrl {
      path
      __typename
    }
    __typename
  }

  fragment NodeInfoFOSTaxonomy on TaxonomyTermSchoolFieldOfStudy {
    id: entityId
    title: entityLabel
    bundle: entityBundle
    url: entityUrl {
      path
      __typename
    }
    __typename
  }

  fragment MediaImage on MediaImage {
    bundle: entityBundle
    image: fieldImage {
      alt
      title
      sm: derivative(style: MEDIAIMAGEMOBILE) {
        width
        height
        url
        __typename
      }
      md: derivative(style: MEDIAIMAGETABLET) {
        width
        height
        url
        __typename
      }
      lg: derivative(style: MEDIAIMAGE) {
        width
        height
        url
        __typename
      }
      __typename
    }
    __typename
  }

  fragment MediaVideo on MediaVideo {
    bundle: entityBundle
    caption: fieldCaption
    source: fieldSource
    copyright: fieldCopyright
    platform: fieldPlatform
    url: fieldMediaVideoEmbedField
    __typename
  }

  fragment MediaUploadVideo on MediaUploadVideo {
    bundle: entityBundle
    caption: fieldCaption
    copyright: fieldCopyright
    poster: fieldImage {
      alt
      title
      sm: derivative(style: MEDIAIMAGEMOBILE) {
        width
        height
        url
        __typename
      }
      __typename
    }
    file: fieldFile {
      entity {
        filename
        filemime
        url
        __typename
      }
      __typename
    }
    __typename
  }

  fragment School on User {
    id: entityId
    title: name
    bundle: entityBundle
    profile: fieldSchoolProfile {
      entity {
        ...ParagraphSchoolProfile
        __typename
      }
      __typename
    }
    url: entityUrl {
      path
      __typename
    }
    __typename
  }

  fragment ParagraphSchoolProfile on ParagraphSchoolProfile {
    lead: fieldText {
      value
      processed
      __typename
    }
    link: fieldWebsite {
      text: title
      address: uri
      __typename
    }
    displayName: fieldSchoolName
    __typename
  }
`
