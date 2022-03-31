import React, { useEffect, useState } from 'react';
import { Stack } from "@fluentui/react";
import { Cards } from "../Components/Cards";
import { InputPill } from "../Components/InputPill";
import axios from 'axios';

export function SearchPage() {

  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios.get(`https://6244adda7701ec8f72484339.mockapi.io/theory`)
        .then((response) => {
            setAPIData(response.data);
        })
  }, []);

  const [conceptos, setConceptos] = useState([]);

  const theories = React.useMemo(() => {
    console.log(conceptos);

    if (!conceptos || conceptos.length == 0) { return []; }

    let filteredTheories =
      APIData?.filter((row: any) => {
        console.log(row);

        let tempResult = false;
        for (const value of conceptos) {
            tempResult = row.conceptos.includes(value) || row.autores.includes(value) || row.year == value || row.tipo === value
            if (!tempResult) return false;
        }
        return true;
      })
      .slice() || [];

    return filteredTheories;

  },[APIData, conceptos]);


  return (
    <React.Fragment>
      <Stack horizontal horizontalAlign="space-between" style={{ padding: `20px` }} tokens={{childrenGap: 20}}>
        <InputPill onChange={(newVal) => { 
          console.log(`onChange`);
          console.log(newVal);
          setConceptos(newVal); }}/>
        <Cards items={theories} />
      </Stack>
    </React.Fragment>
  );
}

