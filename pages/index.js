import React from 'react';
import Prismic from 'prismic-javascript';
import Head from 'next/head';

const Index = ({ data }) => {
    return (
        <React.Fragment>
            <Head>
                <title>
                    { data.pagetitle }
                </title>
            </Head>
            {/* <pre>{ JSON.stringify(data) }</pre> */}
            <div className="w-1/2 mx-auto text-center">
                <h1 className='font-bold text-4x1 p-8'>{ data.title }</h1>
                <img className='mx-auto rounded-full shadow-2xl w-1/4' src={data.logo.url} alt="Logo" />
                {
                    data.body.map((item, index) => {
                        if (item.slice_type === 'section')
                            return <h2 className='font-bold text-2xl pt-4' key={index}>{item.primary.name}</h2>
                        else if (item.slice_type === 'link') {
                            return (
                                <div key={index}>
                                    <a
                                     className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 inline-block'
                                     href={item.primary.destiny.url}
                                    >
                                        {item.primary.button_text}
                                    </a>
                                </div>
                            )
                        }
                        return null
                    })
                }
            </div>
        </React.Fragment>
    );
};

export async function getServerSideProps() {
    const client = Prismic.client('https://diogoalexandria.cdn.prismic.io/api/v2');
    const centralinks = await client.getSingle('centralinks');

    return {
        props: {
            data: centralinks.data
        }
    }
};

export default Index;
