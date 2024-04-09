import { Props } from "@/types/Props";
import { useContext } from "react";
import { AuthenticationContext } from "./AuthenticationContext";
import { Login } from "@/screens/Login";

export const RequireAuth = ({ children }: Props) => {
    const auth = useContext(AuthenticationContext);

    if(!auth.user) {
        return <Login />
    }

    return children;
}