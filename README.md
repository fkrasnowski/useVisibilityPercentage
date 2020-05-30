# useVisibilityPercentage

A react hook to measure percentage of element inside the window height(window.innerHeight).

## Installation

```sh
npm i use-visibilty-perctange --save
```

## Usage

Basic usage:

```jsx
import React from 'react';
import useVisibiltyPercentage from 'use-visibilty-percentage';

const Percent = () => {
  const [ref, percent] = useVisibiltyPercentage();

  return <div className='box' style={{ opacity: percent.toPrecision(2) }} />;
};
```

Using optional options:

```jsx
import React from 'react';
import useVisibiltyPerctange from 'use-visibilty-perctange';

const Percent = () => {
  const [ref, percent] = useVisibiltyPerctange({
    offsetTop: 20,
    offsetBottom: 20,
    throttle: 30,
  });

  return <div className='box' style={{ opacity: percent.toPrecision(2) }} />;
};
```

### Options

Provide these as object arguments in hook _( useVisibiltyPerctange({ **options** }) )_.

| Name             | Type   | Default | Required | Description                      |
| ---------------- | ------ | ------- | -------- | -------------------------------- |
| **offsetTop**    | number | 0       | false    | The top offset of window view    |
| **offsetBottom** | number | 0       | false    | The bottom offset of window view |
| **throttle**     | number | 16      | false    | The throttle time in miliseconds |

### To do

- Do tests!
