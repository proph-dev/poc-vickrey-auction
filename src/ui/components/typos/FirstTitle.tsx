import { TitleProps } from './types';
import style from './titles.module.scss';

export const FirstTitle = ({ children, className, marginBottom }: TitleProps) => {
    const customStyle = {
        marginBottom: marginBottom || '1rem',
    };
    
    return (
        <h1 className={`${style.firstTitle} ${className ? className : ''}`} style={customStyle}>
            {children}
        </h1>
    );
};
