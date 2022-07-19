export interface BasicFieldProps {
    name: string;
    label: string;
    value?: string;
    placeholder?: string;
    if?: {
        field: string;
        equals: any;
    };
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface NumberFieldProps extends BasicFieldProps {
    type: 'number';
    min?: number;
    max?: number;
}

export interface RadioFieldProps extends BasicFieldProps {
    type: 'radio';
    options: { label: string, value: string }[];
}

export interface TextFieldProps extends BasicFieldProps {
    type: 'text';
}

export type InputProps = TextFieldProps | NumberFieldProps | RadioFieldProps;