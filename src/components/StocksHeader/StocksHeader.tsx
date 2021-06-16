import { useContext, useEffect, useState } from 'react';
import { StocksContext } from '../../contexts/StocksContext';
import { FaPlus } from 'react-icons/fa';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import styles from './StocksHeader.module.css';

export interface OptionType{
    value: string;
    label: string;
}

const animatedComponents = makeAnimated();

export default function StocksHeader(){
    
    const { stocks, coin, selectedStocks, selectedCoin, setSelectedStocks, setSelectedCoin, fullList } = useContext(StocksContext);

    const [isOpened, setIsOpened] = useState(false);
    
    const options: OptionType[] = [...Object.keys(fullList)].map(opt => {
        return { value: fullList[opt].code, label: fullList[opt].code }
    });

    return(
        <div className={styles.container}>
            {isOpened ? 
                (<Select
                    components={animatedComponents}
                    defaultValue={[...selectedStocks, ...selectedCoin]}
                    closeMenuOnSelect={false}
                    isMulti
                    options={options}
                    onMenuClose={() => setIsOpened(wasOpened => !wasOpened)}
                    onChange={setSelectedStocks}
                />) :
                (<span id="button" onClick={() => setIsOpened(wasOpened => !wasOpened)}><FaPlus size={15} /></span>) 
            }
        </div>
    );
}