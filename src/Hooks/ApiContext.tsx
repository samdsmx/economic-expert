import React from 'react';
import { useAPIData } from './UseAPIData';

interface APIContextType {
    APIData: any[];
    loading: boolean;
    error: boolean | string;
    setRefresh: (arg0: any) => void;
}

export const ApiContext = React.createContext<APIContextType | undefined>(undefined);

export function ApiProvider(props) {

    const {APIData, loading, error, setRefresh} = useAPIData();

    return (
        <ApiContext.Provider value={{APIData, loading, error, setRefresh}}>
            {props.children}
        </ApiContext.Provider>
    );

}