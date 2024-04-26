import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as ReduxProvider } from 'react-redux';
import store from './state/store';
import App from './App';
import theme from './theme';

/**
 * Root component that integrates Chakra UI and Redux into the application.
 * It wraps the entire application in providers that manage global state and theming.
 */
const RootComponent = () => {
    return (
        <React.StrictMode>
            <ReduxProvider store={store}>
                <ChakraProvider theme={theme}>
                    <App />
                </ChakraProvider>
            </ReduxProvider>
        </React.StrictMode>
    );
};

// Error handling to catch and log the rendering errors
try {
    ReactDOM.render(<RootComponent />, document.getElementById('root'));
} catch (error) {
    console.error('Failed to render React application:', error);
}
