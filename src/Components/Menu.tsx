import { PageContext } from "../Hooks/PageContext";
import React, { useContext } from "react";
import styled from "styled-components";
import { ActionButton } from "@fluentui/react";

export function Menu({ items }) {
  const { page, setPage } = useContext(PageContext);

  return (
    <MiMenu>
      {items.map(
        (
          item: {
            label: string;
            page: string;
            icon: React.Component;
            specialAction: (arg0: any) => void;
          },
          index: any
        ) => (
          <MenuItem
            key={index}
            label={item.label}
            hidden={page === item.page}
            icon={item.icon}
            onClick={() => {
              setPage(item.page);
              if (item.specialAction) {
                item.specialAction({});
              }
            }}
          />
        )
      )}
    </MiMenu>
  );
}

function MenuItem({ label, icon, onClick, hidden }) {
  return (
    <React.Fragment>
      {!hidden && (
        <ActionButton onClick={onClick} style={{ color: `white` }} >
          {React.createElement(icon, { style: { paddingRight: `5px` } })}
          {label}
        </ActionButton>
      )}
    </React.Fragment>
  );
}

const MiMenu = styled.div`
  display: flex;
  margin-right: 10px;
  justify-content: space-between;
  a {
    display: flex;
    align-items: center;
    padding-right: 9px;
    color: white;
    text-decoration: none;
    cursor: pointer;
  }
  a:hover {
    text-decoration: underline;
  }
`;
