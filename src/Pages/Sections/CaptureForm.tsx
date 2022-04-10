import React, { useContext, useState } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { Stack, IStackProps } from "@fluentui/react/lib/Stack";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import styled from "styled-components";
import {
  DefaultButton,
  IconButton,
  PrimaryButton,
} from "@fluentui/react/lib/Button";
import { InputPill } from "../../Components/InputPill";
import axios from "axios";
import { PageContext } from "../../Hooks/PageContext";
import { IContextualMenuProps } from "@fluentui/react";
import { ApiContext } from "../../Hooks/ApiContext";

export default function CaptureForm() {
  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
  };

  const { setRefresh } = useContext(ApiContext);
  const { model } = useContext(PageContext);
  const [nombre, setNombre] = useState(model[`nombre`] || ``);
  const [descripcion, setDescripcion] = useState(model[`descripcion`] || ``);
  const [year, setYear] = useState(model[`year`] || ``);
  const [tipo, setTipo] = useState(model[`tipo`] || ``);
  const [conceptos, setConceptos] = useState(model[`conceptos`] || []);
  const [autores, setAutores] = useState(model[`autores`] || []);
  const [referencias, setReferencias] = useState(model[`referencias`] || []);

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
      .then(() => {
        setRefresh({});
      });
  };

  const updateData = () => {
    const id = model[`id`];
    axios
      .put(`https://6244adda7701ec8f72484339.mockapi.io/theory/${id}`, {
        nombre,
        tipo,
        descripcion,
        year,
        conceptos,
        autores,
        referencias,
      })
      .then(() => {
        setRefresh({});
      });
  };

  const menuProps: IContextualMenuProps = {
    items: [
      {
        key: "saveAsNew",
        text: "Guardar como nuevo",
        iconProps: { iconName: "SaveAs" },
        onClick: postData,
      },
    ],
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
            value={nombre}
            onChange={(_e, newVal) => setNombre(newVal)}
          />
          <Dropdown
            placeholder="Selecione una opcion"
            label="Tipo"
            defaultSelectedKey={tipo}
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
            value={descripcion}
            onChange={(_e, newVal) => setDescripcion(newVal)}
          />

          <TextField
            label={`Año`}
            autoAdjustHeight
            value={year}
            onChange={(_e, newVal) => setYear(newVal)}
          />

          <InputPill
            label={`Conceptos relacionados`}
            type={`pill`}
            value={conceptos}
            onChange={(newVal) => setConceptos(newVal)}
          />

          <InputPill
            label={`Autores`}
            type={`person`}
            value={autores}
            onChange={(newVal) => setAutores(newVal)}
          />

          <InputPill
            label={`Referencias`}
            type={`link`}
            value={referencias}
            onChange={setReferencias}
          />

          <Stack
            horizontal
            horizontalAlign="space-around"
            tokens={{ childrenGap: 10 }}
            style={{ padding: 20 }}
          >
            {Object.keys(model).length == 0 && (
              <PrimaryButton text="Guardar" onClick={postData} />
            )}

            {Object.keys(model).length > 0 && (
              <PrimaryButton
                text="Modificar"
                split
                onClick={updateData}
                menuProps={menuProps}
              />
            )}

            <DefaultButton
              text="Cancelar"
              type="reset"
            />

            <IconButton
              style={{ color: "gray", paddingLeft: 40 }}
              iconProps={{ iconName: "Delete" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            />
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
