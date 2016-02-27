React-PlotlyJS [![npm version](https://badge.fury.io/js/react-plotlyjs.svg)](http://badge.fury.io/js/react-plotlyjs)
=============


A react component for Plotly.JS graphs.

This is a very early, simple wrapper with the following problems:
* Performs a full redraw on every update, I intend to make this more performant soon. 
* Changes to the 'config' prop will not update the graph currently.

However it does support event handling via the onClick, onBeforeHover, onHover, onUnHover and onSelected props.
Note that currently, however, changes to these event handlers after initial creation will not be propogated.


```javascript
const Plotly = require('react-plotlyjs');
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
      <Plotly className="whatever" data={data} layout={layout} config={config}/>
    );
  }

```

If you're using webpack and  get a "This seems to be a pre-built javascript file." warning then add this to your webpack config:

```
module: {
    noParse: [
      /plotly\.js/
    ],
  }
```    


