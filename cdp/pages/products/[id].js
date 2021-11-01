import { useEffect } from 'react';
import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllProductIds, getProductData } from '../../lib/products'

export async function getStaticPaths() {
    const paths = getAllProductIds()
    return {
      paths,
      fallback: false
    }
}

export async function getStaticProps({ params }) {
    const productData = await getProductData(params.id)
    return {
      props: {
        productData
      }
    }
}

export default function Product( { productData }) {
    useEffect(() => {
      if (typeof window === 'undefined' || !Boxever) {
        console.warn("Can't fire off view event, either SSR or no Boxever.")
        return;
      }
        console.log(`We're tracking you! You're looking at: Product: ${productData.id} with an id of` + " " + Boxever.getID());
        _boxeverq.push(function() { 
            var viewEvent = {
                "browser_id": Boxever.getID(),
                "channel": "WEB",
                "type": "VIEW",
                "language": "EN",
                "currency": "USD",
                "page": `/products/${productData.id}`,
                "pos": "cdp-red"
            };
            //Add UTM params
            viewEvent = Boxever.addUTMParams(viewEvent);
            // Invoke event create 
            // (<event msg>, <callback function>, <format>)
            Boxever.eventCreate(viewEvent, function(data){}, 'json');
        });
    }, []);
  return (
    <Layout>
      <Head>
        <title>{productData.title}</title>
      </Head>
      <article>
        <h1>{productData.title}</h1>
        {productData.disclaimer != null ? (<aside dangerouslySetInnerHTML={{__html: productData.disclaimer}}></aside>) : (<></>)}
        <div dangerouslySetInnerHTML={{ __html: productData.contentHtml }}></div>
      </article>
    </Layout>
  )
}