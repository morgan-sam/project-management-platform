import React from 'react';
import Dropdown from 'components/Dropdown';
import styled from '@emotion/styled';

const CompletionSelectContainer = styled.div`
    display: flex;
    align-items: center;
    height: 3rem;
    & > * {
        margin: 0 0.3rem;
    }
`;

const CompletionSelect = (props) => {
    const { state, setOverflowHidden } = props;
    const [obj, set] = state;

    return (
        <CompletionSelectContainer>
            <div className="label">Completion:</div>
            <Dropdown
                width={7}
                className="completionDropdown"
                selected={obj.completion}
                options={['all', 'complete', 'incomplete']}
                onClick={(val) =>
                    set({
                        ...obj,
                        completion: val
                    })
                }
                onOpenChange={setOverflowHidden}
            />
        </CompletionSelectContainer>
    );
};

export default CompletionSelect;
