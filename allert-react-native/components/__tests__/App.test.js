import React from 'react';
import renderer from 'react-test-renderer';

import App from "../../App";

jest.useFakeTimers();

describe('<App />', () => {
  it('has 2 children', () => {
    const tree = renderer.create(<App/>).toJSON();

    jest.runAllTimers();

    expect(tree.children.length).toBe(2);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});