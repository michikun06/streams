import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../../history';
import { fetchStream, deleteStream } from "../../actions/index";

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    // 「Delete」、「Cancel」のボタンを再利用できるように関数を設定しておく
    renderActions() {
        const { id } = this.props.match.params;

        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to='/' className="ui button ">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete the stream with stream?'
        }

        return `Are you sure you want to delete the stream with title?　　:　　${this.props.stream.title}`
    }

    render() {

        // StreamList画面でDeleteボタンを押した時に現れるJSX（モーダル）
        // title：文字列
        // content: 消したいtitleを入れた削除の文言
        // actions: 再利用可能なボタン関数
        // onDismiss: モーダル以外のクリックでtopページへ遷移
        return (
            <Modal
                title='delete stream'
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(
    mapStateToProps,
    { fetchStream, deleteStream }
)(StreamDelete);