import {Account, HomePage, LoginPage, Meet, RDVAgenda, RDVList, RDVMeet, WelcomePage} from "../views/pages";

export const links = {
    welcome: "/",
    login: "/connexion",
    home: "/accueil",
    meet: "/teleconsultation/",
    rdvList: "/liste-des-rendez-vous",
    rdvApercu: "/rendez-vous/",
    setting: "/parametre-du-compte",
    calendar: "/calendrier",
}

export const routes = [
    {
        path: links.welcome,
        Component: WelcomePage,
        exact: true
    },
    {
        path: links.login,
        Component: LoginPage,
        exact: true
    },
    {
        path: links.home,
        Component: HomePage,
        exact: true
    },
    {
        path: links.meet + ":slug",
        Component: Meet,
        exact: true
    },
    {
        path: links.rdvList,
        Component: RDVList,
        exact: true
    },
    {
        path: links.rdvApercu + ":slug",
        Component: RDVMeet,
        exact: true
    },
    {
        path: links.setting,
        Component: Account,
        exact: true
    },
    {
        path: links.calendar,
        Component: RDVAgenda,
        exact: true
    },
]