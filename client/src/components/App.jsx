import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainScreen from 'components/Screens/MainScreen';
import LoginScreen from 'components/Screens/LoginScreen';
import CreateAccountScreen from 'components/Screens/CreateAccountScreen';
import { AuthProvider } from 'config/auth';
import PrivateRoute from 'routes/PrivateRoute';
import { ThemeProvider } from 'emotion-theming';

const App = () => {
    const theme = {
        colors: {
            primary: 'white'
        }
    };
    return (
        <AuthProvider>
            <Router>
                <div>
                    <PrivateRoute exact path="/" component={MainScreen} />

                    <ThemeProvider theme={theme}>
                        <Route exact path="/login" component={LoginScreen} />
                        <Route
                            exact
                            path="/signup"
                            component={CreateAccountScreen}
                        />
                    </ThemeProvider>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
