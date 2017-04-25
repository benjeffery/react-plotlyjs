import React  from 'react';
import cloneDeep from 'lodash.clonedeep';

let createPlotlyComponent = (plotlyInstance) => React.createClass({
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

  attachListeners: function() {
    if (this.props.onClick)
      this.container.on('plotly_click', (data) => this.props.onClick(data, this.container));
    if (this.props.onBeforeHover)
      this.container.on('plotly_beforehover', () => this.props.onBeforeHover(this.container));
    if (this.props.onHover)
      this.container.on('plotly_hover', (data) => this.props.onHover(data, this.container));
    if (this.props.onUnHover)
      this.container.on('plotly_unhover', (data) => this.props.onUnHover(data, this.container));
    if (this.props.onSelected)
      this.container.on('plotly_selected', (eventData) => this.props.onSelected(eventData, this.container));
  },

  shouldComponentUpdate(nextProps) {
    //TODO logic for detecting change in props
    return true;
  },

  componentDidMount() {
    let {data, layout, config} = this.props;
    plotlyInstance.newPlot(this.container, data, cloneDeep(layout), config); //We clone the layout as plotly mutates it.
    this.attachListeners();
  },

  componentDidUpdate(prevProps) {
    //TODO use minimal update for given changes
    if (prevProps.data !== this.props.data || prevProps.layout !== this.props.layout) {
      plotlyInstance.newPlot(this.container, this.props.data, this.props.layout);
      this.attachListeners();
    }
  },

  componentWillUnmount: function() {
    plotlyInstance.purge(this.container);
  },

  resize: function() {
    plotlyInstance.Plots.resize(this.container);
  },

  render: function () {
    let {data, layout, config, ...other } = this.props;
    //Remove props that would cause React to warn for unknown props.
    delete other.onClick;
    delete other.onBeforeHover;
    delete other.onHover;
    delete other.onUnHover;
    delete other.onSelected;

    return <div {...other} ref={(node) => this.container=node} />
  }
});

export default createPlotlyComponent;
