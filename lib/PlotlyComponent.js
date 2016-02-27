'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');
var Plotly = require('plotly.js');

var PlotlyComponent = React.createClass({

  displayName: 'Plotly',
  propTypes: {
    data: React.PropTypes.array,
    layout: React.PropTypes.object,
    config: React.PropTypes.object,
    onClick: React.PropTypes.func,
    onBeforeHover: React.PropTypes.func,
    onHover: React.PropTypes.func,
    onUnHover: React.PropTypes.func,
    onSelected: React.PropTypes.func
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
    //TODO logic for detecting change in props
    return true;
  },
  componentDidMount: function componentDidMount() {
    var _props = this.props;
    var data = _props.data;
    var layout = _props.layout;
    var config = _props.config;

    Plotly.plot(this.container, data, layout, config);
    this.props.onClick && this.container.on('plotly_click', this.props.onClick);
    this.props.onBeforeHover && this.container.on('plotly_beforehover', this.props.onBeforeHover);
    this.props.onHover && this.container.on('plotly_hover', this.props.onHover);
    this.props.onUnHover && this.container.on('plotly_unhover', this.props.onUnHover);
    this.props.onSelected && this.container.on('plotly_selected', this.props.onSelected);
  },
  componentDidUpdate: function componentDidUpdate() {
    //TODO use minimal update for given changes
    this.container.data = this.props.data;
    this.container.layout = this.props.layout;
    Plotly.redraw(this.container);
  },


  componentWillUnmount: function componentWillUnmount() {
    this.container.removeAllListeners('plotly_click');
    this.container.removeAllListeners('plotly_beforehover');
    this.container.removeAllListeners('plotly_hover');
    this.container.removeAllListeners('plotly_unhover');
    this.container.removeAllListeners('plotly_selected');
  },

  render: function render() {
    var _this = this;

    var _props2 = this.props;
    var data = _props2.data;
    var layout = _props2.layout;
    var config = _props2.config;

    var other = _objectWithoutProperties(_props2, ['data', 'layout', 'config']);

    return React.createElement('div', _extends({}, other, { ref: function ref(node) {
        return _this.container = node;
      } }));
  }
});

module.exports = PlotlyComponent;