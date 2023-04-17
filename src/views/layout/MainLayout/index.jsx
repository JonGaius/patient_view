import React, {useState} from 'react';
import {titlePage} from "../../utilities/sharedFunction.js";
import {LogoIconColor} from "../../../dist/illustration";
import {NavLink} from "react-router-dom";
import {links} from "../../../routes/constant.js";
import {
    CalendarAltIcon,
    ClipboardListIcon,
    IdCardClipIcon,
    HouseLineIcon,
    MailAltIcon,
    BellIcon, GearIcon, LogOutIcon
} from "../../../dist/icons/";
import image from "../../../dist/images";

const MainLayout = ({here = "", title, children}) => {
    titlePage(title)
    const [structure, setStructure] = useState("")
    const {userPlacehoder} = image

    const changeStructure = (e) => {
        let value = e.target.value;
        setStructure(value)
        if(value){
            console.log(value)
        }
    }

    const navItems = [
        {
            path: links.messagerie,
            label: "Messagerie",
            ici: "chat",
            Icon: MailAltIcon,
        },
        {
            path: links.agenda,
            label: "Mon Agenda",
            ici: "agenda",
            Icon: CalendarAltIcon,
        },
        {
            path: links.rdv,
            label: "Mes Rendez-vous",
            ici: "rdv",
            Icon: ClipboardListIcon,
        },
        {
            path: links.patients,
            ici: "patients",
            label: "Mes patients",
            Icon: IdCardClipIcon,
        },
    ]
    return (
        <>
            <section className={"bfm-layout-right"}>
                <div className={"bfm-layout-right__input"}>
                    <select defaultValue={"structure"} onChange={changeStructure}>
                        <option value="">Veuillez choisir une structure</option>
                        <option value="1">Structure 1</option>
                        <option value="2">Structure 2</option>
                        <option value="3">Structure 3</option>
                    </select>
                </div>
                <div className={"bfm-auth-info"}>
                    <div className={"bfm-auth-info__info"}>
                        <strong>Thomas Oubda</strong>
                        <span>Cardiologie</span>
                    </div>
                    <div className={"bfm-auth-info__avatar"}>
                        <img src={userPlacehoder} alt="user"/>
                    </div>
                </div>
            </section>

            <section className={"bfm-navigation"}>
                <button className={"bfm-navigation__btn"} onClick={() => {
                    document.querySelector(".bfm-navigation").classList.toggle("is--open")
                    document.querySelector(".bfm-main").classList.toggle("is--open")
                }}>
                    <div className={"angle"}></div>
                </button>
                <div className={"bfm-navigation__container"}>
                    <header className={"bfm-navigation__header"}>
                        <div className={"bfm-navigation__logo"}>
                            <LogoIconColor/>
                        </div>
                    </header>
                    <nav className={"bfm-navigation__menu bfm-navigation-menu"}>
                        <div className={"bfm-navigation-menu__item bfm-navigation-menu-item"}>
                            <NavLink to={links.home} className={here === "home" ? "active" : ""} end>
                                <HouseLineIcon/> <span>Tableau de bord</span>
                            </NavLink>
                        </div>
                        <div className="bfm-divider"></div>
                        <ul className={"bfm-navigation-menu__list bfm-navigation-menu-list"}>
                            {
                                navItems.map(({path, label,ici, Icon}, index) => (
                                    <li className={"bfm-navigation-menu__item bfm-navigation-menu-item"} key={index}>
                                        <NavLink to={path} className={here === ici ? "active" : ""} end>
                                            <Icon/> <span>{label}</span>
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <div className={"bfm-navigation__bottom bfm-navigation-bottom"}>
                        <div className={"bfm-navigation-menu__item bfm-navigation-menu-item"}>
                            <NavLink to={links.notification} className={here === "notif" ? "active" : ""} end>
                                <BellIcon/> <span>Notification</span>
                            </NavLink>
                        </div>
                        <div className={"bfm-navigation-menu__item bfm-navigation-menu-item"}>
                            <NavLink to={links.account} className={here === "account" ? "active" : ""} end>
                                <GearIcon/> <span>Paramètre du compte</span>
                            </NavLink>
                        </div>
                        <div className={"bfm-navigation-menu__item bfm-navigation-menu-item is--danger"}>
                            <button type={"button"}>
                                <LogOutIcon/> <span>Deconnexion</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <main role={"main"} className={"bfm-main"}>
                {children}
            </main>
        </>
    );
};

export default MainLayout;
