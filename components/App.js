import React from 'react';
import { connect } from 'react-redux';

function App({ currentCount }) {
  return <div>Application {currentCount}</div>;
}

App.propTypes = {
  currentCount: React.PropTypes.number.isRequired,
};

export default connect(state => ({
  currentCount: state,
}),
)(App);
