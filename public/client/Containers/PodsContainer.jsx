import React from 'react';
import PodComponent from '../Components/PodComponent.jsx';

// TODOS: 
// get pods from Kubernetes and update metric names based on user selections
// if healthy property is set to true only if all metrics are below user-defined thresholds
// if a pod has been evicted, the alive property changes to false

function PodsContainer(props){
  // array to hold pod components to render
  const podsElement = [];

  // ASSUMPTION: pods will be an array of objects and be accessed through props???
  const pods = [
    {
      dateCreated: 123,
      metric1: 30,
      metric2: 10,
      metric3: 45,
      metric4: 67,
      healthy: true,
      alive: true,
    },
    {
      dateCreated: 124,
      metric1: 40,
      metric2: 90,
      metric3: 80,
      metric4: 67,
      healthy: false,
      alive: true,
    },
    {
      dateCreated: 125,
      metric1: 0,
      metric2: 0,
      metric3: 0,
      metric4: 0,
      healthy: false,
      alive: false,
    },
  ]

  // iterate through an array pods from the Kubernetes cluster and build an out an array of Pod Components to render:
  pods.forEach((pod => {
    // deconstruct necessary properties from each pod 
    const { dateCreated, metric1, metric2, metric3, metric4, healthy, alive } = pod;

    // generate a pod component with properties specific to that pod
    podsElement.push(<PodComponent 
      key={dateCreated} 
      metric1={metric1} 
      metric2={metric2} 
      metric3={metric3} 
      metric4={metric4} 
      healthy={healthy} 
      alive={alive}
    />);
  }))
    
  return (
    <div id="pods-container">
      {podsElement}
    </div>
  );
};

export default PodsContainer;