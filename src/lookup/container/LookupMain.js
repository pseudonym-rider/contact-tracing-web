// localhost:8080/lookup
import React from 'react';
import { setConfirmed, getConfirmedAsync } from "../../common/ConfirmedState";
import { getFacilityList } from "../../common/FacilityState";
import { getVisitorList } from "../../common/VisitorState";
import { connect } from 'react-redux';
import store from "../../common/store";

import LookupInput from "../component/LookupInput";
import FacilityList from "../component/FacilityList";
import ListPending from "../component/ListPending";
import VisitorList from "../component/VisitorList";
import Header from '../../common/component/Header';
import Footer from '../../common/component/Footer';
//import { makeGetFriendsWithAgeLimit } from '../state/selector';

import warningImg from "../../img/triangular-warning.png";
import globalStyles from "../../Assets/global-styles/bootstrap.min.module.css";
import classNames from 'classnames/bind';
import styles from "../../css/lookup/LookupMain.module.css";

const cx = classNames.bind(styles);

const facilities = [ 
    {'Name': '경주농협 성건지점', 'Location': '서울특별시 송파구 송파동 499-101', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'},
    {'Name': '경주충효지구 이안아파트', 'Location': '서울특별시 강남구 대치동 788-13', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'},
    {'Name': '경북70자2527', 'Location': '서울특별시 강남구 일원동 155-57', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'},
    {'Name': '88분식', 'Location': '서울특별시 송파구 송파동 529-55', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'},
    {'Name': '부산식육점', 'Location': '서울특별시 강남구 대치동 225-33', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'},
    {'Name': '안강찜질사우나 여탕', 'Location': '서울특별시 강남구 일원동 777-44', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'},
    {'Name': '고향맛', 'Location': '서울특별시 종로구 혜화동 399-78', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'},
    {'Name': '서경주역(승차) 동대구역(하차)	', 'Location': '서울특별시 광진구 광진동 456-88', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'},
    {'Name': '경주시니어 클럽 국시사랑', 'Location': '서울특별시 종로구 혜화동 399-21', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'},
    {'Name': '우리골프연습장', 'Location': '서울특별시 서초구 서초동 399-78', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'},
    {'Name': 'CU편의점', 'Location': '서울특별시 서초구 방배동 456-78', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'},
    {'Name': '이디야커피 경주안강점', 'Location': '서울특별시 관악구 봉천동 963-85', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'},
    {'Name': '경주본가뒷고기', 'Location': '서울특별시 관악구 봉천동 963-85', 'visit_time': '2020-12-10 13:03:30', 'Phone': '054-444-3323'}
];

const visitors = [ 
    {'Name': '손우정', 'Location': '서울특별시 송파구 송파동 499-101', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '손우정', 'Location': '서울특별시 강남구 대치동 788-13', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '이은표', 'Location': '서울특별시 강남구 일원동 155-57', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '박승민', 'Location': '서울특별시 송파구 송파동 529-55', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '신명수', 'Location': '서울특별시 강남구 대치동 225-33', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '오선식', 'Location': '서울특별시 강남구 일원동 777-44', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '이승준', 'Location': '서울특별시 종로구 혜화동 399-78', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '손우정', 'Location': '서울특별시 광진구 광진동 456-88', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '박승민', 'Location': '서울특별시 종로구 혜화동 399-21', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '박승민', 'Location': '서울특별시 서초구 서초동 399-78', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '오선식', 'Location': '서울특별시 서초구 방배동 456-78', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '손우정', 'Location': '서울특별시 관악구 봉천동 963-85', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'}
];

class LookupMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: ""
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentDidUpdate() {

    }

    nameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    phoneChange = (e) => {
        this.setState({
            phone: e.target.value
        });
    }

    enterKey = (e) => {
        e.preventDefault();
        console.log("LookupMain.js - enterKey() - e : ", e);
        if (e.keyCode == 13) {
            this.search(e);
        }
    }

    search = (e) => {
        var {name, phone} = this.state;
        console.log("name : ", name);
        console.log("phone : ", phone);

        this.props.getConfirmedAsync(name, phone);
        // lookupForm.lookup();

        // setConfirmed(name, phone);
        //console.log("LookupMain.js - confirmed : ", store.getState().confirmed['confirmed']);
        // console.log("this.props.facilities : ", this.props.facilities);
        // redux의 store에 state로 등록 -> 서버에 FacilityList 요청 -> 서버에서 응답 -> state.facilities에 저장 -> this.props.getFacilityList 호출
        //this.props.getFacilityList(facilities);
        //console.log("LookupMain.js - facilities : ", store.getState().facilities['facilities']);
        // promise, then
        //this.props.getVisitorList(visitors);
    }
    
    sendNotice = (e) => {
        // alert("밀접접촉자에게 알림이 전송되었습니다.");
        window.swal({
            title: "안내",
            text: "밀접접촉자에게 알림이 전송되었습니다.",
            icon: "info" //"info,success,warning,error" 중 택1
        })
    }

    isEmptyObject(param) {
        return Object.keys(param).length === 0 && param.constructor === Object;
    }

    render() {
        //console.log('LookupMain.js render()');
        var {confirmed, confirmedPending, confirmedError} = this.props;
        var {facilities, facilitiesPending, facilitiesError, selectedFacility} = this.props;
        var {visitors, visitorsPending, visitorsError} = this.props;
        // var facilities = store.getState().facilities.facilities;

        if(this.isEmptyObject(visitors) || selectedFacility == ""){
            var visitorProps = [];
        } else {
            var visitorProps = visitors[selectedFacility];
        }
        console.log("LookupMain.js render - selectedFacility : ", selectedFacility)
        console.log("LookupMain.js render - visitors : ", visitors, "visitorProps : ", visitorProps);
        // console.log("confirmed : ", this.props.confirmed);
        return (
            <>
                <Header match={this.props.match} history={this.props.history}/>
                <div className={cx("container")}>
                    
                    <div className={cx("row")}>
                        <div className={cx(globalStyles['col-md-6'], styles['middle-line'])}>
                            <section className={cx("lookup-input")}>
                                <h1 className={cx("lookup-title")}>확진자조회</h1>
                                <form name="lookupForm" onSubmit={this.enterKey}>
                                    <div className={cx("lookup-input-wrapper")}>
                                        <span>이름 : </span>
                                        <input type="text" placeholder="Enter the name"
                                                // onkeyup={this.enterKey}
                                                onChange={this.nameChange}
                                                // onkeypress={this.enterKey(this.form)}
                                                className={cx("lookup-input")} 
                                        />
                                    </div>
                                    <div className={cx("lookup-input-wrapper")}>
                                        <span>전번 : </span>
                                        <input type="text" placeholder="Enter the phone number"
                                                // onkeyup={this.enterKey}
                                                onChange={this.phoneChange}
                                                // onkeypress={this.enterKey(this.form)}
                                                className={cx("lookup-input")} 
                                        />
                                    </div>
                                    <div className={cx("lookup-button-wrapper")}>
                                        <button onClick={this.search}
                                                className={cx("lookup-button")} 
                                                title="lookup"
                                                type="submit">찾기</button>
                                    </div>
                                </form>
                                
                            </section>
                            <section className={cx("lookup-alert")}>
                                <div className={cx("alert-logo-wrapper")}>
                                    <img src={warningImg} alt="warning" />
                                </div>
                                <div className={cx("alert-msg-wrapper")}>
                                    <div>역학조사 이외에 함부로 개인정보를 열람할 경우, 법적 처벌을 받을 수 있음에 동의하였습니다. 
                                        오류가 발생한 경우 문의주시기 바랍니다.</div>
                                </div>
                            </section>
                        </div>
                        {/* <LookupMain setName={this.setName} setPhone={this.setPhone} /> */}
                        <div className={cx(globalStyles['col-md-6'], 'test')}>
                            <section className={cx("store-list", "list-section")}>
                                <h1 className={cx("list-title")}>방문한 시설 목록</h1>
                                <div className={cx("facility-list-wrapper")}>
                                    {(confirmedPending || facilitiesPending) && <ListPending />}
                                    {(!confirmedError) && (!facilitiesError) && 
                                     (!confirmedPending) && (!facilitiesPending) && 
                                        <FacilityList facilities={facilities}/>
                                    }
                                </div>
                            </section>
                            <section className={cx("visitor-list", "list-section")}>
                                <h1 className={cx("list-title")}>시설출입자 목록</h1>
                                <div className={cx("visitor-list-wrapper")}>
                                    {(confirmedPending || visitorsPending || facilitiesPending) && <ListPending />}
                                    {(!confirmedError) && (!visitorsError && !facilitiesError) && 
                                     (!confirmedPending) && (!visitorsPending) && (!facilitiesPending) && 
                                        <VisitorList visitors={visitorProps} 
                                            selectedFacility={selectedFacility}
                                            confirmed={confirmed}/>}
                                </div>
                            </section>
                            <div className={cx("lookup-button-wrapper", "notice-button-wrapper")}>
                                <button onClick={this.sendNotice}
                                        className={cx("lookup-button")} 
                                        title="lookup"
                                        type="button">알림 전송</button>
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
        confirmed: state.confirmed.confirmed,
        confirmedPending: state.confirmed.pending,
        confirmedError: state.confirmed.error,
        facilities: state.facilities.facilities,
        facilitiesPending: state.facilities.pending,
        facilitiesError: state.facilities.error,
        selectedFacility: state.facilities.selectedFacility,
        visitors: state.visitors.visitors,
        visitorsPending: state.visitors.pending,
        visitorsError: state.visitors.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getConfirmedAsync: (name, phone) => {
            dispatch(getConfirmedAsync(name, phone))
        },
        getFacilityList: (facilities) => {
            dispatch(getFacilityList(facilities))
        },
        getVisitorList: (visitors) => {
            dispatch(getVisitorList(visitors))
        }
    }
}

// actions 객체로 액션 전달하기
// 컴포넌트가 리덕스 상탯값 변경에 반응하기 위해서 사용하는게 connect 함수이다. 
// (뇌피셜) mapStateToProps를 통해 리덕스의 state를 컴포넌트의 props로 만들어주어서 컴포넌트가 리덕스의 state에 반응하는듯?
export default connect( 
    mapStateToProps,
    mapDispatchToProps,
)(LookupMain);
