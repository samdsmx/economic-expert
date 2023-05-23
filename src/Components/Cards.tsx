import React from "react";
import { Stack } from "@fluentui/react";
import { Card } from "./Card";

export function Cards({ items }) {
  console.log(`items`);
  console.log(items);
  return (
    <Stack horizontal style={{ display: "flex", flexFlow: "wrap" }}>
      {items.map((item, index) => {
        console.log(index);
        console.log(item);
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
