
import { lazy } from "react";


export const protectedRoutes = [
    {
        path: "/",
        element: lazy(() => import("../views/JobHome")),
    }
]

export const unprotectedRoutes = [
    {
        path: "/login",
        element: lazy(() => import("../views/Login")),
    }
]