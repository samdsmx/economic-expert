import React from "react";

import { Stack } from "@fluentui/react";
import { Cards } from "../Components/Cards";
import { InputPill } from "../Components/InputPill";

export function SearchPage() {


  const theories = ["Alice dfjl dfgl fdgkd fls aaa aaa aaa dlfgkj dfglkjdfgfd sdfs se sdfsf", "Bob", "Eve", "Alice", "Bob", "Eve", "Alice", "Bob", "Eve", "Alice", "Bob", "Eve"];

  return (
    <React.Fragment>
      <Stack  horizontal horizontalAlign="space-between" style={{ padding: `20px` }} tokens={{childrenGap: 20}}>
        <InputPill />
        <Cards items={theories} />
      </Stack>
    </React.Fragment>
  );
}

