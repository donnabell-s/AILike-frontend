export const PATHS = {
    USER_MAIN: {
        path: "/user",
        label: "User Main"
    },
    AUTH: {
        path: "/account",
        label: "Account"
    },
    AUTH_PAGE: {
        LOGIN: {
            path: "login",
            label: "Login"
        },
        SIGNUP: {
            path: "signup",
            label: "Sign Up"
        },
    },
    NOT_FOUND: {
        path: "*",
        label: "Not Found"
    },
    USER_VIEW: {
        HOME: {
            path: "home",
            label: "Home Page"
        },
        PROFILE: {
            path: "profile/:userId",
            label: "Profile"
        },
        // USER_PROFILE: {
        //     path: "user-profile",
        //     label: "User Profile"
        // }
    }

}