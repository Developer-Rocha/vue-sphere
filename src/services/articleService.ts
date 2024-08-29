import apiClient from './api'

export async function getArticles() {
  try {
    const response = await apiClient.get('/node/article')
    return response.data
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    throw error
  }
}
