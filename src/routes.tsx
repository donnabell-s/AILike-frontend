import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import * as Views from "./views/containers";
import { PATHS } from "./constant";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PATHS.USER_MAIN.path} element={<Views.Main/>}>
                    <Route path={PATHS.USER_VIEW.HOME.path} element={<Views.Home/>} />
                    <Route path={PATHS.USER_VIEW.MY_PROFILE.path} element={<Views.MyProfile/>} />
                    <Route path={PATHS.USER_VIEW.USER_PROFILE.path} element={<Views.UserProfile/>} />
                </Route>
                
                <Route path={PATHS.LOGIN.path} element={<Views.Login/>} />
                <Route path={PATHS.SIGNUP.path} element={<Views.Signup/>}/>
                <Route path={PATHS.NOT_FOUND.path} element={<Views.NotFound/>}/>

                <Route path="/" element={<Navigate to={PATHS.LOGIN.path} />} />
            </Routes>
        </BrowserRouter>
    )
}