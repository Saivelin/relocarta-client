import * as React from 'react';

export const useOpenCloseToggle = (
  initial = false,
): [boolean, () => void, () => void, () => void] => {
  const [isOpen, setOpen] = React.useState(initial);

  const toggle = () => setOpen(!isOpen);
  const close = () => setOpen(false);
  const open = () => setOpen(true);

  return [isOpen, open, close, toggle];
};
