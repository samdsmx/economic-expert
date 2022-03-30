import React from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@fluentui/react/lib/TextField";
import { Stack, IStackProps } from "@fluentui/react/lib/Stack";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import styled from "styled-components";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import Graph from "react-graph-vis";
import { InputPill } from "../../Components/InputPill";

const saveData = (data) => {};

const Styles = styled.div`
  padding: 20px;

  h1 {
    border-bottom: 1px solid white;
    color: #3d3d3d;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    padding: 10px;
    text-align: center;
  }

  form {
    background: white;
    border: 1px solid #dedede;
    display: flex;
    flex-direction: column;
    max-width: 650px;
    padding: 0px 50px;
  }

  .error {
    color: red;
    font-family: sans-serif;
    font-size: 12px;
    height: 30px;
  }

  .submitButton {
    background-color: #6976d9;
    color: white;
    margin: 20px 0px;
  }
`;

export function Error({ errors }) {
  return <div className={"error"}>{errors ? errors.message : " "}</div>;
}

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
  };



  const graph = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text", color: "#e04141"  },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" }
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]
  };

  function randomColor() {
    const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  }

  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };

  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000"
    },
    
  };

  return (
    <Stack horizontal style={{ display: "flex", flexFlow: "wrap" }} tokens={{childrenGap: 15}}>
      
      <form
        onSubmit={handleSubmit((data) => {
          saveData(data);
        })}
      > 
        <Stack {...columnProps} >
          <h1>Teoria Economica</h1>
          <TextField label="Nombre" multiline autoAdjustHeight />
          <Dropdown
            placeholder="Selecione una opcion"
            label="Tipo"
            options={[
              { key: `Macro`, text: `Macroeconomia` },
              { key: `Micro`, text: `Microeconomia` },
            ]}
          />
          
          <InputPill label={`Conceptos relacionados`} type={`pill`}/>

          <InputPill label={`Autores`} type={`person`}/>

          <InputPill label={`Referencias`} type={`link`}/>
            
          <Stack horizontal horizontalAlign="space-around" style={{ padding: 20 }}>
            <PrimaryButton text="Guardar" />
            <DefaultButton text="Cancelar" />
          </Stack>
        </Stack>
      </form>

      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ width: 800, height: 600 }} />
    </Stack>
  );
}

export default function CaptureForm() {
  return (
    <Styles>
      <Form />

    </Styles>
  );
}
