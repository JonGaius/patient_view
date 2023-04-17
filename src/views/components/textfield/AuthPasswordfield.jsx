import React, {useEffect, useState} from 'react';
import {EyeIcon, EyeSlashIcon} from "../../../dist/icons";

export const AuthPasswordfield = ({id, error, value, fnc,children, ...props}) => {
    const [etat, setEtat] = useState("");
    const [message, setMessage] = useState("");
    const [type, setType] = useState(true);

    const handleChange = (e) => {
        fnc(e.target.value)
    }


    useEffect(() => {
        if(error){
            if(error.type === id){
                setEtat("bfm-auth-passwordfield--error")
                setMessage(error.message)
            }
        }
    }, [error, id]);

    return (
        <>
            <div className={`bfm-auth-passwordfield ${etat}`} id={id}>
                <input type={type ? "password" : "text"} defaultValue={value} id={"input-"+id} onFocus={() => {
                    document.getElementById(id).classList.toggle("is--focused")
                }} onChange={handleChange} {...props} placeholder={children} required/>

                <button type={"button"} onClick={() => setType(!type)}>
                    {type ? <EyeIcon/> : <EyeSlashIcon/>}
                </button>


            </div>
            {message && <span className={`bfm-auth-passwordfield__message ${etat}`}>
                {message}
            </span>}
        </>
    );
};