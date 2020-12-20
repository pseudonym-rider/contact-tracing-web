import globalStyles from "../../Assets/global-styles/bootstrap.min.module.css";
import classNames from 'classnames/bind';
import styles from "../../css/lookup/ListPending.module.css";

const cx = classNames.bind(styles);

function ListPending() {
    return (
        <div className={cx("loading-container")}>
            <div className={cx("loading-wrapper")}>
                <div className={cx("loading-stick-wrapper")}>
                    <div className={cx("stick")}></div>
                    <div className={cx("stick")}></div>
                    <div className={cx("stick")}></div>
                    <div className={cx("stick")}></div>
                    <div className={cx("stick")}></div>
                    <div className={cx("stick")}></div>
                </div>
                <h1 className={cx("loading-title")}>Loading...</h1>
                
            </div>
        </div>
    );
}

export default ListPending;