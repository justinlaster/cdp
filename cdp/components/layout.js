import Head from 'next/head'
import Link from 'next/link'

const name = 'CDP - RED'
export const siteTitle = 'CDP RED - A Sample CDP Site'

export default function Layout({ children, home }) {
  return (
    <div >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A sample CDP Website"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        <nav>
            <Link href="/">
              <a>
                <img
                  src="/images/layout/logo.jpg"
                  
                  alt={name}
                />
              </a>
            </Link>
          <ul>
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
              <Link href="/posts">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact">
                Contact
              </Link>
            </li>
            <li>             
               <a href="https://github.com/justinlaster">Github</a>
               </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
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