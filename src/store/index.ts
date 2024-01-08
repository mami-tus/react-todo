import { create } from 'zustand'

// EditedTask という型を定義
type EditedTask = {
  id: number
  title: string
}

// State という型を定義。この型は以下のプロパティを持つ
type State = {
  // editedTask: EditedTask 型。
  editedTask: EditedTask
  // updateEditedTask: EditedTask 型の引数を取り、戻り値がない（void）関数。
  updateEditedTask: (payload: EditedTask) => void
  // resetEditedTask: 引数がなく、戻り値がない（void）関数。
  resetEditedTask: () => void
}

/*
userState という名前の変数を宣言し、create<State> 関数を呼び出して状態管理ストアを作成しています。
<State> はこのストアが State 型の状態を持つことを意味します。
<> で囲まれた部分はジェネリクスと呼ばれるもので、型を引数に取ることができます。
create 関数には、set 関数を引数とするコールバック関数を渡しています。（引数として渡され、関数内で実行される）
この set 関数は状態を更新するために使われます。
*/
const userState = create<State>((set) => ({
  // ストアの初期状態として editedTask を設定しています。id は 0、title は空文字列です。
  editedTask: { id: 0, title: '' },
  // updateEditedTask という関数を定義。この関数は payload（EditedTask 型のオブジェクト）を引数とし、set 関数を使用して editedTask の状態を更新します。
  updateEditedTask: (payload) =>
    set({
      editedTask: payload,
    }),
  // resetEditedTask という関数を定義。この関数は引数を取らず、set 関数を使用して editedTask の状態を初期状態にリセットします
  resetEditedTask: () => set({ editedTask: { id: 0, title: '' } }),
}))

/*
userState をデフォルトエクスポートします。
これにより、他のファイルからこの状態管理ストアをインポートできるようになります。
*/
export default userState
