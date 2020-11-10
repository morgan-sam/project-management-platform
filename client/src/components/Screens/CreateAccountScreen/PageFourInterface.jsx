import React from 'react';
import {
    pageThreeTitleStyle,
    pageFourSubSectionStyle,
    pageFourListStyle,
    pageFourListLineStyle,
    pageFourConfirmButtonStyle
} from 'styling/createAccountStyle';
import SystemButton from 'components/SystemButton';

const PageFourInterface = (props) => {
    const { managerDetails, teamMembers, addAccounts } = props;
    return (
        <div>
            <div style={pageFourSubSectionStyle}>
                <div style={pageThreeTitleStyle}>Manager Email:</div>
                <div>{managerDetails.email}</div>
            </div>
            <div style={pageFourSubSectionStyle}>
                <div style={pageThreeTitleStyle}>
                    Team Members ({teamMembers.length}):
                </div>
                <ul style={pageFourListStyle}>
                    {teamMembers.map((el) => (
                        <li style={pageFourListLineStyle}>{el}</li>
                    ))}
                </ul>
            </div>
            <div style={pageFourSubSectionStyle}>
                <SystemButton
                    onClick={addAccounts}
                    style={pageFourConfirmButtonStyle}
                >
                    Confirm
                </SystemButton>
            </div>
        </div>
    );
};

export default PageFourInterface;
