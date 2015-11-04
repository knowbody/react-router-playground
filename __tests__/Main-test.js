jest.dontMock('../src/Main');

import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';

const Root = require('../src/Main');

const rootComponent = renderIntoDocument(<Root />);

describe('App', () => {

  describe('Navigation', () => {
    const listItems = scryRenderedDOMComponentsWithTag(rootComponent, 'li')

    it('has three list items', () => {
      const numberOfListItems = listItems.length;
      expect(numberOfListItems).toEqual(3);
    });

    it('has second list item named About', () => {
      const secondListItemText = listItems[1].textContent;
      expect(secondListItemText).toEqual('About');
    });
  });
});
