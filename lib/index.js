"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _lodash = _interopRequireDefault(require("lodash.throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useVisibiltyPerctange = function useVisibiltyPerctange() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$throttle = _ref.throttle,
      throttle = _ref$throttle === void 0 ? 16 : _ref$throttle,
      _ref$offsetTop = _ref.offsetTop,
      offsetTop = _ref$offsetTop === void 0 ? 0 : _ref$offsetTop,
      _ref$offsetBottom = _ref.offsetBottom,
      offsetBottom = _ref$offsetBottom === void 0 ? 0 : _ref$offsetBottom;

  var ref = (0, _react.useRef)();

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      percentage = _useState2[0],
      setPercentage = _useState2[1];

  (0, _react.useLayoutEffect)(function () {
    setPercentage(getPercentage(ref, window, offsetTop, offsetBottom));
    var scrollHandler = (0, _lodash["default"])(function () {
      return setPercentage(getPercentage(ref, window, offsetTop, offsetBottom));
    }, throttle);
    window.addEventListener('scroll', scrollHandler);
    return function () {
      return window.removeEventListener('scroll', scrollHandler);
    };
  }, [throttle, offsetTop, offsetBottom]);
  return [ref, percentage];
};

var getPercentage = function getPercentage(ref, window, offsetTop, offsetBottom) {
  var windowHeight = window.innerHeight;
  var value = 0;

  var _ref$current$getBound = ref.current.getBoundingClientRect(),
      top = _ref$current$getBound.top,
      bottom = _ref$current$getBound.bottom;

  var height = Math.abs(top - bottom);
  var ratio = (bottom - offsetTop) / height;
  var bottomRatio = (windowHeight - top - offsetBottom) / height;
  if (bottom + offsetBottom > windowHeight) value = bottomRatio;else value = ratio;
  return value > 1 ? 1 : value < 0 ? 0 : value;
};

var _default = useVisibiltyPerctange;
exports["default"] = _default;