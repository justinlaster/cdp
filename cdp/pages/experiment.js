import { useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import { getAllProductIds, getProductData, getSortedProductsData } from '../lib/products'

export async function getStaticProps() {
    const allProductsData = getSortedProductsData()
    return {
        props: {
            allProductsData
        }
    }
}

export default function Experiment({ allProductsData }) {
    return (
        <Layout>
            <Head>
            <title>Experiment</title>
            </Head>
            <article>
            <div className={'text-5xl m-1'}>Let&apos;s run an experiment, just like the rockets we build and put people on!</div>
             {
                Array.apply(null, Array(20)).map(function(e, i) { return (<Image key={i} src="/images/who-needs-a-rocket.gif" width='300' height='300'/>); })
             }
            </article>
        </Layout>
    );
}