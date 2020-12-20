import React from 'react';
import { loginAsync, logoutAsync } from "../../common/UserState";
import { connect } from 'react-redux';
import store from "../../common/store";

import userIcon from "../../img/user-icon.png";
import globalStyles from "../../Assets/global-styles/bootstrap.min.module.css";
import classNames from 'classnames/bind';
import styles from "../../css/common/header.module.css";

const cx = classNames.bind(styles);

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    toLoginPage = (e) => {
        this.props.history.push("/login");
    }
    
    logout = (e) => {
        this.props.logoutAsync();
        console.log("Header.js - logout()");
        this.props.history.push("/login");
    }

    
    render() {
        var {user, isLogin} = this.props;
        var {history, match} = this.props;
        var isLookupPage = match.path === "/lookup" ? true : false;
        var isLoginPage = match.path === "/login" ? true : false;
        var isSignupPage = match.path === "/signup" ? true : false;
        // console.log("Header.js - isLookupPage : ", isLookupPage);
        // console.log("Header.js - isLoginPage : ", isLoginPage);
        return (
            <header className={cx("header")}>
                {!isLoginPage && !isSignupPage &&
                <div className={cx("user-info-zone")}>
                    {isLogin &&
                    <div className={cx("user-info-wrapper")}>
                        <div className={cx("user-icon-wrapper")}>
                            <img src={userIcon} alt="user-icon" />
                        </div>
                        <span className={cx("username")}>{user.id}</span> 님 반갑습니다.
                    </div>}
                    <div className={cx("login-tab-wrapper")}>
                        {!isLogin && <span onClick={this.toLoginPage}>로그인</span>}
                        {isLogin && <span onClick={this.logout}>로그아웃</span>}
                    </div>
                </div>}
            </header>
        )
    }
}

const mapStateToProps = state => {
    return { 
        user: state.user.user,
        pending: state.user.pending,
        error: state.user.error,
        isLogin: state.user.isLogin,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loginAsync: (payload) => {
            dispatch(loginAsync(payload))
        },
        logoutAsync: () => {
            dispatch(logoutAsync())
        }
    }
}

export default connect( 
    mapStateToProps,
    mapDispatchToProps,
)(Header);