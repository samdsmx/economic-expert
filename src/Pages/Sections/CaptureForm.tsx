import React, { useState } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { Stack, IStackProps } from "@fluentui/react/lib/Stack";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import styled from "styled-components";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { InputPill } from "../../Components/InputPill";
import axios from "axios";

export default function CaptureForm() {
  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
  };

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [year, setYear] = useState("");
  const [tipo, setTipo] = useState("");
  const [conceptos, setConceptos] = useState([]);
  const [autores, setAutores] = useState([]);
  const [referencias, setReferencias] = useState([]);

  const postData = () => {
    axios
      .post(`https://6244adda7701ec8f72484339.mockapi.io/theory`, {
        nombre,
        tipo,
        descripcion,
        year,
        conceptos,
        autores,
        referencias,
      })
      .then((e) => {
        console.log(`termino de salvar`);
        console.log(e);
      });
  };

  return (
    <Styles>
          <form>
    
        <Stack {...columnProps}>
          <h1>Modelo Economico</h1>
          <TextField
            label="Nombre"
            multiline
            autoAdjustHeight
            onChange={(_e, newVal) => setNombre(newVal)}
          />
          <Dropdown
            placeholder="Selecione una opcion"
            label="Tipo"
            onChange={(_e, newVal: { key: string; text: string }) =>
              setTipo(newVal.key)
            }
            options={[
              { key: `Macro`, text: `Macroeconomia` },
              { key: `Micro`, text: `Microeconomia` },
            ]}
          />

          <TextField
            label="Descripcion"
            multiline
            autoAdjustHeight
            onChange={(_e, newVal) => setDescripcion(newVal)}
          />

          <TextField
            label={`Año`}
            autoAdjustHeight
            onChange={(_e, newVal) => setYear(newVal)}
          />

          <InputPill
            label={`Conceptos relacionados`}
            type={`pill`}
            onChange={(newVal) => setConceptos(newVal)}
          />

          <InputPill
            label={`Autores`}
            type={`person`}
            onChange={(newVal) => setAutores(newVal)}
          />

          <InputPill
            label={`Referencias`}
            type={`link`}
            onChange={setReferencias}
          />

          <Stack
            horizontal
            horizontalAlign="space-around"
            style={{ padding: 20 }}
          >
            <PrimaryButton text="Guardar" onClick={postData} />
            <DefaultButton text="Cancelar" type="reset" />
          </Stack>
        </Stack>
        </form>

    </Styles>
  );
}

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
