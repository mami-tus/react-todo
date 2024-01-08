import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth } from './components/Auth'
import { Todo } from './components/Todo'
import axios from 'axios'
import { CsrfToken } from './types'

// App という名前の関数コンポーネントを宣言しています。これはReactアプリケーションの一部として機能します。
function App() {
  // Reactの useEffect フックを使用しています。useEffect は、コンポーネントのレンダリング後に副作用（side-effects）を実行するためのものです。
  useEffect(() => {
    // axios のデフォルト設定を変更して、すべてのリクエストに認証情報（例えばクッキー）を含めるようにしています
    axios.defaults.withCredentials = true
    // getCsrfToken という非同期関数を定義しています。この関数は、CSRFトークンを取得するために axios を使ってAPIリクエストを行います。
    const getCsrfToken = async () => {
      // axios.get を使って、環境変数 REACT_APP_API_URL に指定されたURLからCSRFトークンを非同期的に取得しています。取得したデータは data 変数に格納されます。
      const { data } = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrf`
      )
      // 取得したCSRFトークンを axios のデフォルトヘッダーに設定しています。
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrfToken
    }
    // 定義した getCsrfToken 関数を呼び出しています。
    getCsrfToken()
    // useEffect フックの依存配列を空にしています。これにより、useEffect 内のコードはコンポーネントのマウント時に一度だけ実行されます。
  }, [])
  return (
    // コンポーネントのレンダリング結果を返しています。ここでは、React Routerを使ってアプリケーションのルーティングを設定しています。
    /*
      <BrowserRouter>:
      ブラウザの履歴APIを使ったルーティングのためのコンテナです。
      <Routes>:
      複数の Route コンポーネントを包むためのコンテナです。
      <Route path="/" element={<Auth />} /> と <Route path="/todo" element={<Todo />} />:
      それぞれのパスに対応するコンポーネントを定義しています。"/" のパスでは Auth コンポーネントが、"/todo" のパスでは Todo コンポーネントが表示されます。
     */
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  )
}

/*
このコードは、CSRFトークンを取得し、それを axios のデフォルトヘッダーに設定することで、
後続のリクエストが安全に行われるようにする一方で、
アプリケーション内のルーティングを設定しています。
*/
export default App
