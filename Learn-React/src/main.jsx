import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import Layout from './Layout';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import 'nprogress/nprogress.css';

const root = document.getElementById('root');
createRoot(root).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </StrictMode>
  </Provider>
)
