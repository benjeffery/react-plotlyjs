const React = require('react');
const console = require('console');
const shallowEqual = require('shallowequal');
const deepEqual = require('deep-equal');

var PlotlyComponent = React.createClass({

  displayName: 'Plotly',
  propTypes: {
    data: React.PropTypes.array,
    layout: React.PropTypes.object,
    config: React.PropTypes.object
  },

  shouldComponentUpdate(nextProps) {
    //TODO logic for detecting change in props
  },

  componentDidMount() {
    let {data, layout, config} = this.props;

    if (!window.Plotly) {
      console.error('Sorry you have to include a script tag like it is 1998. Hopefully Plotly will support webpack soon.  <script type="text/javascript" src="https://cdn.plot.ly/plotly-latest.min.js"></script>');
      return;
    }
    Plotly.plot(this.container, data, layout, config);
  },

  componentDidUpdate() {
    //TODO use minimal update for given changes
    this.container.data = this.props.data;
    this.container.layout = this.props.layout;
    Plotly.redraw(this.container);

  },

  render: function () {
    return React.DOM.div({'ref': (node) => this.container=node}, null);
  }
});

module.exports = PlotlyComponent;
