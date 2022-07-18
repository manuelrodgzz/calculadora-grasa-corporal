export interface ButtonProps {
    text: string;
    type?: 'primary' | 'secondary';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
