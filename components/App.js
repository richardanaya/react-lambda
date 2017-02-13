import React from 'react';
import { connect } from 'react-redux';

function App({ currentCount, increment, decrement }) {
  return (<div>
    Application {currentCount}
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>);
}

App.propTypes = {
  currentCount: React.PropTypes.number.isRequired,
  increment: React.PropTypes.func.isRequired,
  decrement: React.PropTypes.func.isRequired,
};

export default connect(state => ({
  currentCount: state,
}), dispatch => (
  {
    increment: () => {
      dispatch({ type: 'INCREMENT' });
    },
    decrement: () => {
      dispatch({ type: 'DECREMENT' });
    },
  }),
)(App);
