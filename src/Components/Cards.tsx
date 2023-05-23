import React from "react";
import { Stack } from "@fluentui/react";
import { Card } from "./Card";

export function Cards({ items }) {
  return (
    <Stack horizontal style={{ display: "flex", flexFlow: "wrap" }}>
      {items.map((item, index) => {
        return (
          <Card 
            key={index} 
            row={item}
            />
          )
        }
      )}
    </Stack>
  );
}
