import { TitleProps } from './types';
import style from './titles.module.scss';

export const ThirdTitle = ({ children, className, marginBottom }: TitleProps) => {
    const customStyle = {
        marginBottom: marginBottom || '1rem',
    };
    
    return (
        <h3 className={`${style.thirdTitle} ${className ? className : ''}`} style={customStyle}>
            {children}
        </h3>
    );
};
