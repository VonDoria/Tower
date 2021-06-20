import { useContext, useEffect, useState } from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { StocksContext } from '../../contexts/StocksContext';
import styles from './StocksContainer.module.css';


export default function Home() {

  const { stocks } = useContext(StocksContext);

  const [HTML, setHTML] = useState(<></>)

  useEffect(() => {
    setHTML(
              // <ResponsiveMasonry columnsCountBreakPoints={{270: 1, 550: 2, 830: 3, 1050: 4}}>
              //   <Masonry>
              <div className={styles.container}>
                  {stocks.map((element, index) => {
                    return(   
                      <span className={styles.card} key={`${index}_card`}>
                        <p>{element.code}</p>
                        <h2>{element.name}</h2>
                        <div>
                          <p>{parseFloat(element.price).toFixed(3)}</p>
                          <p className={element.variation.includes("-") ? styles.negative : styles.positive}>&nbsp;{parseFloat(element.variation.trim()).toFixed(3)} %</p>
                        </div>
                      </span>
                    );
                  })}
              </div>
              //   </Masonry>
              // </ResponsiveMasonry>
            );
  }, [stocks]);

  return (
      HTML
  )
}

