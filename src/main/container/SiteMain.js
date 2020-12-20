// localhost:8080/lookup
import React from 'react';
import store from "../../common/store";

import Header from '../../common/component/Header';
import Footer from '../../common/component/Footer';

import siteLogo from "../../img/site-logo.png";
import classNames from 'classnames/bind';
import globalStyles from "../../Assets/global-styles/bootstrap.min.module.css";
import styles from "../../css/main/SiteMain.module.css";

const cx = classNames.bind(styles);

class SiteMain extends React.PureComponent {
    constructor(props) {
        super(props);

    };
    
    enterKey = (e) => {
        e.preventDefault();
        if (e.keyCode == 13) {
            this.login(e);
        }
    }

    login = async (e) => {
        var { history } = this.props;
        var {id, password} = this.state;
        var payload = { id, password };
        this.props.loginAsync({'id': id, 'password': password});
        // var response = await this.props.login(payload);
        // if (response) { // maybe other conditions
            // this.props.history.push("/lookup");
        // }
        // this.props.setConfirmed(name, phone);
    }

    toRegisterPage = (e) => {
        this.props.history.push("/register");
    }

    render() {
        console.log('SiteMain.js render');
        var {user} = this.props;
        console.log("SiteMain.js - user : ", user);
        return (
            <>
                <Header match={this.props.match} history={this.props.history}/>
                <div className={cx("container")}>
                    <div className={cx("row")}>
                        <div className={cx(globalStyles["col-md-12"])}>
                            <div className={cx("site-logo-wrapper")}>
                                <img src={siteLogo} alt="page-logo" />
                            </div>
                            <h1 className={cx("site-slogan")}>
                                virus<br/>
                                keeper
                            </h1>
                            <h1 className={cx("title")}>감염병 역학조사 페이지</h1>
                            <div className={cx("site-intro")}>확진자의 정보를 입력하시면 확진자의 동선과 함께 
                            BoB Corona Slayer 어플로, QR 체크인한 개인 중 밀접접촉자가 있는지 확인할 수 
                            있도록 역학조사 진행에 도움을 주기 위한 웹페이지 입니다.</div>
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
        // user: state.user.user,
        // pending: state.user.pending,
        // error: state.user.error,
        // isLogin: state.user.isLogin,
    };
};

const mapDispatchToProps = dispatch => {
    return {

        // loginAsync: (payload) => {
        //     dispatch(loginAsync(payload))
        // },

    }
}

// export default connect( 
//     mapStateToProps,
//     mapDispatchToProps,
// )(SiteMain);
export default SiteMain;