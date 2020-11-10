import React from 'react';
import Checkbox from 'components/Checkbox';

const FilterToggle = (props) => {
    const elStyle = { margin: '0 0.3rem', borderRadius: '100%' };
    return (
        <div style={{ ...props.style, padding: '0.5rem' }}>
            <div className="filterBarLabel" style={elStyle}>
                Active:
            </div>
            <Checkbox
                type="checkbox"
                className="inputCheckbox"
                style={elStyle}
                onChange={() =>
                    props.setFilterOptions({
                        ...props.filterOptions,
                        active: !props.filterOptions.active
                    })
                }
                default={props.filterOptions.active}
            />
        </div>
    );
};

export default FilterToggle;
