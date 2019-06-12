import React from 'react';
import { Transition as ReactTransition } from 'react-transition-group';
import { View } from '../view'

function noop(): void { }

interface AnimationProps {
  in?: any;
  onEnter: () => void;
  onEntering: () => void;
  onEntered: () => void;
  onExit: () => void;
  onExiting: () => void;
  onExited: () => void;
  addEndListener: () => void;
  mountOnEnter: boolean;
  unmountOnExit: boolean;
  appear: boolean;
  duration: number;
  transitionClass?: string;
  children?: React.ReactElement<any>
}

export class Animation extends React.Component<AnimationProps, any>{

  static defaultProps: AnimationProps = {
    onEnter: noop,
    onEntering: noop,
    onEntered: noop,
    onExit: noop,
    onExiting: noop,
    onExited: noop,
    addEndListener: noop,
    mountOnEnter: false,
    unmountOnExit: false,
    appear: true,
    duration: 0
  };
  render() {
    const {
      in: inProp,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      addEndListener,
      unmountOnExit,
      appear,
      duration,
      mountOnEnter,
      transitionClass
    } = this.props;
    return (
      <ReactTransition
        onEnter={() => onEnter()}
        onEntering={() => onEntering()}
        onEntered={() => onEntered()}
        onExit={() => onExit()}
        onExiting={() => onExiting()}
        onExited={() => onExited()}
        addEndListener={() => addEndListener()}
        in={inProp}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        appear={appear}
        timeout={duration}
      >
        {
          state => (
            <View
              className={transitionClass[state]}
            >
              {this.props.children}
            </View>
          )
        }
      </ReactTransition>
    );
  }
}

