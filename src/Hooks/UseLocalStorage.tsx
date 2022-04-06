import React, { useState } from "react";

function replacer(key, value) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
}

function reviver(key, value) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }
  return value;
}

export function useLocalStorageMap(itemName, initialValue) {
  const localStoragePins = localStorage.getItem(itemName);
  const m = JSON.parse(localStoragePins, reviver) || initialValue;

  const [mapItem, setItem] = useState(m);

  const saveItem = (newItem: {}) => {
    const stringifiedItem = JSON.stringify(newItem, replacer);
    localStorage.setItem(itemName, stringifiedItem);
    setItem(JSON.parse(stringifiedItem, reviver));
  };

  return [mapItem, saveItem];
}
