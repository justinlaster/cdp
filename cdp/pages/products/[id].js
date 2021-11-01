import { useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
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

function invokeAddEvent(productId) {
  if (typeof window === 'undefined' || !Boxever) {
    console.warn("Can't fire off add event, either SSR or no Boxever.")
    return;
  }

    console.info("Add product to cart: " + productId);
    _boxeverq.push(function() { 
        var event = {
            "browser_id": Boxever.getID(),
            "channel": "WEB",
            "type": "ADD",
            "language": "EN",
            "currency": "USD",
            "page": window.location.pathname,
            "pos": "cdp-red",
            "product": {
              "type": "BEZOS_MERCH",
              "item_id": productId,
              "name": productId,
              "currency": "EUR",
              "price": 200,
              "product_id": productId
          }
        };
        event = Boxever.addUTMParams(event);
        Boxever.eventCreate(event, function(data){}, 'json');

        // var closeSession = {
        //     type: "FORCE_CLOSE",
        //     channel: "WEB",
        //     browser_id: Boxever.getID(),
        //     pos: "cdp-red",
        //     _bx_extended_message: "1",
        //     page: window.location.pathname
        // }
        // Boxever.eventCreate(closeSession, function(data) {}, 'json');
    });
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
        <div className={'text-5xl m-1'}>{productData.title}</div>
        <div className={'m-1'}>
          {productData.disclaimer != null ? (<aside dangerouslySetInnerHTML={{__html: productData.disclaimer}}></aside>) : (<></>)}
          <div dangerouslySetInnerHTML={{ __html: productData.contentHtml }}></div>
          <Image src={`/images/products/${productData.id}.jpg`} width='300' height='300'/>
          <div className={"col-12"}>
            <button className={"bg-green-500 text-black group font-bold rounded"} onClick={() => invokeAddEvent(productData.id)}>
              <p className={"group-hover:text-white text-black"}>Add Product To Cart</p>
            </button>
          </div>
        </div>
      </article>
    </Layout>
  )
}