import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

import NormalButton from '../src/components/NormalButton';

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

test('NormalButton SnapShot', () => {
  const component = renderer.create(
    <NormalButton
      title="Test Title"
      style={{}}
      isColored={false}
      isHidden={false}
      onClick={() => {}}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("NormalButton Title Test", () => {
  act(() => {
    render(<NormalButton
      title="Test Title"
      style={{}}
      isColored={false}
      isHidden={false}
      onClick={() => {}}
    />, container);
  });
  expect(container.textContent).toBe("Test Title");

  act(() => {
    render(<NormalButton
      title="test title"
      style={{}}
      isColored={false}
      isHidden={false}
      onClick={() => {}}
    />, container);
  });
  expect(container.textContent).toBe("test title");
});

it("NormalButton Set Style Test", () => {
  act(() => {
    render(<NormalButton
      title="Margin"
      style={{ margin: '5px' }}
      isColored={false}
      isHidden={false}
      onClick={() => {}}
    />, container);
  });
  expect(
    container.querySelector("button").getAttribute("style")
  ).toMatch('margin');

  act(() => {
    render(<NormalButton
      title="Margin"
      style={{ }}
      isColored={false}
      isHidden={false}
      onClick={() => {}}
    />, container);
  });
  expect(
    container.querySelector("button").getAttribute("style")
  ).not.toMatch('margin');
});

it("NormalButton isColored Test", () => {
  act(() => {
    render(<NormalButton
      title="Test"
      style={{ margin: '5px' }}
      isColored={false}
      isHidden={false}
      onClick={() => {}}
    />, container);
  });
  expect(
    container.querySelector("button").getAttribute("style")
  ).toMatch('color: rgb(255, 255, 255);');

  act(() => {
    render(<NormalButton
      title="Test"
      style={{ }}
      isColored={true}
      isHidden={false}
      onClick={() => {}}
    />, container);
  });
  expect(
    container.querySelector("button").getAttribute("style")
  ).toMatch('color: rgb(0, 153, 255);');
});

it("NormalButton Hidden Test", () => {
  act(() => {
    render(<NormalButton
      title="Test"
      style={{ margin: '5px' }}
      isColored={false}
      isHidden={false}
      onClick={() => {}}
    />, container);
  });
  expect(
    container.querySelector("button")
  ).not.toBeNull();

  act(() => {
    render(<NormalButton
      title="Test"
      style={{ }}
      isColored={true}
      isHidden={true}
      onClick={() => {}}
    />, container);
  });
  expect(
    container.querySelector("button")
  ).toBeNull();
});

it("NormalButton Click Test", () => {
  const onClick = jest.fn();
  act(() => {
    render(<NormalButton
      title="Test"
      style={{ margin: '5px' }}
      isColored={false}
      isHidden={false}
      onClick={onClick}
    />, container);
  });

  const button = document.querySelector("button");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onClick).toHaveBeenCalledTimes(1);
});

