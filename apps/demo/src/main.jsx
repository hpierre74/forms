import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { I18nProvider } from '@m6web/react-i18n';
import App from './app/app';

import configureStore from './app/store/configureStore';

const store = configureStore();

const theme = {};

ReactDOM.render(
  <StrictMode>
    <I18nProvider lang={{}} i18nNames={{}} errorCallback={() => null}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </I18nProvider>
  </StrictMode>,
  document.getElementById('root')
);
