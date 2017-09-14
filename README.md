React-PlotlyJS [![npm version](https://badge.fury.io/js/react-plotlyjs.svg)](http://badge.fury.io/js/react-plotlyjs)
=============


A react component for Plotly.JS graphs.

This is a very early, simple wrapper with the following problems:
* Performs a full redraw on every update, I intend to make this more performant soon.
* Changes to the 'config' prop will not update the graph currently.

However it does support event handling via the onClick, onBeforeHover, onHover, onUnHover, onSelected, and onRelayout props.
Note that currently, however, changes to these event handlers after initial creation will not be propogated.

As the full Plotly bundle is huge, this library lets you pass a custom bundle to create the component. Therefore you will need Plotly as a direct dependancy of your project.


```javascript
import createPlotlyComponent from 'react-plotlyjs';
//See the list of possible plotly bundles at https://github.com/plotly/plotly.js/blob/master/dist/README.md#partial-bundles or roll your own
import Plotly from 'plotly.js/dist/plotly-cartesian';
const PlotlyComponent = createPlotlyComponent(Plotly);
```

Here's a simple example render method:


```javascript
  render() {
    let data = [
      {
        type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
        x: [1, 2, 3],     // more about "x": #scatter-x
        y: [6, 2, 3],     // #scatter-y
        marker: {         // marker is an object, valid marker keys: #scatter-marker
          color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
        }
      },
      {
        type: 'bar',      // all "bar" chart attributes: #bar
        x: [1, 2, 3],     // more about "x": #bar-x
        y: [6, 2, 3],     // #bar-y
        name: 'bar chart example' // #bar-name
      }
    ];
    let layout = {                     // all "layout" attributes: #layout
      title: 'simple example',  // more about "layout.title": #layout-title
      xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
        title: 'time'         // more about "layout.xaxis.title": #layout-xaxis-title
      },
      annotations: [            // all "annotation" attributes: #layout-annotations
        {
          text: 'simple annotation',    // #layout-annotations-text
          x: 0,                         // #layout-annotations-x
          xref: 'paper',                // #layout-annotations-xref
          y: 0,                         // #layout-annotations-y
          yref: 'paper'                 // #layout-annotations-yref
        }
      ]
    };
    let config = {
      showLink: false,
      displayModeBar: true
    };
    return (
      <PlotlyComponent className="whatever" data={data} layout={layout} config={config}/>
    );
  }

```
