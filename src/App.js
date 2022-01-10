import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { NavigationMenu } from "./components/navigation-menu";
import { LoginRegisterPage } from "./pages/login-register-page";
import { UserPage } from "./pages/user-page";
import { EditUserDetails } from "./pages/edit-user-details";
import { EditTaskPage } from "./pages/edit-task";
import { AdminPage } from "./pages/admin-page";
import { AdminUserInfo } from "./pages/admin-user-info";

function App() {

  return (
    <div className="App">
      <Router>
        <NavigationMenu/>
        <Routes>
          <Route path="/" element={<LoginRegisterPage/>}></Route>
          <Route path="/users/:id" element={<UserPage/>}></Route>
          <Route path="/users/:id/user-details" element={<EditUserDetails/>}></Route>
          <Route path="/users/:id/edit-task/:note_id" element={<EditTaskPage/>}></Route>
          <Route path="/admin" element={<AdminPage/>}></Route>
          <Route path="/admin/user/:id" element={<AdminUserInfo/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
