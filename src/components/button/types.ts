export interface ButtonProps {
    text: string;
    type?: 'primary' | 'secondary';
    htmlType?: 'submit' | 'button';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
