
function subscribe(eventName: string, listener: VoidFunction) {
    document.addEventListener(eventName, listener);
}

function unsubscribe(eventName: string, listener: VoidFunction) {
    document.removeEventListener(eventName, listener);
}

function publish(eventName: string, data?: string) {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe};