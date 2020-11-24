import Color from 'color';

// TODO: Modernize
/* eslint-disable */
export const range = function(start, end, step) {
  var range = [];
  var typeofStart = typeof start;
  var typeofEnd = typeof end;

  if (step === 0) {
    throw TypeError('Step cannot be zero.');
  }

  if (typeof end === 'undefined' && typeof 'step' === 'undefined') {
    end = start;
    start = 0;
    typeofStart = typeof start;
    typeofEnd = typeof end;
  }

  if (typeofStart == 'undefined' || typeofEnd == 'undefined') {
    throw TypeError('Must pass start and end arguments.');
  } else if (typeofStart != typeofEnd) {
    throw TypeError('Start and end arguments must be of same type.');
  }

  typeof step == 'undefined' && (step = 1);

  if (end < start) {
    step = -step;
  }

  if (typeofStart == 'number') {
    while (step > 0 ? end >= start : end <= start) {
      range.push(start);
      start += step;
    }
  } else if (typeofStart == 'string') {
    if (start.length != 1 || end.length != 1) {
      throw TypeError('Only strings with one character are supported.');
    }

    start = start.charCodeAt(0);
    end = end.charCodeAt(0);

    while (step > 0 ? end >= start : end <= start) {
      range.push(String.fromCharCode(start));
      start += step;
    }
  } else {
    throw TypeError('Only string and number types are supported');
  }

  return range;
};
/* eslint-enable */

export const shuffle = arr => {
  var shuffled = arr.slice(0),
    i = arr.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled;
};

export const sample = arr => arr[Math.floor(Math.random() * arr.length)];
export const sampleMany = (arr, size) => shuffle(arr).slice(0, size);

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

// eslint-disable-next-line no-shadow
export const sum = values => values.reduce((sum, value) => sum + value, 0);
export const mean = values => sum(values) / values.length;

export const clamp = (val, min = 0, max = 1) =>
  Math.max(min, Math.min(max, val));

export const roundTo = (number, places = 0) =>
  Math.round(number * 10 ** places) / 10 ** places;

export const debounce = (callback, wait, timeoutId = null) => (...args) => {
  window.clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    callback.apply(null, args);
  }, wait);
};

export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export const isEmpty = obj => Object.keys(obj).length === 0;

export const getInterpolatedValue = (y1, y2, ratio) => {
  // We're assuming that `ratio` is a value between 0 and 1.
  // If this were a graph, it'd be our `x`, and we're trying to solve for `y`.
  // First, find the slope of our line.
  const slope = y2 - y1;

  return slope * ratio + y1;
};

export const pick = (obj, keys) => {
  var o = {};
  var i = 0;
  var key;

  keys = Array.isArray(keys) ? keys : [keys];

  while ((key = keys[i++])) {
    if (typeof obj[key] !== 'undefined') {
      o[key] = obj[key];
    }
  }
  return o;
};

export const omit = function(obj, key) {
  var newObj = {};

  for (var name in obj) {
    if (name !== key) {
      newObj[name] = obj[name];
    }
  }

  return newObj;
};

export const convertArrayToMap = list =>
  list.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: item,
    }),
    {}
  );

// Either removes or adds an item to an array
// EXAMPLE: toggleInArray([1, 2], 3) -> [1, 2, 3]
// EXAMPLE: toggleInArray([1, 2], 2) -> [1]
export const toggleInArray = (arr, item) =>
  arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];

// Combines 2 arrays, removing duplicates.
// EXAMPLE: mergeUnique([1, 2], [2, 3]) -> [1, 2, 3]
export const mergeUnique = (arr1, arr2) =>
  arr1.concat(arr2.filter(item => arr1.indexOf(item) === -1));

export const findRight = (arr, predicate) =>
  arr
    .slice()
    .reverse()
    .find(predicate);

export function requestAnimationFramePromise() {
  return new Promise(resolve => window.requestAnimationFrame(resolve));
}

export function setTimeoutPromise(duration) {
  return new Promise(resolve => window.setTimeout(resolve, duration));
}

