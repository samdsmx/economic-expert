import { AnySoaRecord } from 'dns';
import React from 'react';
import { useAPIData } from './UseAPIData';

interface APIContextType {
    APIData: AnySoaRecord[];
    loading: boolean;
    error: boolean | string;
}

export const ApiContext = React.createContext<APIContextType | undefined>(undefined);

export function ApiProvider(props) {

    const {APIData, loading, error} = useAPIData();

    return (
        <ApiContext.Provider value={{APIData, loading, error}}>
            {props.children}
        </ApiContext.Provider>
    );

}