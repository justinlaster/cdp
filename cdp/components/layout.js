import Head from 'next/head'
import Link from 'next/link'

const name = 'CDP - RED'
export const siteTitle = 'CDP RED - A Sample CDP Site'

export default function Layout({ children, home }) {
  return (
    <div className={'min-h-screen text-gray-50 bg-gray-800'}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A sample CDP Website"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={'container mx-auto'}>
        <nav className={'pb-10'}>
          <ul className={'flex content-start items-start p-10 space-x-4'}>
            <li>
              {home ? (
                <>
                  Home
                </>
              ) : (
                <>
                  <Link href="/">
                    Home
                  </Link>
                </>
              )}
            </li>
            <li>
              <Link href="/products">
                Products
              </Link>
            </li>
            <li>
              <Link href="/checkout">
                Checkout
              </Link>
            </li>
            <li>             
               <a href="https://github.com/justinlaster">Github</a>
               </li>
          </ul>
          <Link href="/">
              <a>
                <img
                  src="/images/layout/logo.jpg"
                  width="350"
                  height="350"
                  alt="The original Jeff Bezos"
                />
              </a>
            </Link>
        </nav>
      </header>
      <main className={'container mx-auto'}>{children}</main>
      <footer>
        {!home && (
          <div >
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </footer>
    </div>
  )
}