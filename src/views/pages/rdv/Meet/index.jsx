import React, {useEffect} from 'react';
import MeetModule from "./MeetModule";
import {useParams} from "react-router-dom";
import {ConsultationMeet} from "../../../../context/ConsultationMeet";

export const Meet = () => {
    const {slug} = useParams()
    useEffect(() => {
        return () => {
            window.location.reload()
        }
    },[])
    return (
        <ConsultationMeet>
        <div className={"bfm-patient-meet-layout"}>
            <MeetModule slug={slug}/>
        </div>
        </ConsultationMeet>
    );
};
