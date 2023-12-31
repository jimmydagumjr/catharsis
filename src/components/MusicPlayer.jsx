import React, { useState, useRef } from "react"
import MusicPlayerCSS from "./../assets/css/MusicPlayer.module.css"
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
import './../assets/css/AudioPlayer.scss'
import customIcons, { ShuffleButton, MinimizeIcon } from "../assets/svgs/PlayerCustomIcons.jsx"
import { musicData } from "../pages/data/musicData.jsx"

const MusicPlayer = () => {
    // ignore for now will be used in volume controls; reference to audio file
    // i.e. playerRef.current.audio.current.play();
    const playerRef = useRef();
    const [isMinimized, setMinimized] = useState(false);
    // currently not in use; for fill transitions etc. in css file
    // const iconClass = isMinimized ? MusicPlayerCSS.minimizedIcon : MusicPlayerCSS.notMinimizedIcon;

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
                    <MinimizeIcon
                        isMinimized={isMinimized}
                    // iconClass={`${MusicPlayerCSS.minimizeIcon} ${iconClass}`}
                    />
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

    const [currentTrack, setTrackIndex] = useState(0)
    const handleClickNext = () => {
        setTrackIndex((currentTrack) =>
            currentTrack < musicData.length - 1 ? currentTrack + 1 : 0
        )
    }

    const handleClickPrev = () => {
        setTrackIndex((currentTrack) =>
            currentTrack > 0 ? currentTrack - 1 : musicData.length - 1
        )
    }

    const handleEnd = () => {
        setTrackIndex((currentTrack) =>
            currentTrack < musicData.length - 1 ? currentTrack + 1 : 0
        )
    }

    // music player
    return (
        <div className={className}>
            <div className={MusicPlayerCSS.playerFilter}>
                <CustomAudioPlayer
                    ref={playerRef}
                    src={musicData[currentTrack].src}
                    onClickNext={handleClickNext}
                    onClickPrevious={handleClickPrev}
                    onEnded={handleEnd}
                    // layout & buttons
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
                    autoPlayAfterSrcChange={true}
                    customVolumeControls={[]}
                />
            </div>
        </div>
    )
}

const CustomAudioPlayer = React.forwardRef((props, ref) => {
    return (
        <div className={MusicPlayerCSS.customAudioPlayer}>
            <div className={MusicPlayerCSS.detailsContainer}>
                <p>song/artist</p>
            </div>
            <AudioPlayer {...props} ref={ref} />
            <div className={MusicPlayerCSS.volumeContainer}>
                <p>volume</p>
            </div>
        </div>
    )
})

export default MusicPlayer