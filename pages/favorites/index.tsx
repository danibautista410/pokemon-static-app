import { useEffect, useState } from "react";

import { Layout } from "@/components/layouts"
import { NoFavorites } from "@/components/ui";
import { localFavorites } from "@/utils";
import { Card, Grid } from "@nextui-org/react";
import { FavoritePokemons } from "@/components/pokemon";


const FavoritePage = () => {

    const [favoritePokemons, setFavoritePokemons] = useState<number[]>( [] );

    useEffect(() => {
        setFavoritePokemons( localFavorites.pokemons() );
    }, []);
    

    return (
        <Layout title="Favorites Pokémons">
            {
                favoritePokemons.length === 0
                ? ( <NoFavorites />)
                : (
                    <FavoritePokemons pokemons={ localFavorites.pokemons()}/>
                )
            }
        </Layout>
    )
}

export default FavoritePage;