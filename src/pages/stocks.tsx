import Head from 'next/head';
import StocksContainer from '../components/StocksContainer/StocksContainer'
import StocksHeader from '../components/StocksHeader/StocksHeader'
import { StocksProvider } from '../contexts/StocksContext';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StocksProvider>
        <StocksHeader />
        <StocksContainer />
      </StocksProvider>
    </div>
  )
}