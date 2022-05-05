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
import SignIn from '../components/SignIn/SignIn';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

test('renders signin page', () => {
  render(
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <Router>
            <SignIn />
          </Router>
        </Provider>
      </PersistGate>
    </React.StrictMode>,
  );
  console.log(screen);
  const element = screen.getByText(/Email/);
  const element1 = screen.getByText(/Please input valid email ID/);
  const element2 = screen.getByText(/Password/);
  expect(element).toBeInTheDocument();
  expect(element1).toBeInTheDocument();
  expect(element2).toBeInTheDocument();
});
