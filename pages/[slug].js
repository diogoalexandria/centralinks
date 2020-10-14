import React, { useEffect } from 'react';
import Prismic from 'prismic-javascript';
import { useRouter } from 'next';
import Head from 'next/head';

const RedirectTo = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 2000);
    }, []);

    return (
        <React.Fragment>
            <Head>Página não encontrada</Head>
            <div className='w-1/2 mx-auto text-center mt-8'>
                <h1 className='font-bold text-4xl'>URL não encontrada</h1>
                <p>Estamos redirecionando você para a Centralinks</p>
            </div>
        </React.Fragment>
    )
};

export async function getServerSideProps({ params, res }) {
    const client = Prismic.client("https://diogoalexandria.cdn.prismic.io/api/v2");
    const link = await client.getByUID('shortlink', params.slug);
    console.log(link)
    if (link) {
        res.statusCode = 301;
        res.setHeader('Location', link.data.destiny.url);
        res.end();
        return;
    }
    return {
        props: {

        }
    };
};

export default RedirectTo;
