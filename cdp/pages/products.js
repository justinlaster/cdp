import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { getSortedProductsData } from '../lib/products'
import Link from 'next/link'

export async function getStaticProps() {
  const allProductsData = getSortedProductsData()
  return {
    props: {
      allProductsData
    }
  }
}

export default function Posts({ allProductsData }) {
  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>
      <section>
        <header>
          <h2>Products</h2>
        </header>
        <ul>
          {allProductsData.map(({ id, date, title }) => (
            <li key={id}>
            <Link href={`/products/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
          </li>
          ))}
        </ul>
        <br/>
      </section>
    </Layout>
  )
}