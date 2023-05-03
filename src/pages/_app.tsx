import { Provider } from 'react-redux'
import { useTranslation } from 'react-i18next'
import CssBaseline from '@mui/material/CssBaseline'
import type { AppProps } from 'next/app'

import '../i18n/config';
import '../styles/globals.css'
import GlobalAlert from '../components/Alert/GlobalAlert'
import store from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  const { ready } = useTranslation();
  
  if (!ready) return 'loading translations...';

  return <Provider store={store}>
    <CssBaseline />
    <Component {...pageProps} />
    <GlobalAlert />
  </Provider>
}

export default MyApp
