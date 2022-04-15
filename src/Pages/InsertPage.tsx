import React, { useContext, useEffect, useState } from "react";
import CaptureForm from "./Sections/CaptureForm";
import Graph from "react-graph-vis";
import { Stack } from "@fluentui/react/lib/Stack";
import { ApiContext } from "../Hooks/ApiContext";

export function InsertPage() {
  const { APIData } = useContext(ApiContext);

  const [graph, setGraph] = useState({
    nodes: [],
    edges: [],
  });

  useEffect(() => {
    const nodes = [];
    const edges = [];
    const conceptos = new Map();
    let index = 1;
    APIData.forEach((r) => {
      nodes.push({
        id: index,
        label: r["nombre"],
        title: "node 1 tootip text",
        color: r[`tipo`] === "Micro" ? "#9EDDF8" : "#FEC3B1",
      });
      r["conceptos"] && r["conceptos"].forEach((c: any) => {
        if (!conceptos.has(c)) {
          conceptos.set(c, []);
        }
        conceptos.get(c).push(index);
      });
      index++;
    });
    conceptos.forEach((value, key) => {
      nodes.push({
        id: index,
        label: key,
        title: "node 1 tootip text",
      });
      value.forEach((v: any) => {
        edges.push({ from: v, to: index });
      });
      index++;
    });

    setGraph({
      nodes: nodes,
      edges: edges,
    });
  }, [APIData]);

  const events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };

  const options = {
    physics: true,
    layout: {
      randomSeed: 23,
      improvedLayout: true,
    },
    interaction: { hover: true },
  };

  return (
    <Stack
      horizontal
      style={{ display: "flex", flex: 5 }}
      tokens={{ childrenGap: 15 }}
    >
      <CaptureForm />
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ height: "900px" }}
      />
    </Stack>
  );
}
