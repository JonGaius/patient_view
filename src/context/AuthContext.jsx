import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {links} from "../routes/constant";
import {getMe, logout} from "../redux/services/auth/auth.slice";


const UserContext = createContext();
const AuthContext = ({children}) => {
    const [token, setToken] = useState("")
    const [loggin, setLoggin] = useState(false)
    const [info, setInfo] = useState(null)
    const [isInactive, setIsInactive] = useState(false);

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, me, isLoading, isError, message} = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if(loggin){
            if(user){
                navigate(links.welcome)
            }
        }else{
            if(!user){
                navigate(links.login)
            }
        }
    }, [loggin, user, navigate])

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        setInfo(me)
    }, [me])

    useEffect(() => {
        let timeoutId;

        const resetTimer = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                if(!loggin){
                    setIsInactive(true)
                }
            }, (10 * 60 * 1000));
        };

        document.addEventListener("mousemove", resetTimer);
        document.addEventListener("mousedown", resetTimer);
        document.addEventListener("keypress", resetTimer);
        document.addEventListener("touchmove", resetTimer);
        document.addEventListener("click", resetTimer);

        return () => {
            document.removeEventListener("mousemove", resetTimer);
            document.removeEventListener("mousedown", resetTimer);
            document.removeEventListener("keypress", resetTimer);
            document.removeEventListener("touchmove", resetTimer);
            document.removeEventListener("click", resetTimer);
        };
    }, [loggin]);

    useEffect(() => {
        setToken(user)
        setInfo(me)
    }, [user, me])

    const logOut = () => {
        dispatch(logout())
        window.location.reload()
    }

    return (
        <UserContext.Provider value={{
            info,
            token,
            setInfo,
            setToken,
            setLoggin,
            isInactive,
            setIsInactive,
            logOut,
            isLoading,
            isError,
            message
        }}>
            {children}
        </UserContext.Provider>
    );
};

export {AuthContext, UserContext}