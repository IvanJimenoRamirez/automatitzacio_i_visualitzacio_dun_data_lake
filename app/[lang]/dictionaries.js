const dictionaries = {
  'en-US': () => import('../../dictionaries/en.json').then((module) => module.default),
  'es-ES': () => import('../../dictionaries/es.json').then((module) => module.default),
  'cat-ES': () => import('../../dictionaries/cat.json').then((module) => module.default)
}

export const getDictionary = async (locale) => dictionaries[locale]()
