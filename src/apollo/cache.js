import { InMemoryCache } from '@apollo/client/core';

const cache = new InMemoryCache({
  addTypename: false,
});

export default cache;
