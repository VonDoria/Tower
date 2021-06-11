import { useEffect, useState } from 'react';
import styles from './StocksContainer.module.css';


export default function Home() {

  const [selectedStocks, setSelectedStocks] = useState([]);

  useEffect(() => {
    fetch(window.location.origin + '/api/cotationsApi?type=stocks')
    .then(res => res.json())
    .then(res => setSelectedStocks(res.data));
  }, []);

  return (
    <div className={styles.container}>
      {selectedStocks.map((element, index) => {
        return(   
            <span key={`${index}_card`}>
              <p>{element.code}</p>
              <h2>{element.name}</h2>
              <div>
                <p>{element.price}</p>
                <p className={element.variation.indexOf("-") == -1 ? styles.positive : styles.negative}>{element.variation.trim()}</p>
              </div>
            </span>
        );
      })}
    </div>
  )
}

