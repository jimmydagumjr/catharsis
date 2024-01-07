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

const AudioVolume = forwardRef(({ audioRef }) => {
    const [volume, setVolume] = useState(0.9); // set initial volume to 90%
    const [isMuted, setIsMuted] = useState(false);
    const [previousVolume, setPreviousVolume] = useState(0);
    const volumeIconPaths = {
        unmuted: "M16 42H6a3.00328 3.00328 0 0 1-3-3V25a3.00328 3.00328 0 0 1 3-3h10Zm19.394-31.71L18 21.19257v21.595l17.417 10.70071a2.98755 2.98755 0 0 0 4.5708-2.55566V12.833a3.01707 3.01707 0 0 0-4.5938-2.543Zm19.83252 6.56683a2.51845 2.51845 0 0 0-4.30952 1.72563 2.46717 2.46717 0 0 0 .67822 1.707A17.012 17.012 0 0 1 51.5957 43.684c-2.2583 2.31445 1.44458 5.80127 3.63086 3.43262a22.02473 22.02473 0 0 0 0-30.25975Zm-4 4.50293a2.49864 2.49864 0 0 0-3.70312 3.35547 11.006 11.006 0 0 1 0 14.543c-2.199 2.37964 1.5794 5.77075 3.70312 3.35547a16.01958 16.01958 0 0 0 .00004-21.2539Zm-3.896 16.55371a9.95694 9.95694 0 0 0 0-11.85351c-1.86457-2.62708-5.9878.38409-4.03907 2.94238a5.051 5.051 0 0 1 .00049 5.96875 2.40608 2.40608 0 0 0-.48 1.44922 2.52276 2.52276 0 0 0 4.51863 1.4932Z",
        muted: "m59.06958 40.48621-7.07086-7.07087-7.07 7.07a.99991.99991 0 0 1-1.41406-1.41406l7.07-7.07-7.07172-7.07171c-.93121-.90394.51068-2.345 1.41406-1.41407l7.07172 7.07172 7.07257-7.07257c.90393-.93121 2.345.51062 1.41406 1.41406l-7.07257 7.07257 7.07086 7.07086a.99991.99991 0 0 1-1.41406 1.41407ZM16 22H6a3.00328 3.00328 0 0 0-3 3v14a3.00328 3.00328 0 0 0 3 3h10Zm19.394-11.71L18 21.19257v21.595l17.417 10.70071a2.98755 2.98755 0 0 0 4.5708-2.55566V12.833a3.01707 3.01707 0 0 0-4.5938-2.543Z"
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
            <svg width="20" height="28" viewBox="0 -2 64 100">
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