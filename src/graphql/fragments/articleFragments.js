import { gql } from 'graphql-tag';

export const TAG_FIELDS = gql`
  fragment TagFields on TaxonomyTermTags {
    description {
      value
      format
      processed
    }
  }
`;

export const IMAGE_FIELDS = gql`
  fragment ImageFields on MediaImage {
    fieldMediaImage {
      url
    }
  }
`;

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
  }
  ${TAG_FIELDS}
  ${IMAGE_FIELDS}
`;
