import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

import LinkerCard from '../src/components/linkerCard';

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

test('LinkerCard SnapShot', () => {
  const component = renderer.create(
    <LinkerCard
      linkers={[]}
    />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  const component2 = renderer.create(
    <LinkerCard
      linkers={[{
        type: 0,
        rType: null,
        text: "LINKER TEXT",
        rText: null,
      }]}
    />,
  );
  tree = component2.toJSON();
  expect(tree).toMatchSnapshot();
});

it("LinkerCard Set Style Test", () => {
  act(() => {
    render(
      <LinkerCard
        style={{ color: '#000' }}
        linkers={[{
          type: 0,
          rType: null,
          text: "LINKER TEXT",
          rText: null,
        }]}
      />, container);
  });

  const style1 = container.querySelector("button").style.color;

  act(() => {
    render(
    <LinkerCard
      style={{}}
      linkers={[{
        type: 0,
        rType: null,
        text: "LINKER TEXT",
        rText: null,
      }]}
    />, container);
  });

  const style2 = container.querySelector("button").style.color;

  expect(
    style1
  ).not.toBe(style2);
});

it("LinkerCard NoLinker Test", () => {
  act(() => {
    render(
    <LinkerCard
      style={{}}
      linkers={[]}
    />, container);
  });

  expect(
    container.querySelector("button").textContent
  ).toBe("No Linker");
});

it("LinkerCard LinkerType Variation Test", () => {
  const testlinkers = [
    {
      type: null,
      rType: 0,
      text: null,
      rText: "LINKER TEXT",
      result: 'To',
    },
    {
      type: null,
      rType: 1,
      text: null,
      rText: "LINKER TEXT",
      result: 'From',
    },
    {
      type: 0,
      rType: null,
      text: null,
      rText: "R LINKER TEXT",
      result: 'From',
    },
    {
      type: 1,
      rType: null,
      text: "LINKER TEXT",
      rText: null,
      result: 'To',
    },
    {
      type: 2,
      rType: null,
      text: "LINKER TEXT",
      rText: null,
      result: 'Equal',
    },
  ];

  testlinkers.map((item) => {
    act(() => {
      render(
        <LinkerCard
          style={{}}
          linkers={[item]}
        />, container)
    });

    expect(
      container.querySelector("button").textContent
    ).toBe(item.result);
  });

});