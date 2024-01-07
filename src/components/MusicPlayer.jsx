import React, { useState, useRef, forwardRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import MusicPlayerCSS from "./../assets/css/MusicPlayer.module.css"
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
import './../assets/css/AudioPlayer.scss'
import customIcons, { ShuffleButton, MinimizeIcon } from "../assets/svgs/PlayerCustomIcons.jsx"
import { musicData } from "../pages/data/musicData.jsx"
import { setCurrentTrack } from "../redux/musicPlayerSlice.jsx"

const MusicPlayer = () => {
    const dispatch = useDispatch();
    const currentTrack = useSelector(state => state.musicPlayer.currentTrack);

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
                    currentTrack={currentTrack}
                    dispatch={dispatch}
                />
            </div>
        </div>
    )
}

const MusicPlayerContainer = ({ playerRef, className, currentTrack, dispatch }) => {
    // shuffle functionality for the future
    const onClick = () => {
        console.log("shuffle clicked");
    }

    // next button
    const handleClickNext = () => {
        dispatch(setCurrentTrack(currentTrack < musicData.length - 1 ? currentTrack + 1 : 0))
    }

    // prev button
    const handleClickPrev = () => {
        dispatch(setCurrentTrack(currentTrack > 0 ? currentTrack - 1 : musicData.length - 1))
    }

    // track update for song end
    const handleEnd = () => {
        dispatch(setCurrentTrack(currentTrack < musicData.length - 1 ? currentTrack + 1 : 0))
    }

    // music player
    return (
        <div className={className}>
            <div className={MusicPlayerCSS.playerFilter}>
                <CustomAudioPlayer
                    ref={playerRef}
                    src={musicData[currentTrack].src}
                    currentTitle={musicData[currentTrack].title}
                    currentArtist={musicData[currentTrack].artist}
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

const CustomAudioPlayer = forwardRef(({ currentTitle, currentArtist, ...props }, ref) => {
    return (
        <div className={MusicPlayerCSS.customAudioPlayer}>
            <div className={MusicPlayerCSS.detailsContainer}>
                <h2 className={MusicPlayerCSS.title}>
                    {currentTitle}
                </h2>
                <p className={MusicPlayerCSS.artist}>
                    {currentArtist}
                </p>
            </div>
            <AudioPlayer {...props} ref={ref} className={MusicPlayerCSS.audioPlayer} />
            <div className={MusicPlayerCSS.volumeContainer}>
                <div className={MusicPlayerCSS.volumeWrapper}>
                    <AudioVolume audioRef={ref} />
                </div>
            </div>
        </div>
    )
})

const AudioVolume = (({ audioRef }) => {
    const [volume, setVolume] = useState(0.9); // set initial volume to 90%
    const [isMuted, setIsMuted] = useState(false);
    const [previousVolume, setPreviousVolume] = useState(0);
    const volumeIconPaths = {
        unmuted: "M215.03 72.04 126.06 161H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V89.02c0-21.47-25.96-31.98-40.97-16.98zm123.2 108.08c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 229.28 336 242.62 336 257c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.87z",
        muted: "M215.03 71.05 126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        audioRef.current.audio.current.volume = newVolume;
        setVolume(newVolume);
    }

    const toggleMute = () => {
        setIsMuted((prevMuteState) => {

            const newMuteState = !prevMuteState;

            if (newMuteState) {
                setPreviousVolume(volume);
                audioRef.current.audio.current.volume = 0;
            } else {
                audioRef.current.audio.current.volume = previousVolume;
            }
            return newMuteState;
        })
    }

    const getVolumeIcon = () => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="64 0 512 512">
                <path d={!isMuted ? volumeIconPaths.unmuted : volumeIconPaths.muted} />
            </svg>
            
        )
    }

    return (
        <>
            <button
                className={MusicPlayerCSS.volumeButton}
                onClick={toggleMute}
            >
                {getVolumeIcon(volume)}
            </button>
            <input
                className={MusicPlayerCSS.volumeInput}
                type="range"
                id="volume"
                name="volume"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
            />
        </>
    )
})

export default MusicPlayer