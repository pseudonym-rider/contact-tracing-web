// localhost:8080/lookup
import React from 'react';
import { loginAsync } from "../../common/UserState";
import { connect } from 'react-redux';
import { instanceOf } from 'prop-types';
// import { withCookies, Cookies } from 'react-cookie';
import Cookies from 'js-cookie';

import store from "../../common/store";
import Header from '../../common/component/Header';
import Footer from '../../common/component/Footer';
//import { makeGetFriendsWithAgeLimit } from '../state/selector';

import siteLogo from "../../img/site-logo.png";
import classNames from 'classnames/bind';
import globalStyles from "../../Assets/global-styles/bootstrap.min.module.css";
import styles from "../../css/login/LoginMain.module.css";

const cx = classNames.bind(styles);

class LoginMain extends React.PureComponent {
    // static propTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    // };

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: ""
        };
    }
    
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentDidUpdate() {
        // const {jwt} = store.getState().user;
        // var {cookies} = this.props;
        // var curLoginInfo = cookies.get('loginInfo');
        if (this.props.isLogin == true){
            this.props.history.push("/lookup");
        }
        
        // if (curLoginInfo !== jwt){
        //     cookies.set('loginInfo', jwt);
        //     console.log("LoginMain.js - componentDidUpdate - cookies.get(loginInfo) : ", cookies.get('loginInfo'));
        // }
        
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    idChange = (e) => {
        this.setState({
            id: e.target.value
        });
    }

    passwordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    enterKey = (e) => {
        e.preventDefault();
        if (e.keyCode == 13) {
            this.login(e);
        }
    }

    login = async (e) => {
        console.log("LoginMain.js - login() - this.props.cookies : ", this.props.cookies);
        console.log("LoginMain.js - login() - Cookies : ", Cookies);
        var { history } = this.props;
        var {id, password} = this.state;
        var payload = { id, password };
        // this.props.loginAsync({'id': id, 'password': password}, this.props.cookies);
        console.log("LoginMain.js - login() - after loginAsync");

        window.swal({
            title: "안내",
            text: "승인받지 못한 사용자입니다.",
            icon: "warning" //"info,success,warning,error" 중 택1
        })
        // .then((YES) => {
            // if (YES) {
                this.props.history.push("/login");
            // }
        // })
        
        // var response = await this.props.login(payload);
        // if (response) { // maybe other conditions
            // this.props.history.push("/lookup");
        // }
        // this.props.setConfirmed(name, phone);
    }

    toRegisterPage = (e) => {
        this.props.history.push("/signup");
    }

    render() {
        console.log('LoginMain.js render');
        var {user} = this.props;
        var {cookies} = this.props;
        console.log("LoginMain.js - user : ", user);
        // console.log("LoginMain.js - user === {} : ", user === {});
        return (
            <>
                
                <Header match={this.props.match} history={this.props.history}/>
                <div className={cx("container")}>
                    <div className={cx("row")}>

                        <div className={globalStyles["col-md-12"]}>
                            <section className={cx("lookup-input")}>
                                <div className={cx("site-logo-wrapper")}>
                                    <img src={siteLogo} alt="site-logo" />
                                </div>
                                <h1 className={cx("lookup-title")}>Sign in to Virus Keeper</h1>
                                <form onSubmit={this.enterKey}>
                                    <div className={cx("lookup-input-wrapper")}>
                                        <span>ID </span>
                                        <input type="text" placeholder="Enter your ID"
                                                onChange={this.idChange}
                                                className={cx("lookup-input")}
                                        />
                                    </div>
                                    <div className={cx("lookup-input-wrapper")}>
                                        <span>PW </span>
                                        <input type="password" placeholder="Enter your password"
                                                onChange={this.passwordChange}
                                                className={cx("lookup-input")} 
                                        />
                                    </div>
                                    <div className={cx("register-wrapper")}>
                                        계정이 없으신가요? <span onClick={this.toRegisterPage}>가입하기</span>
                                    </div>
                                    <div className={cx("lookup-button-wrapper")}>
                                        <button onClick={this.login}
                                                className={cx("lookup-button")}
                                                type="submit">로그인</button>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                    
                </div>
                <Footer />
            </>
        );
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
        // setConfirmed: (name, phone) => {
        //     dispatch(actions.setConfirmed(name, phone))
        // }
        loginAsync: (payload) => {
            dispatch(loginAsync(payload))
        },
        // register: (payload) => {
        //     dispatch(actions.register(payload))
        // }
    }
}

export default connect( 
    mapStateToProps,
    mapDispatchToProps,
)((LoginMain));
