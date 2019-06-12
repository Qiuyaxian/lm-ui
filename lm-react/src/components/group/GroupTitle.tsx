import React from 'react';
import { Component, ComponentProps } from '@src/core';

interface GroupTitleProps extends ComponentProps {
  headerLabel: string
  headerValue: string
};

export default class GroupTitle extends Component<GroupTitleProps, any> {

  constructor(props: GroupTitleProps) {
    super(props);
  }

  render() {
    let { children, headerValue, headerLabel } = this.props;
    return (
      <div className={this.className('lm-form-preview-header')}>
        {
          (headerValue || headerLabel) ? (
            <React.Fragment>
              <label className={this.className('lm-form-preview-label')}>{headerLabel}</label>
              <span className={this.className('lm-form-preview-value')}>{headerValue}</span>
            </React.Fragment>
          ) : (<React.Fragment>{children}</React.Fragment>)
        }
      </div>
    );
  };
};

