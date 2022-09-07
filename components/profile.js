import useSWR from 'swr'

/**
 * The team behind Next.js has created a React hook for data fetching called SWR. 
 * We highly recommend it if you’re fetching data on the client side. 
 * It handles caching, revalidation, focus tracking, refetching on interval, and more. 
 * We won’t cover the details here, but here’s an example usage:
 */
function Profile() {
    const {data, error} = useSWR('/api/user', fetch)

    if (error) return <div>FAILED to load</div>
    if (!data) return <div>loading........</div>
    return <div>hello {data.name}!</div>
}