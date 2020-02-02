import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { IAppState, rootReducer } from './root-reducer'
import { rootSaga } from './root-saga'


export function configureStore(initState: IAppState) {
  const composeEnhancers = composeWithDevTools({})

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    initState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware
      )
    )
  )

  sagaMiddleware.run(rootSaga)

  return store
}
