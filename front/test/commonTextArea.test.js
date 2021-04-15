import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import { fireEvent } from '@testing-library/react';

import CommonTextArea from '../src/components/commonTextArea';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('CommonTextArea SnapShot', () => {
  const component = renderer.create(
    <CommonTextArea
      value="test"
      onChange={() => {}}
      isDisabled={false}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('CommonTextArea onChangeEvent Test', () => {
  const onChange = jest.fn();
  act(() => {
    render(<CommonTextArea
      value="test"
      onChange={onChange}
      isDisabled={false}
    />, container);
  });

  const textarea = document.querySelector("textarea");
  fireEvent.change(textarea, { target: { value: 'a' } });

  expect(onChange.mock.calls.length).toBe(1);
});

it("CommonTextArea Disabled Test", () => {
  act(() => {
    render(<CommonTextArea
      value="test"
      onChange={() => {}}
      isDisabled={false}
    />, container);
  });
  expect(
    container.querySelector("textarea").getAttribute("disabled")
  ).toBeNull();

  act(() => {
    render(<CommonTextArea
      value="test"
      onChange={() => {}}
      isDisabled={true}
    />, container);
  });
  expect(
    container.querySelector("textarea").getAttribute("disabled")
  ).not.toBeNull();
});
