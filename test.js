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

    // See “code coverage” section of “x-element” / “test-parser.js” test suite.
    invalid: [
      {
        code: 'html`<`',
        errors: [{ message: /^\[#100\]/ }],
      },
      {
        code: 'html`text<`',
        errors: [{ message: /^\[#101\]/ }],
      },
      {
        code: 'html`<!--comment--><`',
        errors: [{ message: /^\[#102\]/ }],
      },
      {
        code: 'const VALUE = 1; html`${VALUE}<`',
        errors: [{ message: /^\[#103\]/ }],
      },
      {
        code: 'html`<input !>`',
        errors: [{ message: /^\[#104\]/ }],
      },
      {
        code: 'html`<div><`',
        errors: [{ message: /^\[#105\]/ }],
      },
      {
        code: 'html`<div ?boolean="${VALUE}!`',
        errors: [{ message: /^\[#106\]/ }],
      },
      {
        code: 'html`<div ??defined="${VALUE}!`',
        errors: [{ message: /^\[#107\]/ }],
      },
      {
        code: 'html`<div attribute="${VALUE}!`',
        errors: [{ message: /^\[#108\]/ }],
      },
      {
        code: 'html`<div .property="${VALUE}!`',
        errors: [{ message: /^\[#109\]/ }],
      },
      {
        code: 'html`<div></div><`',
        errors: [{ message: /^\[#110\]/ }],
      },

      //////////////////////////////////////////////////////////////////////////

      {
        code: 'html`<dIv>`',
        errors: [{ message: /^\[#120\]/ }],
      },
      {
        code: 'html`<div	>`',
        errors: [{ message: /^\[#121\]/ }],
      },
      {
        code: 'html`<div foo />`',
        errors: [{ message: /^\[#122\]/ }],
      },
      {
        code: 'html`<div></ div>`',
        errors: [{ message: /^\[#123\]/ }],
      },
      {
        code: 'html`<div Boolean>`',
        errors: [{ message: /^\[#124\]/ }],
      },
      {
        code: 'html`<div ?Boolean="${VALUE}">`',
        errors: [{ message: /^\[#125\]/ }],
      },
      {
        code: 'html`<div .Property="${VALUE}">`',
        errors: [{ message: /^\[#126\]/ }],
      },
      {
        code: 'html`<div attribute="${VALUE}\'>`',
        errors: [{ message: /^\[#127\]/ }],
      },

      //////////////////////////////////////////////////////////////////////////

      {
        code: 'html`<![CDATA[<]]>`',
        errors: [{ message: /^\[#140\]/ }],
      },

      //////////////////////////////////////////////////////////////////////////

      {
        code: 'html`\\n`',
        errors: [{ message: /^\[#150\]/ }],
      },
      {
        code: 'html`&a`',
        errors: [{ message: /^\[#151\]/ }],
      },
      {
        code: 'html`<!-- -- -->`',
        errors: [{ message: /^\[#152\]/ }],
      },
      {
        code: 'html`<style>`',
        errors: [{ message: /^\[#153\]/ }],
      },
      {
        code: 'html`<div>`',
        errors: [{ message: /^\[#154\]/ }],
      },
      {
        code: 'html`<textarea> -- ${VALUE} -- </textarea>`',
        errors: [{ message: /^\[#155\]/ }],
      },
      {
        code: 'html`<template shadowrootmode>`',
        errors: [{ message: /^\[#156\]/ }],
      },
      {
        code: 'html`<template foo="${VALUE}`',
        errors: [{ message: /^\[#157\]/ }],
      },
    ],
  });
});
