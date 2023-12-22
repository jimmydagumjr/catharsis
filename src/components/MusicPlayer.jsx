import React, { useState, useRef } from "react"
import MusicPlayerCSS from "./../assets/css/MusicPlayer.module.css"
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
import './../assets/css/AudioPlayer.scss'
import customIcons, { ShuffleButton } from "./../assets/svgs/CustomIcons.jsx"

const MusicPlayer = () => {
    // ignore for now will be used in volume controls; reference to audio file
    // i.e. playerRef.current.audio.current.play();
    const playerRef = useRef();
    const [isMinimized, setMinimized] = useState(false);

    const handleToggleMinimize = () => {
        setMinimized(!isMinimized);
    }
    return (
        <div>
            <div className={MusicPlayerCSS.minButtonContainer}
                style={{ bottom: isMinimized ? '1.4rem' : '10.2rem' }}
            >
                <button
                    className={MusicPlayerCSS.minButton}
                    onClick={handleToggleMinimize}
                >
                    minimize
                </button>
            </div>
            <div>
                <MusicPlayerContainer
                    playerRef={playerRef}
                    className={`${MusicPlayerCSS.playerContainer} ${isMinimized ? MusicPlayerCSS.minimized : ''}`}
                />
            </div>
        </div>
    )
}

const MusicPlayerContainer = ({ playerRef, className }) => {
    // shuffle functionality for the future when playlist added
    const onClick = () => {
        console.log("shuffle clicked");
    }

    // music player
    return (
        <div className={className}>
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
            <AudioPlayer {...props} ref={ref} />
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