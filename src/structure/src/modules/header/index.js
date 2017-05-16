import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './styles.css';

const Header = ({ links }) => (
    <header className={styles.header}>
        <Link to="/" className={styles.brand} />
        <nav className={styles.nav}>
            {links.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    activeClassName="active"
                    className={styles.link}
                >
                    {link.displayText}
                </NavLink>
            ))}
        </nav>
    </header>
);

export default Header;
