import React from 'react';
import styled, { css }from 'styled-components';
import { breakpointsMedia } from '../../../../theme/utils/breakpointsMedia';
import { TextStyleVariants } from '../../../foundation/Text';

const ProjetoWrapper = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #ffffff;
    width:200px;
    height: 300px;
    margin: 10px 10px 10px 10px;

    a{
        text-align: center;
        display: block;
        text-decoration: none;
        color: #FFFFFF;
        transition: 200ms ease-in-out;
        ${breakpointsMedia({
        xs: css`
        ${TextStyleVariants.smallestException}
        `,
        md: css`
        ${TextStyleVariants.paragraph1}
        `,
    })}
        &:hover,
        &:focus {
        font-weight: 500;
        color: #00ffff;
        
        }
    }
`;

export default ProjetoWrapper;