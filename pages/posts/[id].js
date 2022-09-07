import Head from 'next/head'

import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData,
        }
    }
}

/**
 * In development, runs on every request. In prod, runs at build time.
 */
export async function getStaticPaths() {
    const paths = getAllPostIds();

    return {
        paths,
        // If fallback is false, any paths not returned by getStaticPaths results in 404 page
        // If true, paths not generated at build time will serve a 'fallback' version of a page instead of 404 on the first request to such a path.
        // In the background, Next.js will statically generate the requested path and subsequent requests to the same path will serve the generated page, just like other pages pre-rendered at build time.
        // If fallback is 'blocking', new paths will be server-side-rendered with getStaticProps and cached for future requests so it only happens once per path.
        // See docs for more: https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-false
        fallback: false, 
    }
}

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }