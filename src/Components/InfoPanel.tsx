import React from "react";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import { Text } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";
import { Label, Link } from "@fluentui/react";
import EquationEditor from "equation-editor-react";
import { isValidHttpUrl } from "./Card";

export function InfoPanel({ isOpen, dismissPanel, item }) {

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={dismissPanel}
      type={PanelType.medium}
      closeButtonAriaLabel="Close"
      headerText={item.nombre}
    >

      <p style={{ margin: 0, }}>{item.teoria || `-`}</p>
      <h4 style={{ textAlign: 'center' }}>{[item.tipo, [item.conceptos && [...item.conceptos]]].join(", ")}</h4>

      <Stack tokens={{ childrenGap: 1 }} style={{ paddingBottom: 15 }} >
        <Label>{`Abstract: `}</Label>
        <Text style={{ textAlign: 'justify' }}>{item.descripcion}</Text>
        <Text>{`Año: ${item.year || '-'}`}</Text>
      </Stack>

      <Stack tokens={{ childrenGap: 1 }} style={{ paddingBottom: 15 }} >
        <Label>{`Formula matemática: `}</Label>
        <EquationEditor
          value={item.equation}
          onChange={() => {}}
          autoCommands="pi theta sqrt sum prod alpha beta gamma rho"
          autoOperatorNames="sin cos tan"
        />
      </Stack>

      <Label>{`Autores: `}</Label>
      {item.autores && <Stack tokens={{ childrenGap: 15 }} style={{ paddingBottom: 20 }}>
        {item.autores.map((autor: string, index) => {
          return (<Persona key={index} text={autor} size={PersonaSize.size32} />);
        })}
      </Stack>}

      <Label>{`Referencias: `}</Label>
      {item.referencias && <Stack tokens={{ childrenGap: 10 }} >
        {item.referencias.map((referencia: string, index) => {
          let url = referencia;
          if (!isValidHttpUrl(referencia)){
            url = `http://google.com/search?q="${referencia}"`;
          }
          return (
            <Link href={url} key={index} target="_blank" role="link" >
              {referencia}
            </Link>
          );
        })}
      </Stack>}

    </Panel>
  );
}
