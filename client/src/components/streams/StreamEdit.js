import _ from 'lodash';
import React from 'react';
import { connect } from "react-redux";
import { fetchStream, editStream } from '../../actions';
import StreamForm from './streamForm';


class StreamEdit extends React.Component {
    componentDidMount() {
        fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit} />
            </div>

        )
    }
}

// streamをkeyにして、選択しているstate.streamsのデータを格納
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
};

// connectでStreamEditにmapStateToPropsをいれる
export default connect(
    mapStateToProps,
    { fetchStream, editStream }
)(StreamEdit);