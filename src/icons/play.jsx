import * as React from 'react';
import BaseIcon from './_icon-base.jsx';

//Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
        
const PlayIcon = (props) => {
    const viewBox = "0 0 448 512";
    const d = "M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z";
    return (
        <BaseIcon d={d} viewBox={viewBox} color={props.color} hoverColor={props.hoverColor} size={props.size} onClickEvent={props.onClickEvent} tooltip={props.tooltip}/>
    )
};

export default PlayIcon;

