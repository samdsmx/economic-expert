import React from "react";
import { Stack } from "@fluentui/react";
import { Card } from "./Card";

export function Cards({ items }) {
  return (
    <Stack horizontal style={{ display: "flex", flexFlow: "wrap" }}>
      {items.slice(0,5).map((item, index) => {
        console.log(`items`);
        console.log(items);
        return (
          <Card 
            key={index} 
            item={item}
            />
          )
        }
      )}
    </Stack>
  );
}
