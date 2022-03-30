import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { Pill } from "./Pill";
import { Label } from '@fluentui/react/lib/Label';
import { Link, Stack } from "@fluentui/react";
import styled from "styled-components";
import { useId } from "@fluentui/react-hooks";
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from '@fluentui/react/lib/Persona';

export function InputPill({label="", type="pill"}) {

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

/*
      { type==="pill" && <Stack horizontal style={{ display: "flex", flexFlow: "wrap" }}>
        {conceptos.map((item, index) => (
          <Pill
            key={`${type}${index}`}
            category={item}
            type={type}
            removeFilter={deleteConcept}
          />
        ))}
      </Stack> }

      { type==="link" && <Stack>
        {conceptos.map((item, index) => (
          <Link
            key={`link${index}`}
            role="link"
            title={item}
            target="_blank"
            href={item}
          >{item}</Link>
        ))}
      </Stack> }

      { type==="person" && <Stack>
        {conceptos.map((item, index) => (
          <Persona
            text={item}
            key={`person${index}`}
            size={PersonaSize.size24}
            presence={PersonaPresence.none}
            imageAlt="Annie Ried, status is unknown"
            />
        ))}
      </Stack> }
*/

const HeaderSearch = styled.div`
  display: flex;
  flex-grow: 0;
  height: 35px;
  border: 1px solid !important;
  border-radius: 4px;

  overflow: hidden;

  
  background-color: white;
  :focus-within {
    box-shadow: 0 0 0 3px #f90;
  }
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
