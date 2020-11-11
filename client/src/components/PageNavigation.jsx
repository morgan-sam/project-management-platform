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

    const Arrow = styled.div`
        color: ${(props) =>
            props.enabled ? props.theme.colors.primary : '#ccc'};
        cursor: ${(props) => (props.enabled ? 'pointer' : 'not-allowed')};
        margin: '1rem';
        user-select: 'none';
    `;

    const PaginationText = styled.div`
        color: ${(props) => props.theme.colors.primary};
    `;

    return (
        <div style={navigationContainerStyle}>
            <Arrow
                enabled={currentPage > 0}
                onClick={() =>
                    currentPage > 0 ? setCurrentPage(currentPage - 1) : null
                }
            >
                ⮜
            </Arrow>
            <PaginationText>
                {currentPage + 1}/{totalPages}
            </PaginationText>
            <Arrow
                enabled={currentPageComplete && currentPage < totalPages - 1}
                onClick={() =>
                    currentPageComplete && currentPage < totalPages - 1
                        ? setCurrentPage(currentPage + 1)
                        : null
                }
            >
                ⮞
            </Arrow>
        </div>
    );
};

export default PageNavigation;
