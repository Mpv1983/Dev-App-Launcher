import * as React from 'react';
import BaseIcon from './_icon-base.jsx';

//Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
        
const SwaggerIcon = (props) => {
	const tooltipClass = props.tooltip == undefined ? '' : 'tooltip'; 
	const cursor = props.onClickEvent == undefined ? 'inherit' : 'pointer'; 

	// default size
	var circleXY = 14;
	var circleRadius = 12;
	var textX = 5;
	var textY = 17;
	var fontSize = '11px';
	var size = '25px';

	if(props.size != undefined){
		switch(props.size){
			case 'small':
				circleXY = 9;
				circleRadius = 8;
				textX = 2.55;
				textY = 11;
				fontSize = '8px';
				size = '18px';
				break;
		}
	}

	function onClickEventHandler(){
		if(props.onClickEvent == undefined){
		  return;
		}
	
		props.onClickEvent();
	  }

    return (
		<div className={tooltipClass}>
			{props.tooltip != undefined && <span className="tooltiptext">{props.tooltip}</span>}
			<svg 
			xmlns="http://www.w3.org/2000/svg" 
			height={size}
			width={size}
			style= {{cursor:cursor}}
			onClick={onClickEventHandler}>
				<circle cx={circleXY} cy={circleXY} r={circleRadius} stroke="#4b6e03" strokeWidth="2" fill="#94db04"></circle>
				<text x={textX} y={textY} fill="#4b6e03" fontWeight="bold" fontSize={fontSize}>&#123;...&#125;</text>
			</svg>
	  </div>

    )
};

export default SwaggerIcon;