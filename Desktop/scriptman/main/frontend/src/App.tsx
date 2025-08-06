import { Route, Routes } from "react-router";
import "./App.css";

import LoginPage from "./features/layout/login";
import RegisterPage from "./features/layout/register";
import HomePage from "./features/pages/HomePage";
import DashHome from "./features/layout/dash-home";
import { TableUsers } from "./components/table-users";
import UpdateUserForm from "./components/form-update";
import CoursePage from "./features/layout/CoursePage";
import GroupsPage from "./features/layout/groupsPage";
import PrivateRoute from "./components/private-routes";
import DashHomePage from "./components/home-dash";
import DashStudent from "./features/layout/StudentDashoard/dash-student";
import StudentProfile from "./components/student-profile";
import StudentHome from "./components/student-home";
import StudentCourse from "./features/layout/StudentDashoard/student-course";
import ListStudentGroup from "./features/layout/StudentDashoard/listStudentGroup";
// import RoleRoute from "./components/RoleRoute";

function App() {
    return (
        <>
            {/* <ThemeProvider defaultTheme="light">
        <ModeToggle /> */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                {/* Admin */}
                <Route
                    path="/dash-home"
                    element={
                        <PrivateRoute roles={"admin"}>
                            <DashHome />
                        </PrivateRoute>
                    }
                >
                    <Route path="/dash-home" element={<DashHomePage />} />
                    <Route path="users" element={<TableUsers />} />
                    <Route path="courses" element={<CoursePage />} />
                    <Route path="/dash-home/groups" element={<GroupsPage />} />
                    <Route
                        path="users/update/:id"
                        element={<UpdateUserForm />}
                    />
                </Route>

                {/* student */}
                <Route
                    path="/student"
                    element={
                        <PrivateRoute roles={"student"}>
                            <DashStudent />
                        </PrivateRoute>
                    }
                >
                    <Route path="/student" element={<StudentHome />} />
                    <Route
                        path="/student/profile"
                        element={<StudentProfile />}
                    />
                    <Route path="/student/course" element={<StudentCourse />} />
                    <Route
                        path="/student/group"
                        element={<ListStudentGroup />}
                    />
                </Route>
            </Routes>
            {/* </ThemeProvider> */}
        </>
    );
}

export default App;
