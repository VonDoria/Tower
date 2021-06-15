import { createContext, ReactNode, useEffect, useState } from "react";
import { OptionType } from "../components/StocksHeader/StocksHeader";

interface StocksProviderProps{
    children: ReactNode;
}

interface StocksContextData{
    stocks: CardDate[];
    setSelectedStocks: (selectedStocks: OptionType[]) => void;
    selectedStocks: OptionType[];
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
    const [selectedStocks, setSelectedStocks] = useState([]);

    useEffect(() => {
        loadListFromLS();
    }, []);

    useEffect(() => {
        var strList = JSON.stringify(selectedStocks);
        localStorage.setItem("selectedStocks", strList);
        
        fetch(window.location.origin + '/api/cotationsApi?type=list')
        .then(res => res.json())
        .then(res => setStocks(res.data));
    }, [selectedStocks]);

    function loadListFromLS(){
        if(!!localStorage.getItem("selectedStocks")){
            var strList = localStorage.getItem("selectedStocks");
        }else{
            var strList = "[]"
        }
        setSelectedStocks(JSON.parse(strList));
    }

    return(
        <StocksContext.Provider value={{
            stocks,
            setSelectedStocks,
            selectedStocks
        }}>
            { children }
        </StocksContext.Provider>
    );    
}