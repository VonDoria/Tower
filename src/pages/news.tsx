import Head from 'next/head';
import NewsContainer from '../components/NewsContainer/NewsContainer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewsContainer />
    </div>
  )
}