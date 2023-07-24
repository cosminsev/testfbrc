import { defaultFilters } from './MoviesModel'

export const createQueryFromState = (state) => {
  const { searchQuery, page, filters, ordering, itemsPerPage } = state

  let query = `?page=${page}`

  if (itemsPerPage) query += `&page_size=${itemsPerPage}`
  if (ordering) query += `&ordering=${ordering}`
  if (searchQuery?.length) query += `&search=${searchQuery}`

  if (filters) {
    Object.keys(filters).forEach((key) => {
      const encodedKey = key.replace(' ', '_')
      if (defaultFilters[key].type === 'range') {
        if (filters[key][0] && defaultFilters[key].min !== filters[key][0]) {
          query += `&${encodedKey}_min=${filters[key][0]}`
        }

        if (filters[key][1] && defaultFilters[key].max !== filters[key][1]) {
          query += `&${encodedKey}_max=${filters[key][1]}`
        }
      } else if (defaultFilters[key].type === 'customOptions') {
        filters[key].forEach(
          (value) => (query += `&${defaultFilters[key].customType === 'prefix' && `${value}_`}${encodedKey}=true`),
        )
      } else {
        filters[key].forEach((value) => (query += `&${encodedKey}=${value}`))
      }
    })
  }

  return query
}
