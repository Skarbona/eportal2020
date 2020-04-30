import React, { FC, memo, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

interface Props {
  show: boolean;
  classNames?: string;
  timeout?: number;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  children: ReactNode;
}

export const FadeComponent: FC<Props> = ({
  show,
  classNames = 'transition-animation',
  timeout = 500,
  mountOnEnter = true,
  unmountOnExit = true,
  children,
}) => {
  return (
    <CSSTransition
      in={show}
      timeout={timeout}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      classNames={classNames}
    >
      <>{children}</>
    </CSSTransition>
  );
};

export default memo(FadeComponent);
