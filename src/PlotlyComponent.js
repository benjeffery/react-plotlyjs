import React  from 'react';
import Plotly from 'plotly.js';
import cloneDeep from 'lodash.clonedeep';

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
    Plotly.newPlot(this.container, data, cloneDeep(layout), config); //We clone the layout as plotly mutates it.
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

  componentDidUpdate(prevProps) {
    //TODO use minimal update for given changes
    if (prevProps.data !== this.props.data || prevProps.layout !== this.props.layout) {
      Plotly.newPlot(this.container, this.props.data, this.props.layout);
    }
  },

  componentWillUnmount: function() {
    Plotly.purge(this.container);
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
