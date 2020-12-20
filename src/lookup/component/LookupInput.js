import React from 'react';

class LookupInput extends React.PureComponent {

    constructor() {
        super();
    }

    nameChange = (e) => {
        console.log("setName called in LookupInput");
        this.props.setName(e.target.value);
    }

    phoneChange = (e) => {
        console.log("setPhone called in LookupInput");
        this.props.setPhone(e.target.value);
    }

    render() {
        console.log("LookupInput render");
        return (
            <div className="col-md-6">
                <section className="lookup-input">
                    <h1>확진자조회</h1>
                    <div className="name">
                        이름 : 
                        <input type="text" placeholder="Enter the name"
                                onChange={this.nameChange}/>
                    </div>
                    <div className="phone-num">
                        전화번호 : 
                        <input type="text" placeholder="Enter the phone number"
                                onChange={this.phoneChange}/>
                    </div>
                    <button onClick={this.search}>찾기</button>
                </section>
                <section className="alert">
                    <div className="alert-logo-wrapper">

                    </div>
                    <div className="alert-msg-wrapper">
                        <span>역학조사 이외에 함부로 개인정보를 열람할 경우, 법적 처벌을 받을 수 있음에 동의하였습니다. 
                            오류가 발생한 경우 문의주시기 바랍니다.</span>
                    </div>
                </section>
            </div>
        )
    }
}

export default LookupInput;