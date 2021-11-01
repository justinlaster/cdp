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
      <div className={'text-4xl py-5'}>Do you wanna be Jeff Bezos? Who doesn&apos;t! </div>
      <p>
       A collection of different products to make you Jeff Bezos, cash not included.
      </p>
    </section>
    <hr/>
    <div className={'m-3'}>
      <div className={'text-3xl'}>Products</div>
      <ul className={'list-disc content-center m-10'}>
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
    </div>
    <section>
      <Link href="/products">
        <a>All Products →</a>
      </Link>
    </section>
  </Layout>
  )
}
