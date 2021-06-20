import Head from 'next/head';
import StocksContainer from '../components/StocksContainer/StocksContainer'
import StocksHeader from '../components/StocksHeader/StocksHeader'
import { StocksProvider } from '../contexts/StocksContext';

export default function Home({ globalNames }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StocksProvider ssg={globalNames}>
        <StocksHeader />
        <StocksContainer />
      </StocksProvider>
    </div>
  )
}


export async function getStaticProps() {
  const response = await fetch((process.env.VERCEL_URL || "http://localhost:3000") + '/api/cotationsApi?type=all');
  const data = await response.json();

  return {
    props:{
      globalNames: data
    },
    revalidate: 60 * 60 * 24 * 10,
  }
}