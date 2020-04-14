export const mockedEvent = {
  preventDefault: () => {},
} as Event;

export const MockedEventWithValues = (value = 'MockedEvent', name = 'MockedEvent') => ({
  preventDefault: () => {},
  target: {
    name,
    value,
  },
});
