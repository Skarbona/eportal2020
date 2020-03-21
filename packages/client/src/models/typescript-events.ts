import React from 'react';

export type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type SelectChangeEvent = React.ChangeEvent<{ value: unknown }>;