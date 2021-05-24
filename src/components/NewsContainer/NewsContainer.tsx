import { useEffect, useState } from 'react';
import styles from './NewsContainer.module.css';

export default function Home() {

  const [allData, setAllData] = useState([]);


  async function loadData(){
    let result = await fetch('http://localhost:3000/api/newsApi?country=br&language=pt&category=general');
    let resultJson = await result.json();
    return resultJson
  }


  useEffect(() => {
    fetch('http://localhost:3000/api/newsApi?country=br&language=pt&category=general')
    .then(res => res.json())
    .then(res => setAllData(res.news.articles));
  }, []);

  return (
    <div className={styles.container}>
      {allData.map((element, index) => {
        return(
          <>
            <div key={index}>
              <img src={element.urlToImage} alt="" />
              <div>
                <b>{element.title}</b>
                <p>{element.description}</p>
                <a href={element.url} target="_blanck">{element.url}</a>
              </div>
            </div>
          </>
        );
      })}
    </div>
  )
}