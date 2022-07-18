export interface SpectrumRange {
    begins: number;
    ends: number;
    color: string;
    label: string;
}

export interface SpectrumProps {
    ranges: SpectrumRange[];
    value: number;
}
