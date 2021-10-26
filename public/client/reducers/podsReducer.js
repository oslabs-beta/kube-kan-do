import * as actionTypes from '../actions/actionTypes.js';
// TODO: import a library here to formate date/time from metadata creationTime)

const initialState = {
  pods: {},
}

function podsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.RECEIVE_PODS:
      const { cpuMetrics, memoryMetrics, writeToDiskPods } = payload      
      let pods = {};

      // iterate through cpu metrics, memory metrics
      cpuMetrics.forEach( metric => {

        // if this podName doesn't already exist in pods, create it and assign its value to values
        if (!pods[metric.metric.pod]) {
          pods[metric.metric.pod] = {
            name: metric.metric.pod,
            cpuValues: metric.values,
            displayMetrics: true,
            healthy: true,
            alive: true,
          }
        }
        else {
          pods[metric.metric.pod].cpuValues = metric.values;
        }
        // podName
        
        // pod cpu metrics
        // pod memory metrics
       // push the object to the pods array 
      })
      
      memoryMetrics.forEach( metric => {
        // if (!pods[metric.metric.pod]) {
        //   pods[metric.metric.pod] = {
        //     memoryValues: metric.values,
        //   }
        // }
        // else {
        pods[metric.metric.pod].memoryValues = metric.values;
        // }  
      })

      //since one of the pod is missing disk metrics, wrote a seperate logic
      for(let pod in pods){
        writeToDiskPods.forEach(metric => {
          if(pod === metric.metric.pod){
            pods[pod].writeToDiskValues = metric.values;
            return;
          } 
        })
        if(!pods[pod].writeToDiskValues) pods[pod].writeToDiskValues = [];
      }

      // console.log('pods from pods reducer', pods);
      
      return {...state, pods};

    case actionTypes.DISPLAY_POD_METRICS:
      const podName = payload;
      const podsObj = JSON.parse(JSON.stringify(state.pods));
      const pod = podsObj[podName];
      pod.displayMetrics = pod.displayMetrics ? false : true;
      podsObj[podName] = pod;

      return {...state,pods: podsObj};
      
    default: 
      return state;
  }


}

export default podsReducer;