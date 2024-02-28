// Utils to provide store and preloaded state for tests
import { configureStore } from '@reduxjs/toolkit'
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
import type { PreloadedState } from '@reduxjs/toolkit'
import type { RenderOptions } from '@testing-library/react'

import { rootReducer } from '../store'
import db from '../server/db.json';
import i18n from '../i18n/config';
import type { AppStore, RootState } from '../store'

// Allows to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      user: {
        infos: db.users[0],
        lastAlert: null,
      },
      chat: {
        lastUpdate: null,
        conversations: {
          [db.conversations[0].id]:
          {
            recipientOnline: true,
            messages: db.messages.filter((m) => m.conversationId === db.conversations[0].id),
            ...db.conversations[0]
          }
        }
      }
    },
    // Create a store instance if no store was passed in
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {

  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}