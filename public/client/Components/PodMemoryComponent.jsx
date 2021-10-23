import React from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    pods: state.podsReducer.pods
  }
}

class PodMemoryComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    
  }

  render() {
    // console.log('this is pod cpu component props', this.props)
    const {metric, pods} = this.props;
    // console.log('this is pod metric', metric);

    const valuesToGraph = [];
    let podName;
    const getValues = (pods) => {
      for (let pod in pods) {
        const podValues = [];
        
        if (pods[pod].displayMetrics) {
          // console.log('do we get here?');
          pods[pod].memoryValues.forEach(dataPoint => {
            const date = new Date(dataPoint[0]*1000);
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            //  const milliseconds = date.getMilliseconds();
            //  const time = `${hours}:${minutes}:${seconds}:${milliseconds}`;
            const time = `${hours}:${minutes}:${seconds}`;  
            
            podValues.push([time, parseFloat(dataPoint[1])*0.000001]);
          });
          valuesToGraph.push(
            {
              type: "line",
              text: pods[pod].name,
              values: podValues,
            }
          );
        }
      }    
    }
  //   [1634171448.491, 0.005295174118518516]
    getValues(pods);
    // console.log('line 28', valuesToGraph);
    const dummy = [1,2]
    const podMemoryGraphData = {
      theme: 'dark',
      type: 'line',
      "globals": {
        "font-family": "Roboto",
        //"background-color": "#79B4B7",
        "border-radius" : 15,
      },
      title: {
          text: 'Memory Usage in MB',
         // "font-color": "dark-grey",
          "font-size": "15em",
          "alpha": 1,
          "adjust-layout": true,
        
      },
       plot: {
        animation: {
          effect: "ANIMATION_FADE_IN"
      }
      //   'width':'100%',
      //   'height': '100%',
       },
      plotarea: {
          "margin": "dynamic",
          "margin-right": "30",
          'width':'100%',
          'height': '100%',
      },  
      // "plot": {
      //   'width':'100%',
      //   'height': '100%',
      // },
      // "plotarea": {
      //     "margin": "dynamic",
      //     'width':'100%',
      //     'height': '100%',
      // },
      scaleX: {
        // labels: 'Timestamp in some Unit',
        "item": {
          //'font-color': "dark-grey",
          'font-weight': 'normal',
        },
        
        },
      scaleY: {
            //labels: 'Memory Use Unit',
        minValue:0,
        minorTicks: 9,
        item:{
            'font-weight': 'normal',
        }
      },
      "crosshair-x": {
        "line-width": "100%",
        "alpha": 0.18,
      },
      series: valuesToGraph
    }

    return (
        <div className="chart"> 
            <ZingChart height="303" data = {podMemoryGraphData}>Pod Zing Chart</ZingChart>
        </div>
    )
  }

//   return (
//       <div>
//           Pod Component Rendered
//       </div>
//   )

  }

export default connect(mapStateToProps, null)(PodMemoryComponent);