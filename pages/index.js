import Head from 'next/head';
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';

/**
 * Only runs on server-side, not client-side.
 * Can only be exported from a page.
 * Runs on every request in development, but only at build time on prod.
 */
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  
  return {
    props: {
      allPostsData
    }
  }

  // EXAMPLE 2: FETCH EXTERNAL API/QUERY DB
  // Instead of the file system,
  // fetch post data from an external API endpoint
  // const res = await fetch('...');
  // return res.json();

  // EXAMPLE 3: QUERY DB DIRECTLY
  // import someDatabaseSDK from 'someDatabaseSDK'

  // const databaseClient = someDatabaseSDK.createClient(...)

  // export async function getSortedPostsData() {
  //   // Instead of the file system,
  //   // fetch post data from a database
  //   return databaseClient.query('SELECT posts...')
  // }
}

/**
 * Called at request time.
 * Should only be used if you need to pre-render a page whoe data must be fetched at request time.
 * @param context Contains request-specific paremeters
 * @returns 
 */
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // ...
//     }
//   }
// }



export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Soooo close to the end!!</p>
        <p>
          Go to <Link href="/posts/first-post">First Post!</Link>
        </p>
        <p>
          See <Link href="/default">Default Page!</Link>
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                {title}
              </Link>
              <br/>
              <small className={utilStyles.lightText}>
                <Date dateString={date}/>
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}