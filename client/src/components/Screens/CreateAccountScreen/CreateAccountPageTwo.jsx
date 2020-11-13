/** @jsx jsx */
import React, { useState } from 'react';
import { Instruction, InstructionsContainer } from 'styling/createAccountStyle';
import { css, jsx } from '@emotion/react';

const CreateAccountPageTwo = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const CreateAccountFormStyle = css`
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 1rem;
        & > * {
            margin: 0.5rem;
        }
        & > label {
            color: white;
        }
    `;

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    return (
        <div>
            <InstructionsContainer>
                <Instruction>
                    Firstly create the account of the team manager.
                </Instruction>
                <Instruction>
                    Please enter an email and password for the team manager.
                </Instruction>
            </InstructionsContainer>
            <form css={CreateAccountFormStyle}>
                <label>Email</label>
                <input type="text" value={email} onChange={handleEmailChange} />
                <label>Password</label>
                <input
                    type="text"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </form>
        </div>
    );
};

export default CreateAccountPageTwo;
