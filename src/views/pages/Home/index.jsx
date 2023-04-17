import React, {useContext, useEffect} from 'react';
import UserLayout from "../../layout/UserLayout";
import {MonitorHeartRateIcon} from "../../../dist/icons";
import {Link} from "react-router-dom";
import {links} from "../../../routes/constant";
import {UserContext} from "../../../context/AuthContext";

export const HomePage = () => {
    const {
        setLoggin,
        info
    } = useContext(UserContext);

    useEffect(() => {
        setLoggin(false)
    }, [setLoggin])

    return (
        <UserLayout title={"Tableau de bord"}>
            <div className={"bfm-p-home"}>
                <div className={"bfm-p-home__head bfm-p-home-head"}>
                    <div className={"bfm-p-home-head__text"}>
                        <h1>🖐🏽</h1>
                        <h2>Salut ! {info && info.name}</h2>
                        <span>Comment allez-vous?</span>
                    </div>
                </div>
                <div className={"bfm-p-home__container"}>
                    <div className={"bfm-p-home__actu"}>
                        <Link className={"bfm-p-home-rdv"} to={links.rdvApercu + "slug"}>
                            <div className={"bfm-p-home-rdv__illu"}>
                                <MonitorHeartRateIcon/>
                            </div>
                            <div className={"bfm-p-home-rdv__text"}>
                                <div className={"bfm-p-home-rdv__info"}>
                                    <span>Lundi 22 Juin 2023 à 18h30</span>
                                    <h2>Téléconsultation avec Dr. Thomas Oubda</h2>
                                </div>
                                <div className={"bfm-p-home-rdv__time"}>
                                    <span>Durée restante</span>
                                    <strong>28:30</strong>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={"bfm-p-home__list"}>
                        <h2>Rendez-vous à venir</h2>
                        <div className={"bfm-p-home-list"}>

                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};
