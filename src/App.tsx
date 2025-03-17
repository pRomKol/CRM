import {TodoList} from "./pages/todoList/TodoList.tsx";
import {Route, Routes} from "react-router";
import {LoginPage} from "./pages/login/LoginPage.tsx";
import {SignUpPage} from "./pages/signUp/signUpPage.tsx";
import {Profile} from "./pages/profile/Profile.tsx";
import React from "react";
import {NavBar} from "./components/navBar/NavBar.tsx";
import {AuthProvider} from "./featers/AuthContext.tsx";

type Path = {
    path: string
    element: React.ReactNode
}
function App() {
    const routs: Path[] = [
        {
            path: '/login',
            element: <LoginPage/>
        },
        {
            path: '/signup',
            element: <SignUpPage/>
        },
        {
            path: '/profile',
            element: <Profile/>
        },
        {
            path: '/',
            element: <TodoList/>
        },

    ]
    return (
        <AuthProvider>
            <div style={{ display: "flex", height: "100vh" }}>
                <div style={{ width: "250px", backgroundColor: "#f4f4f4", padding: "20px" }}>
                    <NavBar/>
                </div>
                <div style={{ flex: 1, padding: "20px" }}>
                    <Routes>
                        {routs.map((el, index)=>(
                            <Route key={index} path={el.path} element={el.element}/>
                        ))}
                    </Routes>
                </div>
            </div>
        </AuthProvider>

    );
}

export default App;
