
const getFavorites = () => JSON.parse( localStorage.getItem('favorites') || '[]');

const toggleFavorites = ( id: number ) => {

    let favorites: number[] = getFavorites();

    if( favorites.includes(id) ) {
        favorites = favorites.filter( pokeId => pokeId !== id)
    } else {
        favorites.push( id );
    }

    localStorage.setItem( 'favorites', JSON.stringify( favorites ) );
}

const existInFavorites = ( id: number ): boolean => {

    if( typeof window === 'undefined') return false;

    const favorites: number[] = getFavorites();

    return favorites.includes( id );
}

const pokemons = (): number[] => {
    return getFavorites();
}

export default {
    existInFavorites,
    toggleFavorites,
    pokemons,
}