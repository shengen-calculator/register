import React from 'react';
import {connect} from 'react-redux';

class LoadingDots extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {frame: 1};
    }

    componentDidMount() {
        this.interval = setInterval (() => {
            this.setState({
                frame: this.state.frame + 1
            });
        }, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if(!this.props.loading) {
            return null
        }
        let dots = this.state.frame % (this.props.dots + 1);
        let text = '';
        while (dots > 0) {
            text += '.';
            dots--;
        }
        return <span {...this.props}>{text}&nbsp;</span>
    }
}

LoadingDots.defaultProps = {
    interval: 300, dots: 3
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(LoadingDots);