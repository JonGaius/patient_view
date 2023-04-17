import React from 'react';
import {useNavigate} from "react-router-dom";
import image from "../../../dist/images/";
import {CalendarAltIcon, ClockEightIcon} from "../../../dist/icons";
import {links} from "../../../routes/constant.js";

export const RdvCard = ({event}) => {
    let navigate = useNavigate()
    const { teleexpertise, teleconsultation } = image
    return (
        <button type={"button"} className={"bfm-rdv-card"} onClick={() => {
            navigate(links.teleconsultationApercu + "1234567889")
        }}>
            <div className={"bfm-rdv-card__container"}>
                <div className={"bfm-rdv-card__avatar"}>
                    <img src={teleconsultation} alt="teleconsultation"/>
                </div>
                <div className={"bfm-rdv-card__info"}>
                    <h2>Téléconsultation</h2>
                    <div className={"bfm-rdv-card__info--text"}>
                        <p className={"spe"}><span>Patient: </span> <strong>John DOE</strong></p>
                        <p><span>Date de naissance: </span> <strong>10/08/1999</strong></p>
                        <p><span>Tel: </span> <strong>(00226) 7X XX XX XX</strong></p>
                    </div>
                </div>
            </div>
            <div className={"bfm-rdv-card__horaires bfm-rdv-card-horaires"}>
                <div className={"bfm-rdv-card-horaire"}>
                    <CalendarAltIcon/> <strong>10/05/2023</strong>
                </div>
                <div className={"bfm-rdv-card-horaire"}>
                    <ClockEightIcon/> <strong>10h30</strong>
                </div>
            </div>
        </button>
    );
};

