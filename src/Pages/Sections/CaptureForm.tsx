import React, { useContext, useEffect, useState } from "react";
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
import { Dialog, DialogFooter, IContextualMenuProps, MessageBar, MessageBarType } from "@fluentui/react";
import { ApiContext } from "../../Hooks/ApiContext";
import { useBoolean } from '@fluentui/react-hooks';
import EquationEditor from "equation-editor-react";
import { Label } from '@fluentui/react/lib/Label';

export default function CaptureForm() {
  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
  };

  const { setRefresh } = useContext(ApiContext);
  const { model, selectModel } = useContext(PageContext);
  const [nombre, setNombre] = useState(model[`nombre`] || ``);
  const [teoria, setTeoria] = useState(model[`teoria`] || ``);
  const [descripcion, setDescripcion] = useState(model[`descripcion`] || ``);
  const [year, setYear] = useState(model[`year`] || ``);
  const [tipo, setTipo] = useState(model[`tipo`] || ``);
  const [conceptos, setConceptos] = useState(model[`conceptos`] || []);
  const [autores, setAutores] = useState(model[`autores`] || []);
  const [referencias, setReferencias] = useState(model[`referencias`] || []);
  const [equation, setEquation] = useState(model[`equation`] || ``);

  useEffect(() => {
    setNombre(model[`nombre`] || ``);
    setTeoria(model[`teoria`] || ``);
    setDescripcion(model[`descripcion`] || ``);
    setYear(model[`year`] || ``);
    setTipo(model[`tipo`] || ``);
    setConceptos(model[`conceptos`] || []);
    setAutores(model[`autores`] || []);
    setReferencias(model[`referencias`] || []);
    setEquation(model[`equation`] || ``);
  }, [model]);

  const postData = () => {
    axios
      .post(`https://6244adda7701ec8f72484339.mockapi.io/theory`, {
        nombre,
        teoria,
        tipo,
        descripcion,
        year,
        conceptos,
        autores,
        referencias,
        equation,
      })
      .then(() => {
        setRefresh({});
        selectModel({});
        toggleShowMsg();
        window.setTimeout(()=>{toggleShowMsg();}, 3000);
      });
  };

  const updateData = () => {
    const id = model[`id`];
    axios
      .put(`https://6244adda7701ec8f72484339.mockapi.io/theory/${id}`, {
        nombre,
        teoria,
        tipo,
        descripcion,
        year,
        conceptos,
        autores,
        referencias,
        equation,
      })
      .then(() => {
        setRefresh({});
        toggleShowMsg();
        window.setTimeout(()=>{toggleShowMsg();}, 3000);
      });
  };

  const deleteData = () => {
    const id = model[`id`];
    axios
      .delete(`https://6244adda7701ec8f72484339.mockapi.io/theory/${id}`)
      .then(() => {
        setRefresh({});
        selectModel({});
        toggleHideDialog();
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

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [showMsg, { toggle: toggleShowMsg }] = useBoolean(false);

  return (
    <Styles>
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={{
          title: `Eliminar "${nombre}"`,
          subText: `Esta seguro que quiere borrar el modelo?`,
        }}>
        <DialogFooter>
          <PrimaryButton onClick={deleteData} text="Eliminar" />
          <DefaultButton onClick={toggleHideDialog} text="Cancelar" />
        </DialogFooter>
      </Dialog>
      <form>
        <Stack {...columnProps}>
          <h1 style={{padding: `15px 0 0 0`, margin: 0}}>Modelo Economico</h1>
          <TextField
            label="Nombre del modelo"
            autoAdjustHeight
            value={nombre}
            onChange={(_e, newVal) => setNombre(newVal)}
          />
          <TextField
            label="Teoría económica relacionada"
            autoAdjustHeight
            value={teoria}
            onChange={(_e, newVal) => setTeoria(newVal)}
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
          <Label htmlFor='formula'>{`Formula matemática (Modelo)`}</Label>
          <div id='formula' className='innerSpan' style={{border: `1px solid rgb(96, 94, 92)`, margin: 0 }} >
            <EquationEditor
              value={equation || ``}
              onChange={(newVal) => setEquation(newVal)}
              autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
              autoOperatorNames="sin cos tan"
            />
          </div>

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

          {showMsg && <MessageBar messageBarType={MessageBarType.success} isMultiline={false}>
            {`Cambios guardados con exito!`}
          </MessageBar>}

          <Stack
            horizontal
            horizontalAlign="space-around"
            tokens={{ childrenGap: 10 }}
            style={{ padding: 20 }}
          >
            {Object.keys(model).length === 0 && (
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

            { model[`id`] && <IconButton
              style={{ color: "gray", paddingLeft: 40 }}
              iconProps={{ iconName: "Delete" }}
              onClick={toggleHideDialog} 
            /> }
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
