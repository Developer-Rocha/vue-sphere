const Helpers = {
  removeLeadingSlash(pathAlias) {
    return pathAlias ? pathAlias.replace(/^\//, '') : '/not-found'
  },

  formatDate(timestamp) {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    })
  }
}

export default Helpers
