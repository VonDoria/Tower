import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Link to={"/stocks"} >stocks</Link> */}
      <a href="/stocks">Stocks</a>
      <a href="/news">News</a>
    </div>
  )
}
