import React from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";
import { Pill } from "../Components/Pill"
import { Stack } from "@fluentui/react";
import { Cards } from "../Components/Cards";

export function SearchPage() {

  const [conceptos, setConceptos] = React.useState([]);
  const [concepto, setConcepto] = React.useState('');

  const deleteConcept = (valor) => {
    setConceptos(conceptos.filter(val => val !== valor));
  };

  const addConcept = () => {
    conceptos.push(concepto);
    setConceptos(conceptos.slice());
  };

  const onChangeConcepto = (e) => {
    setConcepto(e.target.value);
  };

  const theories = ["Alice dfjl dfgl fdgkd fls aaa aaa aaa dlfgkj dfglkjdfgfd sdfs se sdfsf", "Bob", "Eve", "Alice", "Bob", "Eve", "Alice", "Bob", "Eve", "Alice", "Bob", "Eve"];

  return (
    <React.Fragment>
      <Stack horizontal style={{ padding: `20px` }}>
        
        <Stack style={{ width: `600px`  }}>
          <HeaderSearch>
            <HeaderSearchInput type="text" value={concepto} onChange={onChangeConcepto}></HeaderSearchInput>
            <HeaderSearchIconContainer>
              <AddIcon onClick={addConcept} />
            </HeaderSearchIconContainer>
          </HeaderSearch>
          <Stack horizontal style={{ display: "flex", flexFlow: "wrap" }}>
            {conceptos.map((item, index) => (
              <Pill
                  id={`${index}`}
                  key={`pill${index}`}
                  category={item}
                  removeFilter={deleteConcept}
                />
            ))}
          </Stack>
        </Stack>

        <Cards items={theories} />

      </Stack>

    </React.Fragment>
  );
}

const HeaderSearch = styled.div`
  display: flex;
  flex-grow: 0;
  height: 40px;

  border-radius: 4px;

  overflow: hidden;

  margin: 20px 50px 5px 50px;
  max-width:400px;
  background-color: white;
  :focus-within {
    box-shadow: 0 0 0 3px #f90;
  }
`;

const HeaderSearchInput = styled.input`
  flex-grow: 1;
  border: 0;
  :focus {
    outline: none;
  }
`;

const HeaderSearchIconContainer = styled.div`
  background-color: #febd69;
  width: 45px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;