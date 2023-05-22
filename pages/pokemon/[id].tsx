import { useState } from "react";

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Button, Card, Container, Grid, Image, Text } from "@nextui-org/react";

import confetti from 'canvas-confetti';

import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { Pokemon } from "@/interfaces";
import { getPokemonInfo, localFavorites } from "@/utils";

interface Props  {
    pokemon: any;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites( pokemon.id ) );

    const onToggleFavorite = () => {
        localFavorites.toggleFavorites( pokemon.id);
        setIsInFavorites( !isInFavorites );

        if ( isInFavorites ) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0,
            }
        })
    }

    return (
        <Layout title={ pokemon.name}>

            <Grid.Container css={{ marginTop: '5px'}} gap={ 2 }>
                <Grid xs={ 12 } sm={ 4 }>
                    <Card isHoverable css={{ padding: '30px'}}>
                        <Card.Body>
                            <Card.Image 
                                src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                                alt={ pokemon.name }
                                width="100"
                                height={ 200 }
                                />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={ 12 } sm={ 8 }>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between'}}>
                            <Text h1 transform="capitalize">{ pokemon.name }</Text>
                            <Button
                            onPress={ onToggleFavorite }
                            color="gradient"
                            ghost={ !isInFavorites }
                            >
                            { isInFavorites ? 'On favorites' : 'Add to favorites' }
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={ 30 }>Sprites:</Text>
                            <Container direction='row' display='flex'>
                                <Image 
                                src={ pokemon.sprites.front_default }
                                alt={ pokemon.name }
                                width={ 100 }
                                height={ 100 }
                                />
                                <Image 
                                src={ pokemon.sprites.back_default }
                                alt={ pokemon.name }
                                width={ 100 }
                                height={ 100 }
                                />
                                <Image 
                                src={ pokemon.sprites.front_shiny }
                                alt={ pokemon.name }
                                width={ 100 }
                                height={ 100 }
                                />
                                <Image 
                                src={ pokemon.sprites.back_shiny }
                                alt={ pokemon.name }
                                width={ 100 }
                                height={ 100 }
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>

        </Layout>
    )
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {

    const pokemon151 = [...Array(151)].map(( value, index ) => `${ index + 1}`);

    return {
        paths: pokemon151.map( id => ({
            params: { id }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({  params }) => {

    const { id } = params as { id: string };

    
    
    
      return {
        props: {
          id: 1,
          pokemon: await getPokemonInfo(id)
        }
      }
    }

export default PokemonPage;