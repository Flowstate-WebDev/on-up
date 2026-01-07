import { selectStyle } from "@/public/styles";

type Props = {
    children: React.ReactNode
    name: string
    id: string
    style: "default"
}

export default function Select({ children, name, id, style }: Props) {
    return (
        <select name={name} id={id} className={selectStyle({ style })}>
            {children}
        </select>
    )
}