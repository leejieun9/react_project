import { useReducer } from "react";
import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import TestComp from "./component/TestComp";

// 초기 상태 정의 (mock 데이터 사용)
const initialState = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    createdDate: new Date().getTime(),
  },
];

// 리듀서 함수 정의 (할일 추가, 수정, 삭제)
function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.payload, ...state];
    case "UPDATE":
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, content: action.payload.content }
          : todo
      );
    case "DELETE":
      return state.filter(todo => todo.id !== action.payload.id);
    default:
      return state;
  }
}

function App() {
  // useReducer 사용하여 할일 관리
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  // 새로운 할일 항목을 추가하는 함수
  const onCreate = (content) => {
    const newItem = {
      id: todos.length > 0 ? todos[0].id + 1 : 0,  // 고유한 id 값
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    };
    dispatch({ type: "CREATE", payload: newItem });
  };

  return (
    <div className="App">
      <TestComp/>
      <Header />
      {/* TodoEditor에 onCreate 함수 전달 */}
      <TodoEditor onCreate={onCreate} />
      {/* TodoList에 todos 상태 전달 */}
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
