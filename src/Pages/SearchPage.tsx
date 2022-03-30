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
}, [])

  return (
    <React.Fragment>
      <Stack  horizontal horizontalAlign="space-between" style={{ padding: `20px` }} tokens={{childrenGap: 20}}>
        <InputPill />
        <Cards items={APIData} />
      </Stack>
    </React.Fragment>
  );
}

