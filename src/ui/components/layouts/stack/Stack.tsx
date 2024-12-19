interface StackProps {
    children: React.ReactNode;
    className?: string;
};

export const Stack = ({ children, className }: StackProps) => {
    return (
        <div className={ className }>
            {children}
        </div>
    );
};
