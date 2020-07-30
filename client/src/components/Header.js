import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">

            {/* 左上のトップページに戻るボタン */}
            <Link to="/" className="item">
                Streamy
            </Link>

            {/* 右上のトップページに戻るボタン */}
            <div className="right menu">
                <Link to="/" className="item">
                    All Streamy
                </Link>

                {/* ログイン、ログアウトの認証システム */}
                <GoogleAuth />

            </div>
        </div>
    );
};

export default Header;