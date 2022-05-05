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
import Tags from '../components/Tags/Tags';

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
            <Tags />
          </Router>
        </Provider>
      </PersistGate>
    </React.StrictMode>,
  );
  const element = screen.getByText(/Tags/);
  const element1 = screen.getByText(/A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question./);
  expect(element).toBeInTheDocument();
  expect(element1).toBeInTheDocument();
});
