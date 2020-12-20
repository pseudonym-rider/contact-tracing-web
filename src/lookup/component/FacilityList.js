// localhost:8080/lookup
import React from 'react';
// import * as actions from "../../common/state"
import { connect } from 'react-redux';
import { setSelectedFacilityAsync } from "../../common/FacilityState";
import store from "../../common/store";

import globalStyles from "../../Assets/global-styles/bootstrap.min.module.css";
import classNames from 'classnames/bind';
import styles from "../../css/lookup/FacilityList.module.css";
import "bootstrap/js/src/collapse.js";
// import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import BootstrapTable from 'react-bootstrap-table-next';

const cx = classNames.bind(styles);

const columns = [{
    dataField: 'store_id',
    text: 'ID'
  }, {
    dataField: 'Location',
    text: 'Location'
  }, {
    dataField: 'time',
    text: 'Visit time'
}];
  
class FacilityList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    componentDidUpdate() {
        // console.log("FacilityList.js componentDidUpdate");
    }

    // onClick = (e) => {
    //     var {open} = this.state;
    //     this.setState({ open: !open })
    // }

    render() {
        var {open} = this.state;
        var {facilities} = this.props;
        // console.log("FacilityList.js - render() - facilities : ", facilities);
        if (facilities == []){
            // console.log("FacilityList.js - render() -  facilities == []");
            var tableData = [];
        } else {
            // console.log("FacilityList.js - render() -  else");
            var tableData = facilities.map((facility, idx, arr) => {
                return {'store_id': facility.store_id, 'Location': facility.Location, 'time': facility.time};
            })
        }
        
        // var {facilities} = store.getState().facilities;
        console.log('FacilityList.js - render() - tableData : ', tableData);

        const expandRow = {
            parentClassName: styles['expanding-parent-tr'],
            className: styles['expanding-tr'],
            onlyOneExpanding: true,
            onExpand: (row, isExpand, rowIndex, e) => {
                console.log("FacilityList.js - onExpand - e : ", e, "e.target : ", e.target, "rowIndex : ", rowIndex, "row : ", row, "sExpand : ", isExpand);
                this.props.setSelectedFacilityAsync(row.store_id);

            },
            renderer: (row, rowIndex) => (
                <div>
                    <p><span className="detail-info-title">시설명 : </span><span>{row.store_id}</span></p>
                    <p><span className="detail-info-title">위치 : </span><span>{row.Location}</span></p>
                    <p><span className="detail-info-title">방문시각 : </span><span>{row.time}</span></p>
                </div>
            )
        };
    
        return (
            
            <BootstrapTable
                keyField='store_id'
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
        selectedFacility: state.facilities.selectedFacility
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setSelectedFacilityAsync: (facility) => {
            dispatch(setSelectedFacilityAsync(facility))
        }
    }
}

export default connect( 
    mapStateToProps,
    mapDispatchToProps,
)(FacilityList);
