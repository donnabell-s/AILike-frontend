import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import * as Views from "./views/containers";
import { PATHS } from "./constant";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PATHS.USER_MAIN.path} element={<Views.Main/>}>
                    <Route path={PATHS.USER_VIEW.HOME.path} element={<Views.Home/>} />
                    <Route path={PATHS.USER_VIEW.PROFILE.path} element={<Views.Profile/>} />
                </Route>
                
                <Route path={PATHS.AUTH.path} element={<Views.Authentication/>}>
                    <Route path={PATHS.AUTH_PAGE.LOGIN.path} element={<Views.Login/>} />
                    <Route path={PATHS.AUTH_PAGE.SIGNUP.path} element={<Views.Signup/>}/>
                </Route>

                <Route path={PATHS.NOT_FOUND.path} element={<Views.NotFound/>}/>

                <Route path="/" element={<Navigate to="/account/login" />
} />
            </Routes>
        </BrowserRouter>
    )
}