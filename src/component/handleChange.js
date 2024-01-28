export default function handleChange(event, setter) {
    setter(event.target.value);
    return event.target.value;
}

export function handleCheckboxChange(event, setter) {
    setter(event.target.checked);
    return event.target.checked;
}