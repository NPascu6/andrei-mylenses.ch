import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/App.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './store/store';
import {HashRouter} from 'react-router-dom';
import {I18nProvider} from './i18n/I18nProvider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <I18nProvider>
            <Provider store={store}>
                <HashRouter future={{v7_relativeSplatPath: true}}>
                    <App/>
                </HashRouter>
            </Provider>
        </I18nProvider>
    </React.StrictMode>
);
