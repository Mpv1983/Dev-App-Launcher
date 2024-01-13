import * as React from 'react';

const WebAppIcon = (props) => {
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
				textY = 12;
				fontSize = '9px';
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
				<circle cx={circleXY} cy={circleXY} r={circleRadius} stroke="#023a3b" strokeWidth="2" fill="#20c7c9"></circle>
				<text x={textX} y={textY} fill="#023a3b" fontWeight="bold" fontSize={fontSize}>&lt;/&gt;</text>
			</svg>
	  </div>

    )
};

export default WebAppIcon;