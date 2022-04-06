import React, { useEffect, useState } from 'react';
import { Stack } from "@fluentui/react";
import { Cards } from "../Components/Cards";
import { InputPill } from "../Components/InputPill";
import { Toggle } from '@fluentui/react/lib/Toggle';
import { useLocalStorageMap } from "../Hooks/UseLocalStorage";

import axios from 'axios';

export function SearchPage() {

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios.get(`https://6244adda7701ec8f72484339.mockapi.io/theory`)
        .then((response) => {
            setAPIData(response.data);
        })
  }, []);

  const [parsedPinsMap, savePins] = useLocalStorageMap('pinned', new Map());
  const [conceptos, setConceptos] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  const _onChange = (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    setViewAll(checked);
  }

  const theories = React.useMemo(() => {
    let filteredTheories = APIData?.filter((row: any) => {
      row['pinStatus'] = parsedPinsMap?.get(row.id) || false;
      if (viewAll && (!conceptos || conceptos.length === 0)) return true;
      if (row['pinStatus']) return true;
      let tempResult = false;
      for (const value of conceptos) {
          tempResult = row.conceptos.includes(value) || row.autores.includes(value) || row.year == value || row.tipo === value  
          if (!tempResult) return false;
      }
      return tempResult;
    }).slice() || [];
    savePins(new Map(parsedPinsMap));
    return filteredTheories;
  },[APIData, conceptos, viewAll]).slice();


  return (
    <React.Fragment>
      <Stack horizontal horizontalAlign="space-between" style={{ padding: `20px` }} tokens={{childrenGap: 20}}>
        <Stack style={{padding: 20, background: 'antiquewhite', height: '100%' }}>
            <Toggle label="Ver todo por default?" onText="Si" offText="No" onChange={_onChange} />
            <InputPill label={`Conceptos relacionados?`} onChange={(newVal) => setConceptos(newVal) }/>
        </Stack>
        <Cards items={theories} savePins={savePins} parsedPinsMap={parsedPinsMap} />
      </Stack>
    </React.Fragment>
  );
}
