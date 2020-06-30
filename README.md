# useVisibilityPercentage

[![GitHub license](https://img.shields.io/github/license/fkrasnowski/useVisibilityPercentage)](https://github.com/fkrasnowski/useVisibilityPercentage/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A react hook to measure percentage of element inside the window height (window.innerHeight).

<img src="https://raw.githubusercontent.com/fkrasnowski/useVisibilityPercentage/master/media/use-visibilty-percentage.png"
style="max-height: 300px"
alt="Demonstration Image"
/>

## Installation

```sh
npm i use-visibilty-perctange --save
```

Or

```sh
yarn add use-visibility-percentage
```

## Usage

```jsx
const [ref, percent, position] = useVisibiltyPercentage(\ * { options } * \);
```

| Property | Type      | Description                                                   |
| -------- | --------- | ------------------------------------------------------------- |
| ref      | react ref | Ref to element you want to monitor                            |
| percent  | number    | Number between 0 and 1 indicating visible fragment of element |
| position | string    | One of values _('above', 'top','center', 'bottom', 'below' )_ |

Basic usage:

```jsx
import React from 'react';
import useVisibiltyPercentage from 'use-visibilty-percentage';

const Percent = () => {
  const [ref, percent] = useVisibiltyPercentage();

  return (
    <div
      ref={ref}
      className='box'
      style={{ opacity: percent.toPrecision(2) }}
    />
  );
};
```

Using optional options:

```jsx
import React from 'react';
import useVisibiltyPercentage from 'use-visibilty-percentage';

const Percent = () => {
  const [ref, percent] = useVisibiltyPercentage({
    offsetTop: 20,
    offsetBottom: 20,
    throttle: 30,
  });

  return (
    <div
      ref={ref}
      className='box'
      style={{ opacity: percent.toPrecision(2) }}
    />
  );
};
```

### Options

Provide these as object arguments in hook _( useVisibiltyPerctange({ **options** }) )_.

| Name             | Type   | Default | Required | Description                      |
| ---------------- | ------ | :-----: | :------: | -------------------------------- |
| **offsetTop**    | number |    0    |  false   | The top offset of window view    |
| **offsetBottom** | number |    0    |  false   | The bottom offset of window view |
| **throttle**     | number |   16    |  false   | The throttle time in miliseconds |

### To do

- Do tests!
