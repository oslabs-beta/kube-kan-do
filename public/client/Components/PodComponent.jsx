import { dispatch } from 'd3-dispatch';
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/metricsActionCreators.js'

// TODOS:
// what does rendering of a Pod look like? 

const mapStateToProps = state => {
  // console.log(this);
  // console.log('from pods comp: ', state.podsReducer.pods[this.props.name] ? state.podsReducer.pods[this.props.name] : {})
  return {
    // pod: state.podsReducer.pods
  }
}

const mapDispatchToProps = dispatch => {
  return {
    displayPodMetrics: () => dispatch(actions.displayPodMetrics(this.props)),
  }
}


class PodComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.displayPodMetrics = this.displayPodMetrics.bind(this);
  }
  // displayPodMetrics() {
  //   if (!this.displayMetrics) {
  //     console.log('display the metrics!')
  //   }
  // }
  // console.log('props of each podcomponent: ', props)
  render() {
    console.log('props from pod component', this.props);
    return (
      <div className= "pod-component" onClick={this.props.displayPodMetrics}>
          {this.props.name}
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PodComponent);