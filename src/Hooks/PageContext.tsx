import React, { useState } from 'react';

interface PageContextType {
    page: string;
    setPage: ({}) => void;
    model: {};
    selectModel: ({}) => void;
}

export const PageContext = React.createContext<PageContextType | undefined>(undefined);

export function PageProvider(props) {

    const [page, setPage] = useState("search"); 
    const [model, selectModel] = useState({});
    
    return (
        <PageContext.Provider value={{page, setPage, model, selectModel}}>
            {props.children}
        </PageContext.Provider>
    );

}