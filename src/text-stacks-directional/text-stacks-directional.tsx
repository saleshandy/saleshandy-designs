import React from "react";
import { IProps } from "./types";
import TextStack, { TextStackProps } from "../text-stack";

class TextStacksDirectional extends React.Component<IProps> {
  renderStacks(stacks: TextStackProps[]) {
    return stacks.map((stack, index) => <TextStack key={index} {...stack} />);
  }

  render() {
    const { stacks } = this.props;
    return (
      <div className='text-stack-directional-container'>
        {this.renderStacks(stacks)}
      </div>
    );
  }
}

export default TextStacksDirectional;
