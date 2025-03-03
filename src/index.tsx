import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

// Handle both React 17 and React 18 types
const rootElement = document.getElementById('root')
if (rootElement) {
  // This approach works with React 17 but uses type assertions to satisfy TypeScript
  (ReactDOM as any).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
