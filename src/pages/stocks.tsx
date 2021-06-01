import Head from 'next/head';
import StocksContainer from '../components/StocksContainer/StocksContainer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StocksContainer />
    </div>
  )
}