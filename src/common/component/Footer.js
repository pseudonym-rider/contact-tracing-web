import React from 'react';

import bobLogo from "../../img/bob-logo.png";
import globalStyles from "../../Assets/global-styles/bootstrap.min.module.css";
import classNames from 'classnames/bind';
import styles from "../../css/common/footer.module.css";

const cx = classNames.bind(styles);

class Footer extends React.Component {
    
    render() {
        return (
            <footer className={cx("copyright-section")}>
                <div className={cx("copyright")}>
                    <div className={cx("bob-logo-wrapper")}>
                        <img src={bobLogo} alt="bob-logo" />
                    </div>
                    <span>by Best of the Best 9th 가명라이더</span>
                </div>
            </footer>
        )
    }
}

export default Footer;