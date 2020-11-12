import React from 'react';
import styled from '@emotion/styled';
import { capitalizeFirstLetter } from 'processing/utility';

const ObjectInput = (props) => {
    const { obj, setObj } = props;

    const Form = styled.form`
        display: flex;
        flex-direction: column;
        align-items: center;
    `;

    const FormInput = styled.label`
        display: flex;
        align-items: center;
    `;

    const FormLabel = styled.span`
        margin: 1rem;
    `;

    const FormTextArea = styled.input`
        height: 1.4rem;
        text-indent: 5px;
    `;

    return (
        <Form>
            {Object.entries(obj).map((el, i) => {
                return (
                    <FormInput key={i}>
                        <FormLabel>{capitalizeFirstLetter(el[0])}</FormLabel>
                        <FormTextArea
                            type={el[0]}
                            onChange={(e) => {
                                let objCopy = Object.assign({}, obj);
                                objCopy[el[0]] = e.target.value;
                                setObj(objCopy);
                            }}
                            placeholder={capitalizeFirstLetter(el[1])}
                        />
                    </FormInput>
                );
            })}
        </Form>
    );
};

export default ObjectInput;
