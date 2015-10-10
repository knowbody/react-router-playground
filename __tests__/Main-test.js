jest.dontMock('../src/Main.js');

// cannot use es6 modules syntax because
// jest.dontMock & jest.autoMockOff()
// do not understand ES6 modules yet

const React = require('react');
const { Root } = require('../src/Main');
const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = require('react-addons-test-utils');

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