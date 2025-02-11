# eslint-plugin-x-element

An eslint plugin for x-element.

## Explainer

The [x-element] base class comes with a built-in templating engine. By design,
this engine is _unforgiving_; which affords performance and complexity wins.

This eslint plugin allows developers to get contextualized linting hints in an
IDE without needing to actually execute their templates in a browser.

## Installation & Usage

```
npm install --save-dev eslint-plugin-x-element
```

```js
import XElement from 'eslint-plugin-x-element/index.js';

export default [
  /* … */
  {
    files: ['**/*.js'],
    plugins: { XElement },
    rules: { 'XElement/no-invalid-html': 'error' },
  },
  /* … */
];
```

[x-element]: https://github.com/Netflix/x-element