export const capitalize = str => str[0].toUpperCase() + str.slice(1);
export const capitalizeAll = str =>
  str
    .split(' ')
    .map(capitalize)
    .join(' ');

export const deleteCookie = key => {
  document.cookie = `${encodeURIComponent(
    key
  )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const convertHexToRGBA = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const hyphenate = str => str.replace(/([A-Z])/g, '-$1').toLowerCase();

export const delay = duration =>
  new Promise(resolve => window.setTimeout(resolve, duration));

export const getTimeOfDay = () => {
  const now = new Date();
  const hourOfDay = now.getHours();

  if (hourOfDay <= 4) {
    return 'night';
  } else if (hourOfDay <= 11) {
    return 'morning';
  } else if (hourOfDay <= 17) {
    return 'afternoon';
  } else if (hourOfDay <= 21) {
    return 'evening';
  } else {
    return 'night';
  }
};

export const hasPropChanged = (oldProps, newProps, key) => {
  return oldProps[key] !== newProps[key];
};

export const flatten = arr => Array.prototype.concat(...arr);

// This function takes a string input and parses the output
// to ensure to all html is rendered safely to the dom,
// and any trailing spaces are preserved from their original text
export const safeEscapeString = (val: string) =>
  (new DOMParser().parseFromString(
    // Wrapping the text in a span ensures textContent keeps the spaces
    // from the original text intact (span isn't rendered in the DOM)
    `<span>${val}</span>`,
    'text/html'
  ): any).body.textContent;

//
//
// given a hex/rgb/hsl color value, determine the most
// visible color to use to display text in front
const LUMA_THRESHOLD = 165;
const BASE_STACK_COLOR = { r: 255, g: 255, b: 255, alpha: 1 };

// weightings taken from SMPTE C, Rec. 709
// see http://en.wikipedia.org/wiki/Luma_%28video%29 for more info
const R_WEIGHT = 0.2126;
const G_WEIGHT = 0.7152;
const B_WEIGHT = 0.0722;
const luma = ({ r, g, b }) => r * R_WEIGHT + g * G_WEIGHT + b * B_WEIGHT;

// Given a stack of RGBA channels, calculate the effective
// color when displayed in a browser.
//
// The first argument is the "bottom" of the stack, the second
// is the next color up from the bottom, and so on.
const effectiveColorFromRgbaStack = (...layers) => {
  // remove falsey values
  layers = layers.filter(val => !!val);

  // remove fully transparent values
  layers = layers.filter(rgba => rgba.alpha);

  if (!layers.length) return BASE_STACK_COLOR;
  if (layers.length === 1) return layers[0];

  let base = { ...layers[0] };
  layers.slice(1).forEach(layer => {
    base.alpha = 1 - (1 - layer.alpha) * (1 - base.alpha);
    base.r = Math.round(
      (layer.r * layer.alpha) / base.alpha +
        (base.r * base.alpha * (1 - layer.alpha)) / base.alpha
    );
    base.g = Math.round(
      (layer.g * layer.alpha) / base.alpha +
        (base.g * base.alpha * (1 - layer.alpha)) / base.alpha
    );
    base.b = Math.round(
      (layer.b * layer.alpha) / base.alpha +
        (base.b * base.alpha * (1 - layer.alpha)) / base.alpha
    );
  });

  return base;
};

const getEffectiveRgb = color => {
  const channels = {
    alpha: 1,
    ...Color(color)
      .rgb()
      .object(),
  };

  if (channels.alpha !== 1)
    return effectiveColorFromRgbaStack(BASE_STACK_COLOR, channels);
  return channels;
};

export const contrastingColor = (
  backgroundColor,
  threshold = LUMA_THRESHOLD
) => {
  try {
    return luma(getEffectiveRgb(backgroundColor)) >= LUMA_THRESHOLD
      ? '#000'
      : '#fff';
  } catch (e) {
    console.warn(e + ', defaulting to #fff');
    return '#fff';
  }
};