type Props = {
    value: string,
    title: string,
    disabled: boolean,
    selected: boolean
}

export default function SelectOption({ value, title, disabled, selected }: Props) {
    return (
        <option value={value} disabled={disabled ? true : false} selected={selected ? true : false}>{title}</option>
    )
}