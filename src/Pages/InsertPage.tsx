import React from "react";
import CaptureForm from "./Sections/CaptureForm";
import Graph from "react-graph-vis";
import { Stack, IStackProps } from "@fluentui/react/lib/Stack";

function InsertPage() {
  const graph = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text", color: "#e04141" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  };

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
  };

  return (
    <Stack
      horizontal
      style={{ display: "flex", flexFlow: "wrap" }}
      tokens={{ childrenGap: 15 }}
    >
      <CaptureForm />
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ width: 800, height: 600 }}
      />
    </Stack>
  );
}

export default InsertPage;
