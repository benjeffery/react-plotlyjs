React-PlotlyJS [![npm version](https://badge.fury.io/js/react-plotlyjs.svg)](http://badge.fury.io/js/react-plotlyjs)
=============


A react component for Plotly.JS graphs.

This is a very early, simple wrapper with the following problems:

* Sadly you have to use a 90's style script tag with this module as [plotly.js doesn't support webpack.](https://github.com/plotly/plotly.js/issues/13)
* Performs a full redraw on every update, I intend to make this more performant soon. 
* Changes to the 'config' prop will not update the graph currently. 
* No event handling


```html
<script type="text/javascript" src="https://cdn.plot.ly/plotly-latest.min.js"></script>
```

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
      <Plotly data={data} layout={layout} config={config}/>
    );
  }
```

