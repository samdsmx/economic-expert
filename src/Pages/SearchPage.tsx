import React, { useContext, useEffect, useState } from 'react';
import { Stack } from "@fluentui/react";
import { Cards } from "../Components/Cards";
import { InputPill } from "../Components/InputPill";
import { Toggle } from '@fluentui/react/lib/Toggle';
import { PinsContext } from '../Hooks/PinsContext';
import { useLocalStorage } from '../Hooks/UseLocalStorage';
import { ApiContext } from 'Hooks/ApiContext';

export function SearchPage() {
  const {parsedPinsMap, savePins} = useContext(PinsContext);
  const {APIData, loading, error} = useContext(ApiContext);
  const [conceptos, setConceptos] = useState([]);
  const [viewAll, setViewAll] = useLocalStorage('viewAll', false);
  const [theories, setTheories] = useState([]);

  const compareFunction = (a: string, b: string) => {
    if (a === null || a === undefined || a === "" || b === null || b === undefined || b === "" ) {
      return false;
    }
    const x = a.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const y = b.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return x.includes(y) || y.includes(x);
  }

  useEffect(()=>{
    let filteredTheories = APIData?.filter((row: any) => {
      if ((viewAll && false) && (!conceptos || conceptos.length === 0)) return true;
      if (parsedPinsMap.get(row.id)) return true;
      let tempResult = false;
      for (const value of conceptos) {
          tempResult = 
            row.conceptos.some((v) => compareFunction(v,value) || compareFunction(value,v)) || 
            row.autores.some((v) => compareFunction(v,value)) ||
            row.year === value || 
            compareFunction(row.tipo, value) ||
            compareFunction(row.nombre, value);
          if (!tempResult) return false;
      }
      return tempResult;
    }).slice() || [];
    savePins(parsedPinsMap);
    setTheories(filteredTheories);
  },[APIData, conceptos, viewAll]);

  return (
    <React.Fragment>
      <Stack horizontal horizontalAlign="space-between" style={{ padding: `20px` }} tokens={{childrenGap: 20}}>
        <Stack style={{padding: 20, background: 'antiquewhite', height: '100%' }}>
            <Toggle 
              label="Ver todo por default?" 
              onText="Si" offText="No" 
              defaultChecked={viewAll}
              onChange={(ev: React.MouseEvent<HTMLElement>, checked?: boolean) => setViewAll(checked)} />
            <InputPill label={`Conceptos relacionados?`} onChange={(newVal) => setConceptos(newVal) }/>
            <p>{loading && `Cargando...`}</p>
            <p>{error && `Error`}</p>
            <p>{(!error && !loading) && `Ingresa tu consulta`}</p>
        </Stack>
        <Cards items={theories} />
      </Stack>
    </React.Fragment>
  );
}
