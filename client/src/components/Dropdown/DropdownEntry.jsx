import React, { useEffect, useState, useContext, useRef } from 'react';
import ThemeContext from 'context/ThemeContext';
import { capitalizeFirstLetter } from 'processing/utility';
import {
    dropdownBoxStyle,
    getDropdownTextStyle,
    optionBackgroundStyle,
    getHoveredStyle,
    getDefaultStyle
} from 'styling/dropdown';

const DropdownEntry = (props) => {
    const entryRef = useRef(null);
    const [hovered, setHovered] = useState();
    const {
        listOpen,
        onClick,
        setListOpen,
        value,
        hoverEnabled,
        selected
    } = props;
    const themeColor = useContext(ThemeContext);

    useEffect(() => {
        //check if mouseover with no movement once hover enabled
        if (
            entryRef &&
            entryRef.current &&
            entryRef.current.querySelector(':hover')
        ) {
            setHovered(true);
        }
    }, [hoverEnabled]);
    return (
        <div
            ref={entryRef}
            className="dropdownOption"
            style={{
                ...dropdownBoxStyle(listOpen),
                ...props.style
            }}
            onMouseDown={() => {
                onClick(value);
                setListOpen(false);
            }}
            onMouseOver={() => (hoverEnabled ? setHovered(true) : null)}
            onMouseLeave={() => setHovered(false)}
        >
            <span
                style={getDropdownTextStyle(
                    themeColor,
                    (hoverEnabled && hovered) || selected
                )}
            >
                {typeof value === 'string'
                    ? capitalizeFirstLetter(value)
                    : value}
            </span>
            <div
                style={{
                    ...optionBackgroundStyle,
                    opacity: (hoverEnabled && hovered) || selected ? '1' : '0',
                    ...(selected ? getDefaultStyle(themeColor) : null),
                    ...(hoverEnabled && hovered
                        ? getHoveredStyle(themeColor)
                        : null)
                }}
            />
        </div>
    );
};

export default DropdownEntry;
