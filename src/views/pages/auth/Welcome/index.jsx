import React, {useState} from 'react';
import {BigLogo} from "../../../../dist/illustration";
import {useNavigate} from "react-router-dom";
import {links} from "../../../../routes/constant";
import {IdBadgeIcon, IdCardClipIcon, XmarkLargeIcon} from "../../../../dist/icons";
import {AuthTextfield} from "../../../components/textfield";


export const WelcomePage = () => {
    let navigate = useNavigate();

    const [uuid, setUuid] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if(!uuid){
            setError({
                type: "uuid",
                message: "Veuillez renseigner l'identifiant unique du pateint"
            })
            return
        }
        navigate(links.home)
    }
    return (
        <div className={"bfm-simple-page"}>
            <div className={"bfm-simple-page__container"}>
                <header className={"bfm-simple-page__header bfm-simple-page-header"}>
                    <BigLogo/>
                    <div className={"bfm-simple-page-header__text"}>
                        <h1>Heureux de vous revoir John DOE</h1>
                        <span>Veuillez entrer l'identifiant unique du patient</span>
                    </div>
                </header>
                <div className={"bfm-simple-auth"}>
                    <div className={"bfm-simple-auth__group"}>
                        <AuthTextfield id={"uuid"} error={error} value={uuid} fnc={setUuid} type={"text"}>
                            Identifiant unique
                        </AuthTextfield>
                    </div>
                    <button type={"button"} className={"bfm-button bfm-button--primary"} onClick={() => handleSubmit()}>
                        <span>Recherchez le patient</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
