import { RuleTester } from 'eslint';
import test from 'node:test';
import EslintPluginXElement from './index.js';

const ruleTester = new RuleTester();

test('no-invalid-html', (/*context*/) => {
  const rule = EslintPluginXElement.rules['no-invalid-html'];
  ruleTester.run('x-element/no-invalid-html', rule, {
    valid: [
      {
        code: 'html``',
      },
      {
        code: 'html`hello world`',
      },
      {
        code: 'html`<div></div>`',
      },
      {
        code: 'html`<div>${\'\'}</div>`',
      },
    ],

    invalid: [
      {
        code: 'html`<`',
        errors: [{ message: /^\[#100\]/ }],
      },
      {
        code: 'html`foo<`',
        errors: [{ message: /^\[#101\]/ }],
      },
      {
        code: 'html`<!--comment--><`',
        errors: [{ message: /^\[#102\]/ }],
      },
      {
        code: 'html`${\'interpolation\'}<`',
        errors: [{ message: /^\[#103\]/ }],
      },
      // TODO: Impossible case?
      // {
      //   code: '…',
      //   errors: [{ message: /^\[#104\]/ }],
      // },
      {
        code: 'html`<div !>`',
        errors: [{ message: /^\[#105\]/ }],
      },
      {
        code: 'html`<div><`',
        errors: [{ message: /^\[#106\]/ }],
      },
      // TODO: Impossible case?
      // {
      //   code: '…',
      //   errors: [{ message: /^\[#107\]/ }],
      // },
      // TODO: Impossible case?
      // {
      //   code: '…',
      //   errors: [{ message: /^\[#108\]/ }],
      // },
      // TODO: Impossible case?
      // {
      //   code: '…',
      //   errors: [{ message: /^\[#109\]/ }],
      // },
      // TODO: Impossible case?
      // {
      //   code: '…',
      //   errors: [{ message: /^\[#110\]/ }],
      // },
      // TODO: Impossible case?
      // {
      //   code: '…',
      //   errors: [{ message: /^\[#111\]/ }],
      // },
      // TODO: Impossible case?
      // {
      //   code: '…',
      //   errors: [{ message: /^\[#112\]/ }],
      // },
      // TODO: Impossible case?
      // {
      //   code: '…',
      //   errors: [{ message: /^\[#113\]/ }],
      // },
      {
        code: 'html`<div></div><`',
        errors: [{ message: /^\[#114\]/ }],
      },

      {
        code: 'html`< div>`',
        errors: [{ message: /^\[#120\]/ }],
      },
      {
        code: 'html`<div\t>`',
        errors: [{ message: /^\[#121\]/ }],
      },
      // TODO: Impossible case?
      // {
      //   code: '…',
      //   errors: [{ message: /^\[#122\]/ }],
      // },
      {
        code: 'html`<div>< /div>`',
        errors: [{ message: /^\[#123\]/ }],
      },
      {
        code: 'html`<div -foo>`',
        errors: [{ message: /^\[#124\]/ }],
      },
      {
        code: 'html`<div -foo="bar">`',
        errors: [{ message: /^\[#125\]/ }],
      },
      {
        code: 'html`<div ?-foo="${\'interpolation\'}">`',
        errors: [{ message: /^\[#126\]/ }],
      },
      {
        code: 'html`<div ??-foo="${\'interpolation\'}">`',
        errors: [{ message: /^\[#127\]/ }],
      },
      {
        code: 'html`<div -foo="${\'interpolation\'}">`',
        errors: [{ message: /^\[#128\]/ }],
      },
      {
        code: 'html`<div ._foo="${\'interpolation\'}">`',
        errors: [{ message: /^\[#129\]/ }],
      },
      {
        code: 'html`<div foo="${\'interpolation\'}\'>`',
        errors: [{ message: /^\[#130\]/ }],
      },

      {
        code: 'html`<![CDATA[x < y]]>`',
        errors: [{ message: /^\[#140\]/ }],
      },

      {
        code: 'html`\\n`',
        errors: [{ message: /^\[#150\]/ }],
      },
      {
        code: 'html`&ambiguous`',
        errors: [{ message: /^\[#151\]/ }],
      },
      {
        code: 'html`<!-->-->`',
        errors: [{ message: /^\[#152\]/ }],
      },
      {
        code: 'html`<foo></foo>`',
        errors: [{ message: /^\[#153\]/ }],
      },
      {
        code: 'html`<svg></svg>`',
        errors: [{ message: /^\[#153\]/ }],
      },
      {
        code: 'html`<main>`',
        errors: [{ message: /^\[#154\]/ }],
      },
      {
        code: 'html`<main></section>`',
        errors: [{ message: /^\[#155\]/ }],
      },
      {
        code: 'html`<textarea> ${\'interpolation\'} </textarea>`',
        errors: [{ message: /^\[#156\]/ }],
      },
      {
        code: 'html`<template shadowrootmode="open"></template>`',
        errors: [{ message: /^\[#157\]/ }],
      },
    ],
  });
});
