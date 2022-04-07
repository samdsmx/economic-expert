import React from "react";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { Persona, PersonaSize } from "@fluentui/react/lib/Persona";
import { Text  } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";
import { Label, Link } from "@fluentui/react";

export function InfoPanel({ isOpen, dismissPanel, item }) {

  return (
    <Panel
      isOpen={isOpen}
      onDismiss={dismissPanel}
      type={PanelType.medium}
      closeButtonAriaLabel="Close"
      headerText={item.nombre}
    >

      <h4 style={{textAlign: 'center'}}>{[item.tipo, ...item.conceptos].join(", ")}</h4>

      <Stack tokens={{ childrenGap: 1 }} wrap style={{paddingBottom:15}} >
        <Label>{`Abstract: `}</Label>
        <Text style={{textAlign: 'justify'}}>{item.descripcion}</Text>
        <Text>{`Año: ${item.year}`}</Text>
      </Stack>

      <Label>{`Autores: `}</Label>
      <Stack tokens={{ childrenGap: 16 }} wrap style={{paddingBottom:20}}>
        {item.autores.map((autor: string) => {
          return <Persona text={autor} size={PersonaSize.size32} />;
        })}
      </Stack>

      <Label>{`Referencias: `}</Label>
      <Stack tokens={{ childrenGap: 10 }} wrap >
        {item.referencias.map((referencia: string) => {
          return (
            <Link
              href={referencia}
              target="_blank"
              key={referencia}
              role="link"
            >
              {referencia}
            </Link>
          );
        })}
      </Stack>

    </Panel>
  );
}
