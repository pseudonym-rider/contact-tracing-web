// localhost:8080/lookup
import React from 'react';
import { connect } from 'react-redux';

import globalStyles from "../../Assets/global-styles/bootstrap.min.module.css";
import classNames from 'classnames/bind';
import styles from "../../css/lookup/FacilityList.module.css";
import "bootstrap/js/src/collapse.js";
import BootstrapTable from 'react-bootstrap-table-next';

const cx = classNames.bind(styles);

const columns = [{
    dataField: 'user_id',
    text: 'ID'
  }, {
    dataField: 'Name',
    text: 'Name'
  }, {
    dataField: 'time',
    text: 'Visit time'
}];
  
class VisitorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    componentDidUpdate() {
        // console.log("VisitorList.js componentDidUpdate");
    }

    render() {
        var {visitors, selectedFacility, confirmed} = this.props;
        console.log('VisitorList.js render() - visitors : ', visitors);
        

        if (visitors == {}){
            // console.log("FacilityList.js - render() -  facilities == []");
            var tableData = [];
        } else {
            // console.log("FacilityList.js - render() -  else");
            var tableData = visitors.map((visitor, idx, arr) => {
                return {'user_id': visitor.user_id, 'Name': visitor.name, 'time': visitor.time};
            })
        }

        const expandRow = {
            parentClassName: styles['expanding-parent-tr'],
            className: styles['expanding-tr'],
            onlyOneExpanding: true,
            renderer: (row, rowIndex) => (
                <div>
                    <p><span className="detail-info-title">접촉 확진자명 : </span><span>{confirmed.user_id}</span></p>
                    <p><span className="detail-info-title">방문 시설명 : </span><span>{selectedFacility}</span></p>
                    <p><span className="detail-info-title">방문자명 : </span><span>{row.Name}</span></p>
                    <p><span className="detail-info-title">방문자ID : </span><span>{row.user_id}</span></p>
                    <p><span className="detail-info-title">방문시각 : </span><span>{row.time}</span></p>
                </div>
            )
        };
    
        return (
            <BootstrapTable
                keyField='user_id'
                data={ tableData }
                columns={ columns }
                expandRow={ expandRow }
            /> 
        );
    }
}

// function FacilityList({ facilities }) {
//     const expandRow = {
//         renderer: (row, rowIndex) => (
//             <div>
//                 <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
//                 <p>You can render anything here, also you can add additional data on every row object</p>
//                 <p>expandRow.renderer callback will pass the origin row object to you</p>
//             </div>
//         )
//     };
    
//     return (
//         <BootstrapTable
//             keyField='id'
//             data={ facilities }
//             columns={ columns }
//             expandRow={ expandRow }
//         />
//     );
// }
    
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
// )(FacilityList);
export default VisitorList;