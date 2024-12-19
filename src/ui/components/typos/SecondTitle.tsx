import { TitleProps } from './types';
import style from './titles.module.scss';

export const SecondTitle = ({ children, className, marginBottom }: TitleProps) => {
    const customStyle = {
        marginBottom: marginBottom || '1rem',
    };
    
    return (
        <h2 className={`${style.secondTitle} ${className ? className : ''}`} style={customStyle}>
            {children}
        </h2>
    );
};
