import React, { useEffect, useState } from 'react';
import { Stack } from "@fluentui/react";
import { Cards } from "../Components/Cards";
import { InputPill } from "../Components/InputPill";
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Text } from '@fluentui/react/lib/Text';

import axios from 'axios';
import styled from 'styled-components';

export function SearchPage() {

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios.get(`https://6244adda7701ec8f72484339.mockapi.io/theory`)
        .then((response) => {
            setAPIData(response.data);
        })
  }, []);

  const [conceptos, setConceptos] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  const _onChange = (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    setViewAll(checked);
  }

  const theories = React.useMemo(() => {
    if (!viewAll) { return []; }
    let filteredTheories =
      APIData?.filter((row: any) => {
        let tempResult = false;
        for (const value of conceptos) {
            tempResult = row.conceptos.includes(value) || row.autores.includes(value) || row.year == value || row.tipo === value
            if (!tempResult) return false;
        }
        return true;
      })
      .slice() || [];
    return filteredTheories;

  },[APIData, conceptos, viewAll]);


  return (
    <React.Fragment>
      <Stack horizontal horizontalAlign="space-between" style={{ padding: `20px` }} tokens={{childrenGap: 20}}>
        <Stack style={{padding: 20, background: 'antiquewhite', height: '100%' }}>
            <Toggle label="Ver todo por default?" onText="Si" offText="No" onChange={_onChange} />
            <InputPill label={`Conceptos relacionados?`} onChange={(newVal) => setConceptos(newVal) }/>
        </Stack>
        <Cards items={theories} />
      </Stack>
    </React.Fragment>
  );
}
