import PropTypes from 'prop-types';
import React  from 'react';
import cloneDeep from 'lodash.clonedeep';

let createPlotlyComponent = (plotlyInstance) => class Plotly extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    layout: PropTypes.object,
    config: PropTypes.object,
    onClick: PropTypes.func,
    onBeforeHover: PropTypes.func,
    onHover: PropTypes.func,
    onUnHover: PropTypes.func,
    onSelected: PropTypes.func,
    onRelayout: PropTypes.func,
  };

  attachListeners() {
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
    if (this.props.onRelayout) {
      this.container.on('plotly_relayout', this.props.onRelayout);
    }
  }

  shouldComponentUpdate(nextProps) {
    //TODO logic for detecting change in props
    return true;
  }

  componentDidMount() {
    let {data, layout, config} = this.props;
    plotlyInstance.newPlot(this.container, data, cloneDeep(layout), config); //We clone the layout as plotly mutates it.
    this.attachListeners();
  }

  componentDidUpdate(prevProps) {
    //TODO use minimal update for given changes
    if (prevProps.data !== this.props.data || prevProps.layout !== this.props.layout || prevProps.config !== this.props.config) {
      let {data, layout, config} = this.props;
      plotlyInstance.newPlot(this.container, data, cloneDeep(layout), config); //We clone the layout as plotly mutates it.
      this.attachListeners();
    }
  }

  componentWillUnmount() {
    plotlyInstance.purge(this.container);
  }

  resize() {
    plotlyInstance.Plots.resize(this.container);
  }

  render() {
    let {data, layout, config, ...other } = this.props;
    //Remove props that would cause React to warn for unknown props.
    delete other.onClick;
    delete other.onBeforeHover;
    delete other.onHover;
    delete other.onUnHover;
    delete other.onSelected;
    delete other.onRelayout;

    return <div {...other} ref={(node) => this.container=node} />
  }
};

export default createPlotlyComponent;
