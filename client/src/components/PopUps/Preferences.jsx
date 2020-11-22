import React, { useState } from 'react';
import Checkbox from 'components/Checkbox';
import ColorButton from 'components/ColorButton';
import NavigationMenu from 'components/NavigationMenu';
import {
    titleStyle,
    PopUpContainer,
    PopUpWindow,
    SubContainer,
    CancelButton,
    FinalContainer
} from 'styling/popUp';

const Preferences = (props) => {
    const { setPopUp, preferences, setPreferences } = props;
    const [screen, setScreen] = useState('general');
    const [tempPrefs, setTempPrefs] = useState(preferences);

    const menus = [
        { name: 'General', action: () => setScreen('general') },
        { name: 'Display', action: () => setScreen('display') }
    ];

    const popUpStyle = {
        height: '20rem',
        width: '40rem'
    };

    return (
        <PopUpContainer>
            <PopUpWindow>
                <div style={titleStyle}>Preferences</div>
                <SubContainer>
                    <NavigationMenu menus={menus} />
                </SubContainer>
                <div style={popUpStyle}>
                    {screen === 'general' && (
                        <SubContainer>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}
                            >
                                <span>Show title splash on startup: </span>
                                <Checkbox
                                    style={{ padding: '1rem' }}
                                    onChange={() =>
                                        setTempPrefs({
                                            ...tempPrefs,
                                            startupSplash: !tempPrefs.startupSplash
                                        })
                                    }
                                    default={tempPrefs.startupSplash}
                                />
                            </div>
                        </SubContainer>
                    )}
                </div>

                <FinalContainer>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <ColorButton
                            text={'Apply'}
                            color={'green'}
                            onClick={() =>
                                setTimeout(() => {
                                    setPreferences(tempPrefs);
                                    setPopUp(null);
                                }, 500)
                            }
                        />
                        <ColorButton
                            text={'Cancel'}
                            color={'darkred'}
                            onClick={() =>
                                setTimeout(() => setPopUp(null), 500)
                            }
                        />
                    </div>
                </FinalContainer>

                <CancelButton onClick={() => setPopUp(null)}>×</CancelButton>
            </PopUpWindow>
        </PopUpContainer>
    );
};

export default Preferences;
