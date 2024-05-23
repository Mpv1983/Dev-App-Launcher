export default function handleChange(event, setter, postProcessing) {
    
    setter(event.target.value);

    if(postProcessing != undefined){
        postProcessing();
    }

    return event.target.value;
}

export function handleCheckboxChange(event, setter, postProcessing) {

    setter(event.target.checked);

    if(postProcessing != undefined){
        postProcessing();
    }

    return event.target.checked;
}