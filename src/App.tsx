import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';

import { Provider } from 'react-redux';
import { RouterProvider } from './routes';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <RouterProvider />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
