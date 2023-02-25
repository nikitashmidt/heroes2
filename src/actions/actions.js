export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}
export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}
export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}
export const filtersAdd = (filters) => {
    return {
        type: 'FILTERS_ADD',
        payload: filters
    }
}
export const heroesRemove = (id) => {
    return {
        type: 'HEROES_REMOVE',
        payload: id
    }
}
export const heroesAdd = (id, name, description, element) => {
    return {
        type: 'HEROES_ADD',
        payload: { id, name, description, element }
    }
}