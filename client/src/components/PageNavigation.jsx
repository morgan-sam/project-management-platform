import React from 'react';
import styled from '@emotion/styled';

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

    const PaginationText = styled.div`
        color: ${(props) => props.theme.colors.primary};
    `;

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
            <PaginationText>
                {currentPage + 1}/{totalPages}
            </PaginationText>
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
