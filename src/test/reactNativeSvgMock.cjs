const React = require('react');
const { View } = require('react-native');

function SvgXml(props) {
  return React.createElement(View, {
    testID: props.testID || 'svg-xml',
    accessibilityLabel: props.accessibilityLabel,
  });
}

module.exports = {
  __esModule: true,
  default: SvgXml,
  SvgXml,
  Svg: View,
  Circle: View,
  Path: View,
  G: View,
  Rect: View,
  Line: View,
  Defs: View,
  ClipPath: View,
};
