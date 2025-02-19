# eslint-plugin-x-element

An [ESLint] plugin for [x-element].

## Explainer

The `x-element` library ships with a simple, efficient template engine. By design, 
its supported syntax is strict and _unforgiving_. This approach affords improved 
performance and minimizes template complexity.

This plugin improves the feedback loop while using the `x-element` template syntax
by detecting issues through static analysis and saving the need to test changes
in the browser one-by-one.

## Installation & Usage

```
npm install --save-dev @netflix/eslint-plugin-x-element
```

```js
import XElement from '@netflix/eslint-plugin-x-element';

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

[ESLint]: https://eslint.org
[x-element]: https://github.com/Netflix/x-element
