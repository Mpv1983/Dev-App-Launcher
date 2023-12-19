import * as React from 'react';
import BaseIcon from './_icon-base.jsx';

//Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
        
const StopIcon = (props) => {
    const viewBox = "0 0 448 512";
    const d = "M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z";
    return (
        <BaseIcon d={d} viewBox={viewBox} color={props.color} hoverColor={props.hoverColor} size={props.size} onClickEvent={props.onClickEvent}/>
    )
};

export default StopIcon;

