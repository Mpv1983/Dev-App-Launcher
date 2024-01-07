export default function handleChange(event, setter) {
    setter(event.target.value);
    return event.target.value;
}