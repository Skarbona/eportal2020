/* eslint-disable @typescript-eslint/no-explicit-any */
export const mockedEvent = {
  preventDefault: () => {},
} as Event;

export const MockedEventWithValues = (
  value = 'MockedEvent',
  name = 'MockedEvent',
): Partial<Event> =>
  ({
    preventDefault: () => {},
    target: {
      name,
      value,
    },
  } as any);
