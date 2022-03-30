import React from "react"
import styled from 'styled-components';

export function Menu({page,setPage,items}){

    return (
        <MiMenu>
            {
                items.map((item: { label: string; page: string; icon: React.Component; }, index: any) => (
                    <MenuItem key={index} label={item.label} onClick={()=>setPage(item.page)} hidden={page===item.page} icon={item.icon} />
                ))
            }
        </MiMenu>
    ); 
}

function MenuItem({ label, icon, onClick, hidden }){
    return (
        <React.Fragment>
        { !hidden &&
            <a onClick={onClick}>  
                {React.createElement(icon, {style: { paddingRight: `5px` }} )}
                {label}
            </a>
        }
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
