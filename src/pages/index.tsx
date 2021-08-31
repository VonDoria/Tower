import Head from 'next/head';
import StocksContainer from '../components/StocksContainer/StocksContainer'
import StocksHeader from '../components/StocksHeader/StocksHeader'
import { StocksProvider } from '../contexts/StocksContext';

export default function Quotes({ globalNames }) {
  return (
    <div>
      <Head>
        <title>Tower</title>
        <link rel="icon" href="/tower.png" />
      </Head>
      <StocksProvider ssg={globalNames}>
        <StocksHeader />
        <StocksContainer />
      </StocksProvider>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch((process.env.BASE_PATH) + '/api/cotationsApi?type=all');
  const data = await response.json();

  return {
    props:{
      globalNames: data
    },
    revalidate: 60 * 60 * 24 * 10,
  }
}
