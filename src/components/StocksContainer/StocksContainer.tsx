import { useContext, useEffect, useState } from 'react';
import { StocksContext } from '../../contexts/StocksContext';
import styles from './StocksContainer.module.css';


export default function Home() {

  const { stocks } = useContext(StocksContext);

  return (
    <div className={styles.container}>
      {stocks.map((element, index) => {
        return(   
            <span key={`${index}_card`}>
              <p>{element.code}</p>
              <h2>{element.name}</h2>
              <div>
                <p>{element.price}</p>
                <p className={element.variation.indexOf("-") == -1 ? styles.positive : styles.negative}>&nbsp;{element.variation.trim()}</p>
              </div>
            </span>
        );
      })}
    </div>
  )
}

