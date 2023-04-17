import React, {useContext, useEffect} from 'react';
import {titlePage} from "../../utilities/sharedFunction";
import {Link, NavLink} from "react-router-dom";
import {links} from "../../../routes/constant";
import {BigLogo, LogoIconColor} from "../../../dist/illustration";
import {CalendarAltIcon, LogOutIcon, UserAltIcon} from "../../../dist/icons";
import image from "../../../dist/images";
import {UserContext} from "../../../context/AuthContext";

const UserLayout = ({title, children}) => {
    titlePage("Tableau de bord")
    const { cfrtm} = image
    const {
        setLoggin,
        logOut,
        isLoading,
    } = useContext(UserContext);

    useEffect(() => {
        setLoggin(false)
    }, [setLoggin])

    return (
        <>
            {
                isLoading ? (
                    <div className={"bfm-loading"}>
                        <LogoIconColor/>
                        <strong>Veuillez patienter un instant</strong>
                    </div>
                ) : (
                    <div className={"bfm-layout-user"}>
                        <header className={"bfm-layout-user__header bfm-layout-user-header"}>
                            <div className={"bfm-layout-user-header__container"}>
                                <div className={"bfm-layout-user-header__logo"}>
                                    <Link to={links.home}>
                                        <BigLogo/>
                                    </Link>
                                </div>
                                <div className={"bfm-layout-user-header__actions"}>
                                    <div className={"bfm-layout-user-header__action"}>
                                        <NavLink to={links.calendar} className={"bfm-header-btn"} end>
                                            <CalendarAltIcon/> <span>Calendrier</span>
                                        </NavLink>
                                    </div>
                                    <div className={"bfm-layout-user-header__action"}>
                                        <NavLink to={links.setting} className={"bfm-header-btn"} end>
                                            <UserAltIcon/> <span>Paramètre de compte</span>
                                        </NavLink>
                                    </div>
                                    <div className={"bfm-layout-user-header__action"}>
                                        <button type={"button"} className={"bfm-header-btn bfm-header-btn--danger"} onClick={() => logOut()}>
                                            <LogOutIcon/> <span>Déconnexion</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <main className={"bfm-layout-user__main"}>
                            {children}
                            <footer className={"bfm-layout-user__footer bfm-layout-user-footer"}>
                                <p>© 2023 BF-TLM Plateforme. Tous droits reservés.</p>
                                <div className={"bfm-layout-user-footer__power"}>
                                    <span>Powered by</span>
                                    <div className={"bfm-layout-user-footer__power--image"}>
                                        <img src={cfrtm} alt="CFRTM"/>
                                    </div>
                                </div>
                            </footer>
                        </main>
                    </div>
                )
            }
        </>
    );
};

export default UserLayout;
