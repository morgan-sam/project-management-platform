import React from 'react';
import { Instruction, InstructionsContainer } from 'styling/createAccountStyle';

const CreateAccountPageOne = () => {
    return (
        <InstructionsContainer>
            <Instruction>
                Welcome to PMP. This setup will create a new group of accounts
                for your team.
            </Instruction>
            <Instruction>
                If you are a team member, your signup link will be send directly
                to you via email.
            </Instruction>
            <Instruction>
                Please contact your manager if you have not recieved one.
            </Instruction>
        </InstructionsContainer>
    );
};

export default CreateAccountPageOne;
