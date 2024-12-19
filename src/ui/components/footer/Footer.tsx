import { Link } from 'react-router-dom';
import style from './footer.module.scss';

export const Footer = () => {
     const currentYear = new Date().getFullYear();
     const displayYear = currentYear === 2024 ? "2024" : `2024 - ${currentYear}`;

     return (
        <footer className={style.footerContent}>
            <Link to="/">Kata</Link>
            <p>© Tous Droits Réservés |</p>
            <p>Site réalisé par Théo Lemoine dans le cadre d'un test technique</p>
            <p>| {displayYear}</p>
        </footer>
    );
};