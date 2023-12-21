import React from "react"
import MusicPlayerCSS from "./../assets/css/MusicPlayer.module.css"
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player"
import './../assets/css/AudioPlayer.scss'
import customIcons from "./../assets/svgs/CustomIcons.jsx"

const MusicPlayer = () => {
    const onClick = () => {
        console.log("shuffle clicked");
    }
    return (
        <div className={MusicPlayerCSS.playerContainer}>
            <div className={MusicPlayerCSS.playerFilter}>
                <CustomAudioPlayer
                    src="https://files.catbox.moe/w5scaz.mp3"
                    layout='stacked-reverse'
                    showSkipControls={true}
                    showJumpControls={false}
                    showFilledVolume={true}
                    showDownloadProgress={false}
                    customAdditionalControls={
                        [
                            <ShuffleButton key="shuffle" onClick={onClick} />
                        ]
                    }
                    customProgressBarSection={
                        [
                            RHAP_UI.CURRENT_TIME,
                            RHAP_UI.PROGRESS_BAR,
                            RHAP_UI.CURRENT_LEFT_TIME
                        ]
                    }
                    customControlsSection={
                        [
                            RHAP_UI.ADDITIONAL_CONTROLS,
                            RHAP_UI.MAIN_CONTROLS,
                            RHAP_UI.LOOP
                        ]
                    }
                    customIcons={customIcons}
                    autoPlayAfterSrcChange={false}
                    customVolumeControls={[]}
                />
            </div>
        </div>
    )
}

class CustomAudioPlayer extends React.Component {
    render() {
        return (
            <div>
                <AudioPlayer {...this.props} />
                {/* <div>
                    <p>test</p>
                </div> */}
                {/* make container of audioplayer and these items
                into a flexbox? similar to navbar and have song/artist on left,
                and volume on right, use Advanced Usage section on github*/}
            </div>
        )
    }
}

const ShuffleButton = ({ onClick }) => {
    return (
        <button onClick={onClick}>
            <svg width="1.4rem" height="1.4rem" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M3 8h2.28a6 6 0 0 1 4.51 2.05L13.21 14a6 6 0 0 0 4.51 2H21"
                    style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}
                />
                <path
                    style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}
                    d="m19 14 2 2-2 2"
                />
                <path
                    style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}
                    d="M21 8h-3.28a6 6 0 0 0-4.51 2.05L9.79 14a6 6 0 0 1-4.51 2H3"
                />
                <path
                    style={{ fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}
                    d="m19 6 2 2-2 2"
                />
            </svg>
        </button>
    )
}



export default MusicPlayer