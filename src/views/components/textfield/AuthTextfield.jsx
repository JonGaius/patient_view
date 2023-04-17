import React, {useEffect, useState} from 'react';

export const AuthTextfield = ({id, type, error, value, fnc, children, ...props}) => {
    const [etat, setEtat] = useState("");
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        fnc(e.target.value)
        let valeur = e.target.value
        if(!valeur){
            setEtat("bfm-auth-textfield--error")
            setMessage("Ce champ est obligatoire")
        }else{
            setEtat("")
            setMessage("")
            if(type === "email"){
                if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(valeur)){
                    setEtat("bfm-auth-textfield--error")
                    setMessage("Veuillez saisir une adresse email valide")
                }else{
                    setEtat("")
                    setMessage("")
                }
            }
        }
    }

    useEffect(() => {
        if(error){
            if(error.type === id){
                setEtat("bfm-auth-textfield--error")
                setMessage(error.message)
            }
        }
    }, [error, id]);

    return (
        <>
            <div className={`bfm-auth-textfield ${etat}`} id={id}>
                <input type={type} defaultValue={value} placeholder={children} id={"input-"+id} onFocus={() => {document.getElementById(id).classList.toggle("is--focused")}} onChange={handleChange} {...props} required />
            </div>
            {message && <span className={`bfm-auth-textfield__message ${etat}`}>
                {message}
            </span>}
        </>
    );
};