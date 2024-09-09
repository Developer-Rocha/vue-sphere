<template>
  <div>
    <div v-if="props.search" class="form-inline tm-search-form">
      <div class="wrap-search-input">
        <input
          v-model="searchTitle"
          placeholder="Search by title..."
          @input="fetchArticles"
          class="form-control tm-search-input search-input"
        />
        <IconSearch size="30" />
      </div>
    </div>

    <div v-if="props.search" class="tag-filter">
      <TagList :is-filter="true" @remove-tag="removeTagQuery" />
    </div>

    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="articles.length" class="row tm-row">
      <ArticleItem
        v-for="(article, index) in articles"
        :key="index"
        :article="article.entityTranslation"
        :new="index <= 1"
      />
    </div>

    <div v-if="(totalPages > 1) & showPagination" class="row pagination">
      <button
        class="mb-2 tm-btn tm-btn-primary tm-prev-next"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        Prev
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        class="mb-2 tm-btn tm-btn-primary tm-prev-next"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_ARTICLES } from '../graphql/queries/getAllArticles'
import ArticleItem from './ArticleItem.vue'
import TagList from './TagList.vue'
import { IconSearch } from '@tabler/icons-vue'
import { useConfigStore } from '@/stores/config'

const props = defineProps({
  tag: {
    type: String,
    required: false
  },
  search: {
    type: Boolean,
    required: false
  },
  limit: {
    type: Number,
    required: false,
    default: 4
  },
  showPagination: {
    type: Boolean,
    required: false,
    default: false
  }
})

const configStore = useConfigStore()
const currentLanguage = computed(() => configStore.currentLanguage)
const currentLangcode = computed(() => configStore.currentLangcode)
const searchTitle = ref('')
const router = useRouter()
const route = useRoute()
const currentPage = ref(1)
const tag = computed(() => props.tag)
const showPagination = ref(props.showPagination)

const offset = computed(() => {
  const calculatedOffset = (currentPage.value - 1) * props.limit
  return calculatedOffset < 0 ? 0 : calculatedOffset
})
const hasTag = computed(() => !!props.tag?.length)

const modifiedTitle = computed(() => {
  return searchTitle.value
    .split(' ')
    .map((title) => `%${title}%`)
    .join(' ')
})

const { loading, error, result, refetch } = useQuery(
  computed(() => GET_ALL_ARTICLES(props.search, hasTag.value)),
  {
    title: modifiedTitle.value,
    tag: tag,
    limit: props.limit,
    offset: offset.value,
    language: currentLanguage,
    langcode: currentLangcode
  }
)

watch(
  [() => modifiedTitle.value, currentLanguage, currentLangcode, tag, offset],
  ([newTitle, newLanguage, newLangcode, newTag, newOffset]) => {
    refetch({
      title: newTitle,
      tag: newTag,
      limit: props.limit,
      offset: newOffset,
      language: newLanguage,
      langcode: newLangcode
    })
  }
)

const articles = computed(() => result.value?.nodeQuery.entities || [])
const totalArticles = computed(() => result.value?.nodeQuery?.count || 0)
const totalPages = computed(() => Math.ceil(totalArticles.value / props.limit))

watch(totalArticles, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  }
})

watch(
  () => props.showPagination,
  (newVal) => {
    showPagination.value = newVal
  }
)
const removeTagQuery = () => {
  const query = { ...route.query }

  if ('tag' in query) {
    delete query.tag
    router.push({ query })

    currentPage.value = 1

    callRefetch(true)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++

    callRefetch()
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--

    callRefetch()
  }
}

const callRefetch = (noTag) => {
  const newTitle = modifiedTitle.value
  const newTag = noTag ? '' : tag.value
  const newLanguage = currentLanguage.value
  const newLangcode = currentLangcode.value
  const newOffset = offset.value

  refetch({
    title: newTitle,
    tag: newTag,
    limit: props.limit,
    offset: newOffset,
    language: newLanguage,
    langcode: newLangcode
  })
}
</script>

<style scoped>
.wrap-search-input {
  position: relative;
  display: block;
  margin-right: 30px;
  margin-bottom: 30px;
  border-radius: 0;
  border-color: #0cc;
  font-size: 1.2rem;
}
.wrap-search-input svg {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

.wrap-search-input .search-input {
  width: 100%;
  height: 100%;
}

.pagination {
  justify-content: center;
  display: flex;
  align-items: center;
}

.pagination span {
  margin: 0 30px;
}
</style>
