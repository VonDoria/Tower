import { createContext, ReactNode, useEffect, useState } from "react";
import { OptionType } from "../components/StocksHeader/StocksHeader";

interface StocksProviderProps{
    children: ReactNode;
}

interface StocksContextData{
    stocks: CardDate[];
    selectedStocks: OptionType[];
    setSelectedStocks: (selectedStocks: OptionType[]) => void;
    fullList: any;
}

interface CardDate{
    code: string;
    name: string;
    price: string;
    variation: string;
}

export const StocksContext = createContext({} as StocksContextData);

export function StocksProvider({ children }: StocksProviderProps){

    const [stocks, setStocks] = useState([]);
    const [fullList, setFullList] = useState([]);
    const [selectedStocks, setSelectedStocks] = useState([]);


    useEffect(() => {
        loadListFromLS();

        fetch(window.location.origin + '/api/cotationsApi?type=all')
        .then(res => res.json())
        .then(res => setFullList(res.data));
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedStocks", JSON.stringify(selectedStocks));
        requestCards();
    }, [selectedStocks]);

    function loadListFromLS(){
        if(!!localStorage.getItem("selectedStocks")){
            var strStocksList = localStorage.getItem("selectedStocks");
        }else{
            var strStocksList = "[]"
        }
        setSelectedStocks(JSON.parse(strStocksList));
    }

    async function requestCards(){
        if(selectedStocks != []){
            
            let coinsList = [];
            let stocksList = [];
            selectedStocks.map(code => code.value.includes("-") ? coinsList.push(code.value) : stocksList.push(code.value));
                        
            const resSData = await fetch(window.location.origin + '/api/cotationsApi?type=stocks&filter=' + JSON.stringify(stocksList));
            const resSJson = await resSData.json();
            const stocksCards = resSJson.data;
            
            const resCData = await fetch(window.location.origin + '/api/cotationsApi?type=coin&filter=' + JSON.stringify(coinsList));
            const resCJson = await resCData.json();
            const coinCards = resCJson.data;

            const valid = validateResult([...stocksCards, ...coinCards]);
            if(valid){
                setStocks([...stocksCards, ...coinCards]);
            }else{
                // console.error("")
            }
        }
    }

    function validateResult(list: CardDate[]){
        const error = list.filter(card => card.price == "NaN");
        if(error.length == 0){
            return true;
        }else{
            return false;
        }
    }

    return(
        <StocksContext.Provider value={{
            stocks,
            selectedStocks,
            setSelectedStocks,
            fullList
        }}>
            { children }
        </StocksContext.Provider>
    );    
}