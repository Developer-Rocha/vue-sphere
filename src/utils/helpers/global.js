const Helpers = {
  removeLeadingSlash(pathAlias) {
    return pathAlias ? pathAlias.replace(/^\//, '') : '/not-found'
  }
}

export default Helpers
