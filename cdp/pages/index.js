import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { getSortedProductsData } from '../lib/products'
import Layout, { siteTitle } from '../components/layout'

export async function getStaticProps() {
  const allProductsData = getSortedProductsData()
  return {
    props: {
      allProductsData
    }
  }
}

export default function Home( { allProductsData }) {
  return (
    <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section>
      <h1>A List Of Products</h1>
      <p>
       Welcome to the Jeff Bezos Wannabe Product Depot
      </p>
    </section>
    <hr/>
    <section>
      <h2>Products</h2>
      <ul>
      {allProductsData.map(({ id, date, title, summary }) => (
            <li key={id}>
              <Link href={`/products/${id}`}>
                <a>{title}</a>
              </Link>
              <br/>
                <small><em>{summary}</em></small>
            </li>
          ))}
      </ul>
      <br/>
    </section>
    <section>
      <Link href="/products">
        <a>All Products →</a>
      </Link>
    </section>
  </Layout>
  )
}
