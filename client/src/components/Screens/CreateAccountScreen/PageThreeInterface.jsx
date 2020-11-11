import React from 'react';
import { checkIfEmailValid } from 'processing/validity';
import Form from 'components/Form';
import {
    PageThreeInterfaceContainer,
    pageThreeTitleStyle,
    listStyle,
    listLineStyle,
    RemoveButton,
    noTeamMembersStyle
} from 'styling/createAccountStyle';

const PageThreeInterface = (props) => {
    const { teamMembers, setTeamMembers } = props;
    return (
        <PageThreeInterfaceContainer>
            <h3 style={pageThreeTitleStyle}>Added Members:</h3>
            <div style={listStyle}>
                {teamMembers && teamMembers.length ? (
                    teamMembers.map((el, i) => (
                        <div style={listLineStyle}>
                            {el}
                            <RemoveButton
                                onClick={() => {
                                    const removed = [
                                        ...teamMembers.slice(0, i),
                                        ...teamMembers.slice(i + 1)
                                    ];
                                    setTeamMembers(removed);
                                }}
                            >
                                ✕
                            </RemoveButton>
                        </div>
                    ))
                ) : (
                    <div style={noTeamMembersStyle}>
                        (No team members added - can be added later instead)
                    </div>
                )}
            </div>
            <Form
                style={{ flexDirection: 'row', margin: '0.75rem' }}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const { email } = e.target.elements;
                    const emailValid = checkIfEmailValid(email.value);
                    if (emailValid) {
                        setTeamMembers([...teamMembers, email.value]);
                        email.value = '';
                    }
                }}
                inputs={['email']}
                submitLabel={'Add User'}
            />
        </PageThreeInterfaceContainer>
    );
};

export default PageThreeInterface;
