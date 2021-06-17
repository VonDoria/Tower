import { useContext, useEffect, useState } from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { StocksContext } from '../../contexts/StocksContext';
import styles from './StocksContainer.module.css';


export default function Home() {

  const { stocks } = useContext(StocksContext);

  const [HTML, setHTML] = useState(<></>)

  useEffect(() => {
    setHTML(
              <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 1000: 3, 1200: 4}}>
                <Masonry>
                  {stocks.map((element, index) => {
                    return(   
                      <span className={styles.card} key={`${index}_card`}>
                        <p>{element.code}</p>
                        <h2>{element.name}</h2>
                        <div>
                          <p>{element.price}</p>
                          <p className={element.variation.includes("-") ? styles.positive : styles.negative}>&nbsp;{element.variation.trim()}</p>
                        </div>
                      </span>
                    );
                  })}
                </Masonry>
              </ResponsiveMasonry>
            );
  }, [stocks]);

  return (
    <div className={styles.container}>
      {HTML}
    </div>
  )
}

