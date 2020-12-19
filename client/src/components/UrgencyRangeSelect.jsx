import React from 'react';
import Dropdown from 'components/Dropdown';
import styled from '@emotion/styled';

const FilterBarLabel = styled.div`
    margin-right: 1rem;
`;

const DropdownContainer = styled.div`
    display: flex;
    & > * {
        margin: 0 0.3rem;
    }
`;

const UrgencyRangeSelect = (props) => {
    const { onChange, urgency } = props;

    const setMinUrgency = (min) => {
        if (min > urgency.max) onChange(min, min);
        else onChange(min, urgency.max);
    };

    const setMaxUrgency = (max) => {
        if (max < urgency.min) onChange(max, max);
        else onChange(urgency.min, max);
    };

    return (
        <div style={props.style}>
            <FilterBarLabel>Urgency Range:</FilterBarLabel>
            <DropdownContainer>
                <Dropdown
                    width={2}
                    className="minUrgencyDropdown"
                    selected={urgency.min}
                    options={[1, 2, 3, 4, 5]}
                    onClick={(val) => setMinUrgency(val)}
                    onOpenChange={props.setOverflowHidden}
                />
                <div style={{ paddingLeft: '0.2rem' }}>{'..'}</div>
                <Dropdown
                    width={2}
                    className="maxUrgencyDropdown"
                    selected={urgency.max}
                    options={[1, 2, 3, 4, 5]}
                    onClick={(val) => setMaxUrgency(val)}
                    onOpenChange={props.setOverflowHidden}
                />
            </DropdownContainer>
        </div>
    );
};

export default UrgencyRangeSelect;
