import React, { useState } from 'react';
import Checkbox from 'components/Checkbox';
import Dropdown from 'components/Dropdown';
import ColorButton from 'components/ColorButton';
import { CancelButton, PopUpWindow } from 'styling/popUp';
import {
    FourByFourGrid,
    getSectionOpacityStyle,
    WizardTitle,
    bottomContainer,
    containerItemStyle,
    Grid
} from 'styling/wizardStyles';

const TaskTemplateWizard = (props) => {
    const { setScreen, setTemplate, template } = props;
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('n');
    const [digits, setDigits] = useState(1);
    const [order, setOrder] = useState('a');

    const generateTaskTemplate = () => {
        let template = name.length ? `${name}_` : '';
        template += '${';
        template += `${symbol},`;
        if (symbol === 'n') template += `${digits},`;
        template += `${order}}`;
        return template;
    };

    return (
        <PopUpWindow>
            <WizardTitle>Generate Task Template</WizardTitle>
            <FourByFourGrid>
                <div>
                    <div style={{ padding: '1.5rem', paddingTop: '0.4rem' }}>
                        Text Name:
                    </div>
                    <form
                        style={{ padding: '1rem' }}
                        onChange={(e) => setName(e.target.value)}
                    >
                        <input type="text" name="name" defaultValue={name} />
                        <input
                            disabled
                            type="submit"
                            value="Submit"
                            style={{ display: 'none' }}
                        />
                    </form>
                </div>
                <div>
                    <div style={containerItemStyle}>Symbol:</div>
                    <Grid rows={2} columns={2} style={containerItemStyle}>
                        <div style={{ gridArea: '1 / 1 / 2 / 2' }}>Number:</div>
                        <Checkbox
                            style={{ gridArea: '1 / 2 / 2 / 3' }}
                            default={symbol === 'n'}
                            onChange={() => setSymbol('n')}
                        />
                        <div style={{ gridArea: '2 / 1 / 3 / 2' }}>Letter:</div>
                        <Checkbox
                            style={{ gridArea: '2 / 2 / 3 / 3' }}
                            default={symbol === 'l'}
                            onChange={() => setSymbol('l')}
                        />
                    </Grid>
                </div>
                <div
                    style={{
                        ...getSectionOpacityStyle(symbol === 'l')
                    }}
                >
                    <div
                        style={{ ...containerItemStyle, paddingTop: '0.3rem' }}
                    >{`Digits:`}</div>
                    <Dropdown
                        className="dropdown"
                        selected={digits}
                        style={{
                            alignItems: 'center',
                            zIndex: '9',
                            width: '2rem',
                            padding: '2rem'
                        }}
                        options={[...Array(11).keys()].slice(1)}
                        onClick={(val) => setDigits(val)}
                    />
                </div>
                <div>
                    <div style={containerItemStyle}>Order:</div>
                    <Grid rows={2} columns={2} style={containerItemStyle}>
                        <div style={{ gridArea: '1 / 1 / 2 / 2' }}>
                            Ascending:
                        </div>
                        <Checkbox
                            style={{ gridArea: '1 / 2 / 2 / 3' }}
                            default={order === 'a'}
                            onChange={() => setOrder('a')}
                        />
                        <div style={{ gridArea: '2 / 1 / 3 / 2' }}>
                            Descending:
                        </div>
                        <Checkbox
                            style={{ gridArea: '2 / 2 / 3 / 3' }}
                            default={order === 'd'}
                            onChange={() => setOrder('d')}
                        />
                    </Grid>
                </div>
            </FourByFourGrid>
            <div style={bottomContainer}>
                <ColorButton
                    text={'Generate Template'}
                    onClick={() => {
                        const dateTemplate = generateTaskTemplate();
                        setTemplate({ ...template, task: dateTemplate });
                        setScreen('main');
                    }}
                />
            </div>
            <CancelButton onClick={() => setScreen('main')}>×</CancelButton>
        </PopUpWindow>
    );
};

export default TaskTemplateWizard;
