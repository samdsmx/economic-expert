import React from 'react';
import styled from 'styled-components';
import Logo from '../../Resources/logoLine.png';
import { Menu } from '../../Components/Menu';
import InfoIcon from '@material-ui/icons/Info';
import SchoolIcon from '@material-ui/icons/School';

export function Header({ page, setPage }) {

    const menuItems = [
        {label: `Search`, page: `search`, icon: SchoolIcon },
        {label: `Knowledge Base`, page: `insert`, icon: SchoolIcon },
        {label: `Acerca de`, page: `about`, icon: InfoIcon },
    ];

    return (
        <Container>
            <HeaderLogo>
                <img src={Logo} alt=""/>             
            </HeaderLogo>
            <Menu page={page} setPage={setPage} items={menuItems}/>
        </Container>
    );
}

const Container = styled.div`
    height: 60px;
    background-color: #0F1111;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
`;

const HeaderLogo = styled.div`
    img {
        width: 300px;
        margin-top: 6px;
        margin-left: 11px;
    }
`;

