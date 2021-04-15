import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

import InfoCard from '../src/components/infoCard';

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

test('InfoCard SnapShot', () => {
  const component = renderer.create(
    <InfoCard
      isSelected={true}
    >
      Test
    </InfoCard>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("InfoCard isSelected Test", () => {
  act(() => {
    render(
      <InfoCard
        isSelected={false}
      >
        Test
      </InfoCard>, container,
    )
  });

  const notSelectedColor = container.querySelector("div").style.backgroundColor;

  act(() => {
    render(
      <InfoCard
        isSelected={true}
      >
        Test
      </InfoCard>, container,
    )
  });
  const selectedColor = container.querySelector("div").style.backgroundColor;

  expect(
    notSelectedColor
  ).not.toBe(selectedColor);

});

it("InfoCard InnerText Test", () => {
  act(() => {
    render(
      <InfoCard
        isSelected={false}
      />, container,
    )
  });

  expect(
    container.querySelector("div").innerHTML
  ).toBe('');

  act(() => {
    render(
      <InfoCard
        isSelected={true}
      >
        Test
      </InfoCard>, container,
    )
  });

  expect(
    container.querySelector("div").innerHTML
  ).toBe('Test');
});