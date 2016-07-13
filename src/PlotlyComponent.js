import React  from 'react';
import Plotly from 'plotly.js';

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

  shouldComponentUpdate(nextProps) {
    //TODO logic for detecting change in props
    return true;
  },

  componentDidMount() {
    let {data, layout, config} = this.props;
    Plotly.plot(this.container, data, layout, config);
    if (this.props.onClick)
      this.container.on('plotly_click', this.props.onClick);
    if (this.props.onBeforeHover)
      this.container.on('plotly_beforehover', this.props.onBeforeHover);
    if (this.props.onHover)
      this.container.on('plotly_hover', this.props.onHover);
    if (this.props.onUnHover)
      this.container.on('plotly_unhover', this.props.onUnHover);
    if (this.props.onSelected)
      this.container.on('plotly_selected', this.props.onSelected);
  },

  componentDidUpdate() {
    //TODO use minimal update for given changes
    this.container.data = this.props.data;
    this.container.layout = this.props.layout;
    Plotly.redraw(this.container);
  },

  componentWillUnmount: function() {
    //Remove some cruft left behind by plotly
    var cruft = document.getElementById("js-plotly-tester");
    if (cruft !== null) {
      cruft.parentNode.removeChild(cruft);
    }

    this.container.removeAllListeners('plotly_click');
    this.container.removeAllListeners('plotly_beforehover');
    this.container.removeAllListeners('plotly_hover');
    this.container.removeAllListeners('plotly_unhover');
    this.container.removeAllListeners('plotly_selected');
  },

  resize: function() {
    Plotly.Plots.resize(this.container);
  },

  render: function () {
    let {data, layout, config, ...other } = this.props;
    return <div {...other} ref={(node) => this.container=node} />
  }
});

module.exports = PlotlyComponent;
