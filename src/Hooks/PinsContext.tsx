import React from 'react';
import { useLocalStorage } from './UseLocalStorage';

interface PinContextType {
    parsedPinsMap: any;
    savePins: ({}) => void;
}

export const PinsContext = React.createContext<PinContextType | undefined>(undefined);

export function PinsProvider(props) {

    const [parsedPinsMap, savePins] = useLocalStorage('pinned', new Map());

    return (
        <PinsContext.Provider value={{
            parsedPinsMap,
            savePins, 
        }}>
            {props.children}
        </PinsContext.Provider>
    );

}