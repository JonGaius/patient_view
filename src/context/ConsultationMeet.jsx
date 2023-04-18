import React, {createContext, useState, useRef, useEffect, useCallback} from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const MeetSocketContext = createContext();

const socket = io('http://consutation.jonathangaius.com/');
//const socket = io('http://localhost:5000');
const ConsultationMeet = ({children}) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [user, setUser] = useState(null);
    const [openC, setOpenC] = useState(false);

    const [hideCam, setHideCam] = useState(true);
    const [muteCam, setMuteCam] = useState(true);

    const [hideVCam, setHideVCam] = useState(null);
    const [muteVCam, setMuteVCam] = useState(null);

    const [callQuite, setCallQuite] = useState(false);

    const [call, setCall] = useState({});
    const [me, setMe] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    const join_channel = useCallback(
        (slug) => {
            let data = {
                room: slug
            }
            socket.emit("join_channel", data)
        },[]
    )

    useEffect(() => {
        const startMediaStream = async () => {
            try {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                    .then((currentStream) => {
                        setStream(currentStream);
                        if(myVideo && myVideo.current){
                            myVideo.current.srcObject = currentStream;
                        }
                    });
            } catch (e) {
                console.log('Error accessing media devices', e);
            }

        }

        startMediaStream();

        socket.on('me', (id) => setMe(id));

        socket.on('call_user', (data) => {
            setCall({ isReceivingCall: true, ...data });
        });

    }, [openC]);

    useEffect(() => {
        if(stream){
            let videoTrack = stream.getVideoTracks()[0];
            let audioTrack = stream.getAudioTracks()[0];
            videoTrack.enabled = hideCam;
            audioTrack.enabled = muteCam;
        }

    }, [hideCam, muteCam, stream])

    useEffect(() => {
        socket.on('mute_call_send', (data) => {
            setMuteVCam(data);
        });
        socket.on('hide_call_send', (data) => {
            setHideVCam(data);
        });
    }, [])

    useEffect(() => {
        socket.on('call_ended', () => {
            setCallEnded(true);
        });
    }, [])

    useEffect(() => {
        socket.on('call_quite', () => {
            setCallQuite(true);
        });
    }, [])

    const hideCamera = (slug) => {
        setHideCam(!hideCam)
        socket.emit('hide_call', {
            room: slug,
            me,
            statut: !hideCam
        })
    }

    const muteCamera = (slug) => {
        setMuteCam(!muteCam)
        socket.emit('mute_call', {
            room: slug,
            me,
            statut: !muteCam
        })
    }
    const answerCall = (slug) => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answer_call', { signal: data, room: slug});
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };
    const callUser = (slug) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('call_user', {room: slug, signalData: data, user: {name: "Jon"}, me });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('call_accepted', (data) => {
            setCallAccepted(true);
            console.log(data)
            peer.signal(data.signal);
        });

        connectionRef.current = peer;
    };
    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    };

    return (
        <MeetSocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            user,
            setUser,
            callEnded,
            me,
            setOpenC,
            join_channel,
            callUser,
            leaveCall,
            answerCall,
            hideCamera,
            muteCamera,
            hideVCam,
            muteVCam,
            callQuite
        }}>
            {children}
        </MeetSocketContext.Provider>
    )
};

export {ConsultationMeet, MeetSocketContext}
