export const endpoints = {
  provinces: {
    getAll: '/provinces',
    getBySlug: (slug) => `/provinces/slug/${slug}`,
  },

  gameResults: {
    getAll: '/game-results',
  },
}