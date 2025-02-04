import './App.css'
import Login from "./components/Login.tsx";
import { useAuth} from "./auth/AuthContext.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";

function App() {
 const {loggedIn} = useAuth();
  return (
    <>
        {loggedIn ?
            <Dashboard />
            :
            <Login />
        }
    </>
  )
}

export default App
