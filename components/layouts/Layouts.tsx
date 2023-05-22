import Head from "next/head"
import { FC } from "react";
import { Navbar } from '../ui'
import { useRouter } from "next/router";

interface Props {
    children: React.ReactNode;
    title?: string;
  }

  const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {

    const router = useRouter();

    return (
        <>
            <Head>
                <title>{ title || 'Pokemon App' }</title>
                <meta name="Daniel Bautista"/>
                <meta name="description" content={`Information about the pokemon ${ title }`} />
                <meta name="keywords" content={`${ title }, pokemon, pokedex`} />
                <meta property="og:title" content={`Information about ${ title }`} />
                <meta property="og:description" content={`This is the page about ${ title }`} />
                <meta property="og:image" content={`${ origin }/images/banner.png`} />
                meta
            </Head>

            <Navbar/>

            <main style={{
                padding: '0px 20px'
            }}>
                { children }
            </main>
        </>
    )
}