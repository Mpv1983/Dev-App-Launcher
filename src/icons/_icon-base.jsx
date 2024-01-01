import * as React from 'react';
      
const BaseIcon = (props) => {

  const defaultColor = props.color;
  const hoverColor = props.hoverColor == undefined ? props.color : props.hoverColor;
  const deactivatedColor = props.deactivatedColor == undefined ? props.color : props.deactivatedColor;
  const cursor = props.onClickEvent == undefined ? 'inherit' : 'pointer'; 
  const tooltipClass = props.tooltip == undefined ? '' : 'tooltip'; 

  function onClickEventHandler(){
    if(props.onClickEvent == undefined){
      return;
    }

    props.onClickEvent();
  }

  return (

    <div className={tooltipClass}>
      {props.tooltip != undefined && <span class="tooltiptext">{props.tooltip}</span>}
      <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox={props.viewBox} 
          fill={props.color} 
          width={props.size} 
          height={props.size} 
          style= {{cursor:cursor}}
          onMouseOver={(e) => { e.currentTarget.style.fill = hoverColor; }}
          onMouseOut={(e) => { e.currentTarget.style.fill = defaultColor; }}
          onClick={onClickEventHandler}>

              <path d={props.d}/>
      </svg>
    </div>
  )
};

export default BaseIcon;

