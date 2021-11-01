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

export default function Checkout({ allProductsData }) {
    useEffect(() => {
        if (typeof window === 'undefined' || !Boxever) {
        console.warn("Cannot checkout. SSR or no Boxever");
        return;
        }
        var products = allProductsData.map(({ id, date, title }) => { return {"item_id": id}});

        _boxeverq.push(function() { 
            var event = {
                "browser_id": Boxever.getID(),
                "channel": "WEB",
                "type": "CONFIRM",
                "language": "EN",
                "currency": "USD",
                "page": window.location.pathname,
                "pos": "cdp-red",
                "product": products
            };
            event = Boxever.addUTMParams(event);
            Boxever.eventCreate(event, function(data){}, 'json');

            console.log("Checkout event: ");
            console.log(event);

            
            var checkout = {
                "channel": "WEB",
                "type": "CHECKOUT",
                "language": "EN",
                "currency": "EUR",
                "page": window.location.path,
                "pos": "cdp-red",
                "browser_id": Boxever.getID(),
                "reference_id": "ABC123",
                "status": "PURCHASED"
            }
            checkout = Boxever.addUTMParams(checkout);
            Boxever.eventCreate(checkout, function(data) {}, 'json');

            var closeSession = {
                type: "FORCE_CLOSE",
                channel: "WEB",
                browser_id: Boxever.getID(),
                pos: "cdp-red",
                _bx_extended_message: "1",
                page: window.location.pathname
            }
            Boxever.eventCreate(closeSession, function(data) {}, 'json');
        });
    }, []);
    return (
        <Layout>
            <Head>
            <title>Checkout</title>
            </Head>
            <article>
            <div className={'text-5xl m-1'}>You have checked out!</div>
            </article>
        </Layout>
    );
}