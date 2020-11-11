import React from 'react';

const PageNavigation = (props) => {
    const {
        currentPage,
        setCurrentPage,
        currentPageComplete,
        totalPages
    } = props;

    const navigationContainerStyle = {
        display: 'flex',
        alignItems: 'center'
    };

    const getArrowStyle = (enabled) => {
        return {
            color: enabled ? 'black' : '#ccc',
            cursor: enabled ? 'pointer' : 'not-allowed',
            margin: '1rem',
            userSelect: 'none'
        };
    };

    return (
        <div style={navigationContainerStyle}>
            <div
                style={getArrowStyle(currentPage > 0)}
                onClick={() =>
                    currentPage > 0 ? setCurrentPage(currentPage - 1) : null
                }
            >
                ⮜
            </div>
            <span>
                {currentPage + 1}/{totalPages}
            </span>
            <div
                style={getArrowStyle(
                    currentPageComplete && currentPage < totalPages - 1
                )}
                onClick={() =>
                    currentPageComplete && currentPage < totalPages - 1
                        ? setCurrentPage(currentPage + 1)
                        : null
                }
            >
                ⮞
            </div>
        </div>
    );
};

export default PageNavigation;
