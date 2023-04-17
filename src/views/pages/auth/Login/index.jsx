import React, {useContext, useEffect, useState} from 'react';
import AuthLayout from "../../../layout/AuthLayout/";
import {AuthPasswordfield, AuthTextfield} from "../../../components/textfield/";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login, reset} from "../../../../redux/services/auth/auth.slice";
import {UserContext} from "../../../../context/AuthContext";
import {CircleInformationIcon} from "../../../../dist/icons";


export const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const {isLoading, isSuccess, isError, message} = useSelector(
        (state) => state.auth
    )

    const {
        setLoggin
    } = useContext(UserContext);

    useEffect(() => {
        setLoggin(true)
    }, [setLoggin])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!username && !password){
            setError({
                type: "global",
                message: "Veuillez renseigner tous les champs"
            })
            return
        }else{
            if(!username){
                setError({
                    type: "username",
                    message: "Veuillez renseigner votre nom d'utilisateur valide"
                })
                return
            }else if(!password){
                setError({
                    type: "global",
                    message: "Veuillez votre mot de passe"
                })
                return
            }
        }
        const data = {
            username,
            password
        }
        dispatch(login(data))
    }

    useEffect(() => {
        if(isSuccess){
            setUsername("")
            setPassword("")
            setError("")
            setLoggin(false)
            window.location.reload()
        }
        if(isError){
            setError({
                type: "global",
                message: message
            })
        }

        return () => {
            dispatch(reset())
        }
    }, [isSuccess, isError, message, dispatch, setLoggin])


    return (
        <AuthLayout title={"Connexion"} subtitle={"Heureux de vous revoir"}>
            <form onSubmit={handleSubmit} className={"bfm-layout-auth__form bfm-layout-auth-form"}>

                <div className={"bfm-layout-auth-form__group"}>
                    {
                        isLoading ? ("") : (
                            error && error.type === "global" && (
                                <div className={"bfm-layout-auth-form__notice bfm-layout-auth-form-notice is--danger"}>
                                    <div className={"bfm-layout-auth-form-notice__container"}>
                                        <div className={"bfm-layout-auth-form-notice__icon"}>
                                            <CircleInformationIcon/>
                                        </div>
                                        <div className={"bfm-layout-auth-form-notice__paragraph"}>
                                            <strong>Oupss!!! Une erreur est survenue</strong>
                                            <p>{error.message}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                    <AuthTextfield id={"username"} error={error} fnc={setUsername} value={username} type={"text"}>
                        Nom d'utilisateur
                    </AuthTextfield>
                    <AuthPasswordfield id={"password"} error={error} value={password} fnc={setPassword}>
                        Mot de passe
                    </AuthPasswordfield>
                </div>
                <div className={"bfm-layout-auth-form__action"}>
                    <button className={`bfm-button bfm-button--${isLoading ? "disable" : "primary"}`} type={"submit"}>
                        <span>
                            {
                                isLoading ? "Connexion en cours" : "Se connecter"
                            }
                        </span>
                    </button>
                </div>
            </form>
            <div className={"bfm-layout-auth__info"}>
                <p>En cas de perte de votre mot de passe. Veuillez contacter l’administrateur</p>
            </div>
        </AuthLayout>
    );
};

