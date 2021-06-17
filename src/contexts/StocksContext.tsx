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

        // fetch(window.location.origin + '/api/cotationsApi?type=stocks')
        // .then(res => res.json())
        // .then(res => setStocks(res.data));

        // fetch(window.location.origin + '/api/cotationsApi?type=coin&filter=')
        // .then(res => res.json())
        // .then(res => setCoin(res.data));
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

    function requestCards(){
        if(selectedStocks != []){

            const coinsList = selectedStocks.filter(code => code.value.indexOf("-") != -1).map(c => c.value);
            const stocksList = selectedStocks.filter(code => code.value.indexOf("-") == -1).map(c => c.value);
            
            setStocks([])
            
            fetch(window.location.origin + '/api/cotationsApi?type=stocks&filter=' + JSON.stringify(stocksList))
            .then(res => res.json())
            .then(res => setStocks([...stocks, ...res.data]));
            
            fetch(window.location.origin + '/api/cotationsApi?type=coin&filter=' + JSON.stringify(coinsList))
            .then(res => res.json())
            .then(res => setStocks([...stocks, ...res.data]));
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