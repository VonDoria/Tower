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
            <div key={index} className={styles.card}>
                <div>{element.name}</div>
                <div>{element.code}</div>
                <div>{element.variation}</div>
                <div>{element.price}</div>
            </div>
        );
      })}
    </div>
  )
}

