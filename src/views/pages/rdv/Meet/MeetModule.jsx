import React, {useContext, useEffect, useState} from 'react';
import {
    MicrophoneAltIcon,
    MicrophoneSlashAltIcon,
    PhoneXmarkIcon,
    VideoIcon,
    VideoSlashIcon, XmarkLargeIcon
} from "../../../../dist/icons";
import image from "../../../../dist/images";
import {MeetSocketContext} from "../../../../context/ConsultationMeet";
import {useNavigate} from "react-router-dom";

const WaitAfterAsk = ({active, setActive}) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
            setActive(false)
        }, 10000);
        return () => clearTimeout(timer);
    })
    return (
        <span className={"bfm-waiting-text"}>
            {
                active && loading ? (
                    "Veuillez patientez pendant 10s la réponse du professionnel de soin"
                ) : (
                    "Veuillez renvoyer une demande"
                )
            }
        </span>
    )
}

const MeetModule = ({slug}) => {
    const { userPlacehoder } = image
    const [hideMCamera, setHideMCamera] = useState(true);

    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const [muteMCamera, setMuteMCamera] = useState(true);
    const [hideVCamera, setHideVCamera] = useState(true);
    const [muteVCamera, setMuteVCamera] = useState(true);
    let navigate = useNavigate()
    const {
        user,
        me,
        callAccepted,
        myVideo,
        userVideo,
        callEnded,
        stream,
        call,
        join_channel,
        setOpenC,
        hideCamera,
        muteCamera,
        hideVCam,
        muteVCam,
        callUser,
        callQuite,
    } = useContext(MeetSocketContext);

    useEffect(() => {
        if(callEnded){
            window.location.reload()
        }
        join_channel(slug)
        setOpenC(true)
    }, [callEnded, join_channel, setOpenC, slug])

    useEffect(() => {
        if(hideVCam && hideVCam.me !== me){
            setHideVCamera(hideVCam.statut)
        }
        if(muteVCam && muteVCam.me !== me){
            setMuteVCamera(muteVCam.statut)
        }
    }, [hideVCam, muteVCam, me])

    return (
        <div className={"bfm-patient-meet-layout__container"}>
            <div className={"bfm-patient-meet-layout__meeting bfm-patient-meet-layout-meeting"}>
                <div className={"bfm-patient-meet-layout-meeting__user bfm-patient-meet-layout-meeting-user"}>
                    {
                        stream && (
                            <video playsInline muted ref={myVideo} autoPlay />
                        )
                    }

                    {
                        !hideMCamera && (
                            <div className={"bfm-patient-meet-layout-meeting-user--empty"}>
                                <div className={"bfm-patient-meet-layout-meeting-user--avatar"}>
                                    <img src={userPlacehoder} alt="avatar"/>
                                </div>
                            </div>
                        )
                    }
                    {
                        !muteMCamera && (
                            <div className={"bfm-patient-meet-layout-meeting-user--mute"}>
                                <MicrophoneSlashAltIcon/>
                            </div>
                        )
                    }
                </div>

                <div className={"bfm-patient-meet-layout-meeting__user bfm-patient-meet-layout-meeting-user"}>
                    {
                        callQuite ? (
                            <div className={"bfm-patient-meet-layout-meeting-user__waiting bfm-patient-meet-layout-meeting-user-waiting"}>
                                <PhoneXmarkIcon/>
                                <strong>Le professionnel de santé vient de mettre fin à la consultation</strong>
                                <div className={"bfm-patient-meet-layout-meeting-user-waiting__action"}>
                                    <button type={"button"} className={"bfm-button bfm-button--secondary"} onClick={() =>{
                                        navigate(-1)
                                    }}>
                                        <span>Quitter la consultation</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            !callAccepted ? (
                                <div className={"bfm-patient-meet-layout-meeting-user__waiting bfm-patient-meet-layout-meeting-user-waiting"}>

                                    <strong>Demander á participer la téléconsultation</strong>

                                    <div className={"bfm-patient-meet-layout-meeting-user-waiting__action"}>
                                        <button type={"button"} className={`bfm-button bfm-button--${active ? "disable" : "primary"}`} onClick={() =>{
                                            callUser(slug)
                                            setActive(true)
                                            setOpen(true)
                                        }}>
                                            <VideoIcon/> <span>Demander à participer</span>
                                        </button>
                                    </div>
                                    {
                                        open && (
                                            <WaitAfterAsk active={active} setActive={setActive}/>
                                        )
                                    }
                                </div>
                            ) : (
                                <>
                                    <video playsInline ref={userVideo} autoPlay/>
                                    {
                                        !hideVCamera && (
                                            <div className={"bfm-patient-meet-layout-meeting-user--empty"}>
                                                <div className={"bfm-patient-meet-layout-meeting-user--avatar"}>
                                                    <img src={userPlacehoder} alt="avatar"/>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        !muteVCamera && (
                                            <div className={"bfm-patient-meet-layout-meeting-user--mute"}>
                                                <MicrophoneSlashAltIcon/>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        )
                    }

                </div>
            </div>
            <div className={"bfm-patient-meet-layout__options"}>
                <button type={"button"} className={`bfm-patient-meet-layout-option ${!muteMCamera ? "active" : ""}`} onClick={() => {
                    muteCamera(slug)
                    setMuteMCamera(!muteMCamera)
                }}>
                    {
                        !muteMCamera ? (
                            <MicrophoneSlashAltIcon/>
                        ) : (
                            <MicrophoneAltIcon/>
                        )
                    }
                </button>
                <button type={"button"} className={`bfm-patient-meet-layout-option ${!hideMCamera ? "active" : ""}`} onClick={() => {
                    hideCamera(slug)
                    setHideMCamera(!hideMCamera)
                }}>
                    {
                        !hideMCamera ? (
                            <VideoSlashIcon/>
                        ) : (
                            <VideoIcon/>
                        )
                    }
                </button>
                {
                    callAccepted && !callQuite && (
                        <button type={"button"} className={"bfm-patient-meet-layout-option is--danger"} onClick={() => {
                            document.getElementById("quit_call").classList.add("is--open")
                        }}>
                            <PhoneXmarkIcon/>
                        </button>
                    )
                }
            </div>

            <div className={"bfm-modal"} id={"quit_call"}>
                <div className={"bfm-modal-content"}>
                    <button type={"button"} className={"bfm-modal-content__close"} onClick={() => document.getElementById("quit_call").classList.remove("is--open")}>
                        <XmarkLargeIcon/>
                    </button>
                    <div className={"bfm-modal-content__container"}>
                        <div className={"bfm-modal-content-contain"}>
                            <div className={"bfm-modal-content-contain__illustartion is--danger"}>
                                <PhoneXmarkIcon/>
                            </div>
                            <div className={"bfm-modal-content-contain__text"}>
                                <strong>Terminer la consultation</strong>
                                <p>Souhaitez-vous réellement mettre fin à la consultation </p>
                                <div className={"bfm-modal-content-contain__text--actions"}>
                                    <button className={"bfm-button bfm-button--reset"} type={"button"} onClick={() => document.getElementById("quit_call").classList.remove("is--open")}>
                                        <span>Annuler</span>
                                    </button>
                                    <button className={"bfm-button bfm-button--danger"} type={"button"} onClick={() => {
                                        navigate(-1)
                                    }}>
                                        <span>Terminer la consultation</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetModule;
