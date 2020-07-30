import React from 'react';
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";


//  ログインボタンの表示、ログインの認証システムのcomponent
class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({
                    clientId:
                        '1072319454226-g57vrbi3vlne8pkmb5abmhaakmbnu9qj.apps.googleusercontent.com',
                    scope:
                        'email'
                })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();

                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    // ユーザーのログイン状態
    onAuthChange = isSignedIn => {

        // ログイン時はuserIdをonAuthChange関数の返り値として渡す、それ以外はログアウト
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };



    // ボタンクリックでログインをするための関数
    onSignInClick = () => {
        this.auth.signIn();
        alert('ログインしました。');
    };

    // ボタンクリックでログアウトをするための関数
    onSignOutClick = () => {
        this.auth.signOut();
        alert('ログアウトしました。');
    };



    // 条件分岐、ログインorログアウトボタン
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            // ログイン状態時の表示
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            // ログアウト状態時の表示
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }




    //　ログインボタンをHeaderコンポーネントにreturn
    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    // stateであるログイン状態をPropsに変換
    return { isSignedIn: state.auth.isSignedIn };
};

// ログイン状況を保持したpropsとActionのsignIn、signOutをGoogleAuthコンポーネントをconnectする
export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);