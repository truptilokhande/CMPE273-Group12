import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import reducer from '../store/reducers/reducer';
import Users from '../components/Users/Users';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

test('renders tags page', () => {
  render(
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Router>
            <Users />
          </Router>
        </Provider>
      </PersistGate>
    </React.StrictMode>,
  );
  const element = screen.getByText(/Users/);
  expect(element).toBeInTheDocument();
});
