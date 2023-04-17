import React from 'react';
import image from "../../../dist/images/";
import {titlePage} from "../../utilities/sharedFunction.js";
import {BigLogo} from "../../../dist/illustration/";

const AuthLayout = ({title, subtitle, children}) => {
    const {auth, ministere, uvbf, cfrtm} = image
    titlePage(title)
    return (
        <>
            <section className={"bfm-layout-auth__image"}>
                <img src={auth} alt={title ? title.toLocaleLowerCase() : "layout"}/>
            </section>
            <section className={"bfm-layout-auth__formulaire bfm-layout-auth-formulaire"}>
                <div className={"bfm-layout-auth-formulaire__container"}>
                    <div className={"bfm-layout-auth-formulaire__partners bfm-layout-auth-formulaire-partners"}>
                        <div className={"bfm-layout-auth-formulaire-partners__image"}>
                            <img src={ministere} alt="ministère de la santé"/>
                        </div>
                        <div className={"bfm-layout-auth-formulaire-partners__image"}>
                            <img src={uvbf} alt="Université Virtuelle - Burkina FASO"/>
                        </div>
                    </div>

                    <div className={"bfm-layout-auth-formulaire__main"}>
                        <header className={"bfm-layout-auth-formulaire__header"}>
                            <div className={"bfm-layout-auth-formulaire__logo"}>
                                <BigLogo/>
                            </div>
                            <div className={"bfm-layout-auth-formulaire__head"}>
                                <h1>{title}</h1>
                                <span>{subtitle}</span>
                            </div>
                        </header>
                        <main className={"bfm-layout-auth-formulaire__formContainer"}>
                            {children}
                        </main>
                    </div>
                    <footer className={"bfm-layout-auth-footer"}>
                        <p>© 2023 BF-TLM Plateforme. Tous droits reservés.</p>
                        <div className={"bfm-layout-auth-footer__power"}>
                            <span>Powered by</span>
                            <div className={"bfm-layout-auth-footer__power--image"}>
                                <img src={cfrtm} alt="CFRTM"/>
                            </div>
                        </div>
                    </footer>
                </div>
            </section>

        </>
    );
};

export default AuthLayout;
