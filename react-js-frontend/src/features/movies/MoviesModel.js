export const statusBgColorMapping = {
  inactive: 'bgError',
  active: 'gradientGreen',
}


export const statusColorMapping = {
  inactive: 'error',
  active: 'success',
}


export const defaultFilters = {

}

export const initialMoviesTable = {
  data: null,
  isLoading: false,
  isError: false,
  filters: [],
  page: 1,
  ordering: null,
  itemsPerPage: 15,
  totalItems: 0,
  apiQuery: '',
  searchQuery: '',
}

export const initialMoviesData = {
  data: null,
  isLoading: false,
  isError: false,
}
