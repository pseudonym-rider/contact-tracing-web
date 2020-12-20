// localhost:8080/lookup
import React from 'react';
// import * as actions from "../../common/ConfirmedState";
import { connect, Provider } from 'react-redux';

import Header from '../../common/component/Header';
import Footer from '../../common/component/Footer';
//import { makeGetFriendsWithAgeLimit } from '../state/selector';

import siteLogo from "../../img/site-logo.png";
import classNames from 'classnames/bind';
import globalStyles from "../../Assets/global-styles/bootstrap.min.module.css";
import styles from "../../css/login/SignupMain.module.css";
//import "../../css/login/SignupMain.css";

const cx = classNames.bind(styles);

class SignupMain extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            password: ""
        };
    }
    
    componentDidMount() {
        //console.log("LoginMain componentDidMount props : ", this.props);
        console.log(styles);
        // swal({
        //     title: "타이틀",
        //     text: "내용",
        //     icon: "info" //"info,success,warning,error" 중 택1
        // });
        console.log("SignupMain.js - window : ", window);
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

    register = (e) => {
        var {id, password} = this.state;
        var payload = {
            id: id,
            password: password
        }
        // this.props.register(payload);
        // alert("입력하신 이메일 주소로 본인확인 이메일을 보냈습니다. 확인해주세요.");
        // alert("pseudorider@prider.xyz로 증빙서류를 보내주시면 검토 후 회원가입이 완료됩니다.");
        window.swal({
            title: "안내",
            text: "pseudorider@prider.xyz로 증빙서류를 \n보내주시면 검토 후 회원가입이 완료됩니다.",
            icon: "info" //"info,success,warning,error" 중 택1
        })
    }

    toLoginPage = (e) => {
        this.props.history.push("/login");
    }

    render() {
        console.log('LoginMain render');
        //console.log("confirmed : ", this.props.confirmed);
        return (
            <>
                <Header match={this.props.match} history={this.props.history}/>
                <div className={cx('container')}>
                    <div className={cx(globalStyles.row)}>
                        <div className={cx(globalStyles['col-md-12'])}>
                            <div className={cx("site-logo-wrapper")}>
                                <img src={siteLogo} alt="site-logo" />
                            </div>
                            <h1 className={cx("register-title")}>
                                Create your account
                            </h1>
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
                            <div className={cx("lookup-input-wrapper")}>
                                <span>Email </span>
                                <input type="text" placeholder="Enter your email"
                                        onChange={this.passwordChange}
                                        className={cx("lookup-input")} 
                                />
                            </div>
                            <div className={cx("register-wrapper")}>
                                계정이 있으신가요? <span onClick={this.toLoginPage}>로그인</span>
                            </div>
                            
                            <div className={cx("lookup-button-wrapper")}>
                                <button onClick={this.register}
                                        className={cx('lookup-button')}>회원가입</button>
                            </div>
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
        // confirmed: state.confirmed.confirmed,
        // stores: state.confirmed.stores
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // setConfirmed: (name, phone) => {
        //     dispatch(actions.setConfirmed(name, phone))
        // }
    }
}

// export default connect( 
//     mapStateToProps,
//     mapDispatchToProps,
// )(RegisterMain);
export default SignupMain;
