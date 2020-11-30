import React from 'react';
import Dropdown from 'components/Dropdown';
import styled from '@emotion/styled';

const DropdownWithLabel = (props) => {
    const DropdownContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1rem;
        & > * {
            margin: 1rem;
        }
    `;

    return (
        <DropdownContainer>
            <div>{props.label}:</div>
            <Dropdown
                className="dropdown"
                style={{
                    width: props.width
                }}
                selected={props.selected}
                options={props.options}
                onClick={(val) => props.onClick(val)}
                onOpenChange={props.setOverflowHidden}
            />
        </DropdownContainer>
    );
};

export default DropdownWithLabel;
