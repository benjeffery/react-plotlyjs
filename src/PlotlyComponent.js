import React from 'react'
import cloneDeep from 'lodash.clonedeep'
import PropTypes from 'prop-types'

class PlotlyComponent extends React.Component {
  attachListeners () {
    if (this.props.onClick) { this.container.on('plotly_click', (data) => this.props.onClick(data, this.container)) }
    if (this.props.onBeforeHover) { this.container.on('plotly_beforehover', () => this.props.onBeforeHover(this.container)) }
    if (this.props.onHover) { this.container.on('plotly_hover', (data) => this.props.onHover(data, this.container)) }
    if (this.props.onUnHover) { this.container.on('plotly_unhover', (data) => this.props.onUnHover(data, this.container)) }
    if (this.props.onSelected) { this.container.on('plotly_selected', (eventData) => this.props.onSelected(eventData, this.container)) }
  }

  shouldComponentUpdate (nextProps) {
    // TODO logic for detecting change in props
    return true
  }

  componentDidMount () {
    let {data, layout, config, plotly} = this.props
    plotly.newPlot(this.container, data, cloneDeep(layout), config) // We clone the layout as plotly mutates it.
    if (this.props.resizeWithWindow) window.addEventListener('resize', this.resize.bind(this))
    this.attachListeners()
  }

  componentDidUpdate (prevProps) {
    // TODO use minimal update for given changes
    if (prevProps.data !== this.props.data || prevProps.layout !== this.props.layout) {
      this.props.plotly.newPlot(this.container, this.props.data, this.props.layout)
      this.attachListeners()
    }
  }

  componentWillUnmount () {
    if (this.props.resizeWithWindow) window.removeEventListener('resize', this.resize.bind(this))
    this.props.plotly.purge(this.container)
  }

  resize () {
    this.props.plotly.Plots.resize(this.container)
  }

  render () {
    let { plotly, data, layout, config, ...other } = this.props
    // Remove props that would cause React to warn for unknown props.
    delete other.onClick
    delete other.onBeforeHover
    delete other.onHover
    delete other.onUnHover
    delete other.onSelected

    return <div {...other} ref={(node) => this.container = node} />
  }
}

PlotlyComponent.propTypes = {
  plotly: PropTypes.object,
  data: PropTypes.array,
  layout: PropTypes.object,
  config: PropTypes.object,
  onClick: PropTypes.func,
  onBeforeHover: PropTypes.func,
  onHover: PropTypes.func,
  onUnHover: PropTypes.func,
  onSelected: PropTypes.func,
  resizeWithWindow: PropTypes.bool
}

export default PlotlyComponent
