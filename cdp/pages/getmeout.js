import { useEffect } from 'react';
import Head from 'next/head'
import Layout from '../components/layout'

export default function GetMeOut({ allProductsData }) {
    useEffect(() => {
        if (typeof window === 'undefined' || !Boxever) {
            console.warn("Cannot get you out. SSR or no Boxever");
            return;
        }

        _boxeverq.push(function() { 
            var closeSession = {
                type: "GOODBYE_EARTH",
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
            <title>Fine, Leave</title>
            </Head>
            <article>
            <div className={'text-5xl m-1'}>Did not want you to sell you anything anyways.</div>
            </article>
        </Layout>
    );
}