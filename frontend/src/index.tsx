import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// redux-persist 설정
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// redux store 위치
import store from './store/store';
import GlobalStyles from './styles/GlobalStyle';

export const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<React.StrictMode>
				<GlobalStyles />
				<App />
			</React.StrictMode>
		</PersistGate>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
