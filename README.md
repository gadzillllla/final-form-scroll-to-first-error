# final-form-scroll-to-first-error

Decorator for [🏁 Final Form](https://github.com/final-form/final-form) that
will attempt to scroll to the first field with an error upon an attempted form submission.

Thanks to the author of [final-form-focus](https://github.com/final-form/final-form-focus) for the sample. =)

## Installation

```bash
npm install final-form-scroll-to-first-error
```

or

```bash
yarn add final-form-scroll-to-first-error
```

## Usage

### 🏁 Final Form Usage

```js
import { createForm } from 'final-form'
import { createScrollToErrorDecorator } from 'final-form-scroll-to-first-error'

const form = createForm({ onSubmit })
const decorator = createScrollToErrorDecorator()
const undecorate = decorator(form)

```

### 🏁 React Final Form Usage

```js
import React from 'react'
import { Form, Field } from 'react-final-form'
import { createScrollToErrorDecorator } from 'final-form-scroll-to-first-error'

const focusOnErrors = createScrollToErrorDecorator()
...
<Form
  onSubmit={submit}
  decorators={[ focusOnErrors ]} // <----- add here
  render={({ handleSubmit }) =>
    <form onSubmit={handleSubmit}>
    ...
    </form>
  }
/>
```

## Important
Element classes must contain the string "error" when form submit is failed.