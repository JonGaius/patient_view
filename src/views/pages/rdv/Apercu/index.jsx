import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import UserLayout from "../../../layout/UserLayout";
import {BackIcon, CalendarIcon, ClockEightIcon, VideoIcon} from "../../../../dist/icons";
import {links} from "../../../../routes/constant";
import image from "../../../../dist/images";

export const RDVMeet = () => {
    useEffect(() => {
        window.addEventListener('popstate', () => {
            window.location.reload();
        });
    }, []);
    const {slug} = useParams()
    let navigate = useNavigate()
    const { teleconsultation } = image

    return (
        <UserLayout user={""} title={"Apercu de la téléconsultation"}>
            <div className={"bfm-p-page"}>
                <button className={"bfm-page-back"} onClick={() => navigate(-1)}>
                    <BackIcon/> <span>Retour</span>
                </button>
                <div className={"bfm-p-page__head2 bfm-page-head2"}>
                    <h2>Téléconsultation</h2>
                    <div className={"bfm-p-page-head2__action"}>
                        <button type={"button"} className={"bfm-button bfm-button--primary"} onClick={() => navigate(links.meet + "slug")}>
                            <VideoIcon/> <span>Commencer la consultation</span>
                        </button>
                    </div>
                </div>
                <div className={"bfm-p-page__container"}>
                    <div className={"bfm-p-page-info"}>
                        <div className={"bfm-p-page-info__side"}>
                            <div className={"bfm-p-page-info__image"}>
                                <img src={teleconsultation} alt="teleconsultation"/>
                            </div>
                            <div className={"bfm-p-page-info__details bfm-p-page-info-details"}>
                                <h2>Téléconsultation</h2>
                                <div className={"bfm-p-page-info-details__container"}>
                                    <div className={"bfm-p-page-info-details__inf"}>
                                        <div className={"bfm-p-page-info-details__inf--label"}>
                                            <CalendarIcon/>
                                        </div>
                                        <div className={"bfm-p-page-info-details__inf--value"}>
                                            <strong>10/09/2022</strong>
                                        </div>
                                    </div>
                                    <div className={"bfm-p-page-info-details__inf"}>
                                        <div className={"bfm-p-page-info-details__inf--label"}>
                                            <ClockEightIcon/>
                                        </div>
                                        <div className={"bfm-p-page-info-details__inf--value"}>
                                            <strong>10:45</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={"bfm-p-page-info__container"}>
                            <div className={"bfm-p-page-info_rdv"}>
                                <div className={"bfm-p-page-info_rdv__patient bfm-page-info_rdv-patient"}>
                                    <h1>Jeannette KABORE</h1>
                                    <div className={"bfm-p-page-info_rdv-patient__details"}>
                                        <h2>Informations du patient</h2>
                                        <div className={"bfm-p-page-info_rdv-patient__details--text"}>
                                            <span>Date de naissance:</span>
                                            <strong>10/08/1999</strong>
                                        </div>
                                        <div className={"bfm-p-page-info_rdv-patient__details--text"}>
                                            <span>Lieu de naissance:</span>
                                            <strong>Ouagadougou</strong>
                                        </div>
                                        <div className={"bfm-p-page-info_rdv-patient__details--text"}>
                                            <span>Genre:</span>
                                            <strong>Femme</strong>
                                        </div>
                                        <div className={"bfm-p-page-info_rdv-patient__details--text"}>
                                            <span>Tel:</span>
                                            <strong>(00226) 75 34 56 78</strong>
                                        </div>
                                        <div className={"bfm-p-page-info_rdv-patient__details--text"}>
                                            <span>Email:</span>
                                            <strong>email@gmail.com</strong>
                                        </div>
                                        <div className={"bfm-p-page-info_rdv-patient__details--text"}>
                                            <span>Localité:</span>
                                            <strong>Secteur 24, Ouagadougou</strong>
                                        </div>
                                    </div>
                                    <div className={"bfm-p-page-info_rdv-patient__details"}>
                                        <h2>Personne à contacter</h2>
                                        <div className={"bfm-p-page-info_rdv-patient__details--text"}>
                                            <span>Nom et prénom(s):</span>
                                            <strong>Jean KABORE</strong>
                                        </div>
                                        <div className={"bfm-p-page-info_rdv-patient__details--text"}>
                                            <span>Affiliation:</span>
                                            <strong>Père</strong>
                                        </div>
                                        <div className={"bfm-p-page-info_rdv-patient__details--text"}>
                                            <span>Email:</span>
                                            <strong>N/D</strong>
                                        </div>
                                        <div className={"bfm-p-page-info_rdv-patient__details--text"}>
                                            <span>Téléphone:</span>
                                            <strong>(00226) 75 34 56 78</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className={"bfm-p-page-info_rdv__actes"}>
                                    <h2>Actes</h2>
                                </div>
                                <div className={"bfm-p-page-info_rdv__motif"}>
                                    <h2>Motif</h2>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus in, magnam magni minus nobis non tenetur! Explicabo maiores perferendis quia?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

