import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Pill } from "./Pill";
import { Label } from '@fluentui/react/lib/Label';
import { Stack } from "@fluentui/react";
import styled from "styled-components";
import { useId } from "@fluentui/react-hooks";

export function InputPill({ label="", value=[], type="pill", onChange=(_newVal: string[])=>{} }) {

    const [conceptos, setConceptos] = React.useState(value || []);
    const [concepto, setConcepto] = React.useState('');
  
    const deleteConcept = (valor) => {
      const newConceptos = conceptos.filter(val => val !== valor).slice();
      setConceptos(newConceptos);
      onChange(newConceptos);
    };
  
    const addConcept = () => {
      conceptos.push(concepto);
      const newConceptos = conceptos.slice();
      setConceptos(newConceptos);
      onChange(newConceptos);
    };
  
    const clickPress = (event) => {
      if (event.charCode === 13) {
        addConcept();
      }
    }
  
    const onChangeConcepto = (e) => {
      setConcepto(e.target.value);
    };

  const inputId = useId("input");

  const horizontalStyle = {
    paddingTop: `10px`, display: "flex", flexFlow: "wrap"
  }

  const verticalStyle = {
    paddingTop: `10px`
  }

  return (
    <Stack >
      <Label htmlFor={inputId}>{label}</Label>  
      <HeaderSearch>
        <HeaderSearchInput
          id={inputId}
          type="text"
          value={concepto}
          onKeyPress={clickPress}
          onChange={onChangeConcepto}
        ></HeaderSearchInput>
        <HeaderSearchIconContainer>
          <AddIcon onClick={addConcept} />
        </HeaderSearchIconContainer>
      </HeaderSearch>

      
      <Stack horizontal={type===`pill`} style={ type===`pill` ? horizontalStyle : verticalStyle } tokens={{childrenGap: 10}} >
        {conceptos.map((item, index) => (
          <Pill
            key={`${type}${index}`}
            category={item}
            type={type}
            removeFilter={deleteConcept}
          />
        ))}
      </Stack>

    </Stack>
  );
}

const HeaderSearch = styled.div`
  display: flex;
  flex-grow: 0;
  height: 35px;
  border: 1px solid !important;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
`;

const HeaderSearchInput = styled.input`
  flex-grow: 1;
  font-size: 14px;
  padding: 6px 8px;
  font-weight: 400;
  color: rgb(50, 49, 48);
  line-height: 17px;
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
