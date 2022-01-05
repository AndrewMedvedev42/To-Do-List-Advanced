import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { NavigationMenu } from "./components/navigation-menu";
import { LoginRegisterPage } from "./pages/login-register-page";
import { UserPage } from "./pages/user-page";
import { EditUserDetails } from "./pages/edit-user-details";
import { EditToDoPage } from "./pages/edit-to-do";
import { AdminPage } from "./pages/admin-page";
import { AdminUserConsole } from "./pages/admin-console";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationMenu/>
        <Routes>
          <Route path="/" element={<LoginRegisterPage/>}></Route>
          <Route path="/users/:id" element={<UserPage/>}></Route>
          <Route path="/users/:id/user-details" element={<EditUserDetails/>}></Route>
          <Route path="/users/:id/edit-note/:note_id" element={<EditToDoPage/>}></Route>
          <Route path="/admin" element={<AdminPage/>}></Route>
          <Route path="/admin/console/user/:id" element={<AdminUserConsole/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
