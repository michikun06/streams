import React from 'react';
import ReactDom from 'react-dom';

const Modal = props => {

    // JSXをレンダリングする（第一引数が表示したい部分、第二がindex.html内にある表示する場所のidセレクタ）
    return ReactDom.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div
                // 上のpushイベントがこの要素内では効かないようにする
                onClick={e => e.stopPropagation()}
                className="ui standard modal visible active"
            >
                <div className="header">{props.title}</div>
                <div className="content">{props.content}</div>
                <div className="actions">{props.actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;