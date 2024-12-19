interface SectionProps {
    children: React.ReactNode;
    className?: string;
};

export const Section = ({ children, className }: SectionProps) => {
    let additionalClass = '';

    const finalClassName = `${className || ''} ${additionalClass}`.trim();

    return (
        <section className={finalClassName}>
            {children}
        </section>
    );
};