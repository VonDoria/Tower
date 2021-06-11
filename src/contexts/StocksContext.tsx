import { createContext } from "react";

const StocksContext = createContext({});

export function StocksProvider({ children }){
    return(
        <StocksProvider.Povider value={{}}>
            { children }
        </StocksProvider.Povider>
    );    
}