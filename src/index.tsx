import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// 新しい QueryClient インスタンスを作成します。これはReact Queryの設定やキャッシュの管理に使用されます
const queryClient = new QueryClient({})

/**
 * ReactDOM.createRoot を使用して、root という名前のレンダリングルートを作成します。これはReact 18の新しいAPIです。
document.getElementById('root') は、HTML内の root というIDを持つ要素を取得します。
 */
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// ReactコンポーネントツリーをDOMにレンダリングします。
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
