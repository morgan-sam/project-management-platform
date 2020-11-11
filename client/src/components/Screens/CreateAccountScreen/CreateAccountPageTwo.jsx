import React from 'react';
import { Instruction, InstructionsContainer } from 'styling/createAccountStyle';
import ObjectInput from 'components/ObjectInput';

const CreateAccountPageTwo = (props) => {
    const { managerDetails, setManagerDetails } = props;
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
            <ObjectInput obj={managerDetails} setObj={setManagerDetails} />
        </div>
    );
};

export default CreateAccountPageTwo;
