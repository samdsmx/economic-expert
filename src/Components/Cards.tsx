import React from "react";
import { Stack } from "@fluentui/react";
import { Card } from "./Card";

export function Cards({ items, savePins, parsedPinsMap }) {
  return (
    <Stack horizontal style={{ display: "flex", flexFlow: "wrap" }}>
      {items.map((item, index) => {
        return (
          <Card 
            key={index} 
            id={item.id}
            title={item.nombre} 
            descripcion={item.descripcion}
            year={item.year}
            referencias={item.referencias}
            tipo={item.tipo}
            conceptos={item.conceptos}
            autores={item.autores} 
            savePins={savePins}
            parsedPinsMap={parsedPinsMap}
            />
          )
        }
      )}
    </Stack>
  );
}
