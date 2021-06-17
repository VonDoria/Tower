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
    
    const { selectedStocks, setSelectedStocks, fullList } = useContext(StocksContext);

    const [isOpened, setIsOpened] = useState(false);
    
    const options: OptionType[] = Object.keys({...fullList[0]}).map(opt => {
        return { value: opt, label: fullList[0][`${opt}`] }
    });

    return(
        <div className={styles.container}>
            {isOpened ? 
                (<Select
                    components={animatedComponents}
                    defaultValue={[...selectedStocks]}
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