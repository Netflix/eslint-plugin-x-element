import { XParser } from '@netflix/x-element/x-parser.js';

class MockWindow {
  static #getMockNode = () => {
    return {
      appendChild() {/* Do nothing. */},
      textContent: '',
    };
  };
  static #getMockCommentNode = () => {
    return { ...MockWindow.#getMockNode() };
  };
  static #getMockTextNode = () => {
    return { ...MockWindow.#getMockNode() };
  };
  static #getMockElement = () => {
    return {
      ...MockWindow.#getMockNode(),
      __attributes: {},
      setAttribute(name, value) { this.__attributes[name] = value; },
      hasAttribute(name) { return Reflect.has(this.__attributes, name); },
      append() {/* Do nothing. */},
      cloneNode() { return MockWindow.#getMockElement(); },
    };
  };
  static #getMockDocumentFragment = () => {
    return { ...MockWindow.#getMockElement() };
  };
  static #getMockTemplate = () => {
    return {
      ...MockWindow.#getMockElement(),
      content: MockWindow.#getMockDocumentFragment(),
    };
  };

  static get console() {
    return { warn: () => {/* Do nothing. */} };
  }

  static get document() {
    return {
      createDocumentFragment() {
        return MockWindow.#getMockDocumentFragment();
      },
      createElementNS() {
        return MockWindow.#getMockElement();
      },
      createElement(localName) {
        return localName === 'template'
          ? MockWindow.#getMockTemplate()
          : MockWindow.#getMockElement();
      },
      createTextNode() {
        return MockWindow.#getMockTextNode();
      },
      createComment() {
        return MockWindow.#getMockCommentNode();
      },
    };
  }
}
const validator = new XParser({ window: MockWindow });
const onBoolean = () => {};
const onDefined = () => {};
const onAttribute = () => {};
const onProperty = () => {};
const onContent = () => {};
const onText = () => {};
const validate = strings => {
  validator.parse(strings, onBoolean, onDefined, onAttribute, onProperty, onContent, onText);
};

// Attempts to put a squiggle beneath the whole _line_ which is problematic.
const getLoc = (node, quasis, context) => {
  if (context) {
    const { stringsIndex, string, stringIndex } = context;
    const quasi = quasis[stringsIndex];
    if (quasi) {
      // Most cases will fall here.
      const startLine = quasi.loc.start.line;
      const startColumn = quasi.loc.start.column;
      const stringPrefix = string.slice(0, stringIndex);
      const problemStartLine = stringPrefix.split('\n').length;
      const problemLine = string.split('\n')[problemStartLine - 1];
      const indentationMatch = problemLine.match(/(^ *)[^ ]/);
      const indentation = indentationMatch ? indentationMatch[1].length : 0;
      const line = startLine + problemStartLine - 1;
      if (line === startLine) {
        return { start: { line, column: startColumn + 1 + indentation }, end: { line, column: startColumn + 1 + problemLine.length } };
      } else {
        return { start: { line, column: indentation }, end: { line, column: problemLine.length } };
      }
    } else {
      // Certain exit criteria will fall here (e.g., missing closing tag).
      const nodeEndLine = node.loc.end.line;
      const nodeEndColumn = node.loc.end.column;
      const line = nodeEndLine;
      return { start: { line, column: nodeEndColumn - 1 }, end: { line, column: nodeEndColumn } };
    }
  } else {
    return node.tag.loc;
  }
};

// Shortens the full error since we will have contextualization within the IDE.
const format = error => {
  const message = error.message;
  const firstLine = message.split('\n')[0];
  return firstLine;
};

const validateTaggedTemplateExpression = (context, node) => {
  if (node.tag.name === 'html') {
    const quasis = node.quasi.quasis;
    if (quasis) {
      const strings = quasis.map(value => value.value.cooked);
      strings.raw = quasis.map(value => value.value.raw);
      Object.freeze(strings.raw);
      Object.freeze(strings);
      try {
        validate(strings);
      } catch (error) {
        // https://eslint.org/docs/latest/extend/custom-rules#reporting-problems
        context.report({
          node,
          message: format(error),
          loc: getLoc(node, quasis, XParser.getErrorContext(error)),
        });
      }
    }
  }
};

export default {
  meta: {
    name: 'XElement',
    type: 'problem',
    docs: {
      description: 'Enforce html template validation for x-element.',
      url: 'https://github.com/Netflix/eslint-plugin-x-element',
    },
  },
  create: context => {
    return {
      TaggedTemplateExpression: node => {
        validateTaggedTemplateExpression(context, node);
      },
    };
  },
};
