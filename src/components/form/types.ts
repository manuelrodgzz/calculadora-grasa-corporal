import { InputProps } from '../input/types'

export interface FormProps {
    fields: InputProps[];
    submitText: string
    onSubmit: (formData: any) => void;
    onClean?: () => void;
}