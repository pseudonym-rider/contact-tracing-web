import React from 'react';

class StoreList extends React.PureComponent {

    render() {
        return (
            <ul>
                {stores.map(store => (
                    <li key={store.id}>{store.desc}</li>
                ))}
            </ul>
        )
    };
}

const mapStateToProps = state => {
    // return { confirmed: state.confirmed.confirmed };
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
// )(StoreList);
export default StoreList;