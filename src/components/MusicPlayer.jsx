import React, { useEffect, useState, useRef } from "react"
import MusicPlayerCSS from "./../assets/css/MusicPlayer.module.css"
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
import './../assets/css/AudioPlayer.scss'
import customIcons, { ShuffleButton } from "./../assets/svgs/CustomIcons.jsx"
import { motion } from "framer-motion"

const MusicPlayer = () => {
    // minimize functionality
    const [isMinimized, setMinimized] = useState(false);
    // const [audioState] = useState("playing");
    const playerRef = useRef();

    const handleToggleMinimize = () => {
        setMinimized(!isMinimized);
    }

    useEffect(() => {
        console.log("useEffect triggered", isMinimized);
        console.log(playerRef.current);

        if (playerRef.current && playerRef.current.audio.current) {
            if (isMinimized) {
                console.log("trigger1");
                playerRef.current.audio.current.pause();
            }
            else {
                console.log("trigger2");
                playerRef.current.audio.current.play();
            }
        }}, [isMinimized, playerRef])

    //     if (audioState === "playing" && playerRef.current && playerRef.current.audio.current) {
    //         playerRef.current.audio.current.play();
    //         console.log("playTriggered");
    //     }
    //     else if (playerRef.current && playerRef.current.audio.current) {
    //         playerRef.current.audio.current.pause();
    //         console.log("pauseTriggered");
    //     }
    // }, [audioState, playerRef, isMinimized])

    return (
        <div>
            <button onClick={handleToggleMinimize}>minimize</button>
            {!isMinimized && (
                <div>
                    <MusicPlayerContainer playerRef={playerRef}/>
                </div>
            )}
        </div>
    )
}

const MusicPlayerContainer = ({ playerRef }) => {
    // shuffle functionality
    const onClick = () => {
        console.log("shuffle clicked");
    }

    // music player
    return (
        <div className={MusicPlayerCSS.playerContainer}>
            <div className={MusicPlayerCSS.playerFilter}>
                <CustomAudioPlayer
                    ref={playerRef}
                    src="https://files.catbox.moe/w5scaz.mp3"
                    layout='stacked-reverse'
                    showSkipControls={true}
                    showJumpControls={false}
                    showFilledVolume={true}
                    showDownloadProgress={false}
                    customAdditionalControls={[
                        <ShuffleButton key="shuffle" onClick={onClick} />
                    ]}
                    customProgressBarSection={[
                        RHAP_UI.CURRENT_TIME,
                        RHAP_UI.PROGRESS_BAR,
                        RHAP_UI.CURRENT_LEFT_TIME
                    ]}
                    customControlsSection={[
                        RHAP_UI.ADDITIONAL_CONTROLS,
                        RHAP_UI.MAIN_CONTROLS,
                        RHAP_UI.LOOP
                    ]}
                    customIcons={customIcons}
                    autoPlayAfterSrcChange={false}
                    customVolumeControls={[]}
                />
            </div>
        </div>
    )
}

const CustomAudioPlayer = React.forwardRef((props, ref) => {
    return (
        <div>
            <AudioPlayer {...props} ref={ref}/>
            {/* <div>
                    <p>test</p>
                </div> */}
            {/* make container of audioplayer and these items
                into a flexbox? similar to navbar and have song/artist on left,
                and volume on right, use Advanced Usage section on github*/}
        </div>
    )
})

export default MusicPlayer