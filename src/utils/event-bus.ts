type EventPayload = {
  isModalOpened: boolean;
};

const eventBus = {
  on(event: string, callback: (payload: EventPayload) => void) {
    document.addEventListener(event, (e: Event) =>
      callback((<CustomEvent>e).detail)
    );
  },
  dispatch(event: string, payload: EventPayload) {
    document.dispatchEvent(new CustomEvent(event, { detail: payload }));
  },
  remove(event: string, callback?: () => void) {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;
