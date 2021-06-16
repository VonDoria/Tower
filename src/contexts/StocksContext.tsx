import { createContext, ReactNode, useEffect, useState } from "react";
import { OptionType } from "../components/StocksHeader/StocksHeader";

interface StocksProviderProps{
    children: ReactNode;
}

interface StocksContextData{
    stocks: CardDate[];
    coin: CardDate[];
    selectedStocks: OptionType[];
    selectedCoin: OptionType[];
    setSelectedStocks: (selectedStocks: OptionType[]) => void;
    setSelectedCoin: (selectedCoin: OptionType[]) => void;
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
    const [coin, setCoin] = useState([]);
    const [fullList, setFullList] = useState([]);
    const [selectedStocks, setSelectedStocks] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState([]);


    useEffect(() => {
        loadListFromLS();

        fetch(window.location.origin + '/api/cotationsApi?type=all')
        .then(res => res.json())
        .then(res => setFullList(res.data));

        // fetch(window.location.origin + '/api/cotationsApi?type=stocks')
        // .then(res => res.json())
        // .then(res => setStocks(res.data));

        // fetch(window.location.origin + '/api/cotationsApi?type=coin&filter=')
        // .then(res => res.json())
        // .then(res => setCoin(res.data));
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedStocks", JSON.stringify(selectedStocks));
    }, [selectedStocks]);

    useEffect(() => {
        localStorage.setItem("selectedCoin", JSON.stringify(selectedCoin));
    }, [selectedCoin]);

    function loadListFromLS(){
        if(!!localStorage.getItem("selectedStocks")){
            var strStocksList = localStorage.getItem("selectedStocks");
        }else{
            var strStocksList = "[]"
        }
        setSelectedStocks(JSON.parse(strStocksList));
        if(!!localStorage.getItem("selectedCoin")){
            var strCoinList = localStorage.getItem("selectedCoin");
        }else{
            var strCoinList = "[]"
        }
        setSelectedCoin(JSON.parse(strCoinList));
    }

    return(
        <StocksContext.Provider value={{
            stocks,
            coin,
            selectedStocks,
            selectedCoin,
            setSelectedStocks,
            setSelectedCoin,
            fullList
        }}>
            { children }
        </StocksContext.Provider>
    );    
}