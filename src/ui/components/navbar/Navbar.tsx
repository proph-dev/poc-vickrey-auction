import { Link, NavLink } from 'react-router-dom';
import style from './navbar.module.scss';

export const Navbar = () => {
    return (
        <header className={ style.navbar }>
            <Link to="/" className={style.title}>Kata</Link>
        </header>
    );
};
