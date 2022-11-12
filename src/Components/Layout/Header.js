import { Fragment } from 'react';
import classes from './Header.module.css';

import HeaderCartButton from './HeaderCartButton';
import HeaderImage from './HeaderImage';

const Header = (props) => {
    return <Fragment>
        <header className={classes.header}>
            <h1>React Meals</h1>
            <HeaderCartButton onClick={props.onShowCart}/>
        </header>
        <div className={classes['main-image']}>
            <HeaderImage />
        </div>
    </Fragment>
}

export default Header;