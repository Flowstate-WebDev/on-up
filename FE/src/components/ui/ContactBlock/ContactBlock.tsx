type Props = {
  icon: string
  text: string
}

export const ContactBlock = ({ icon, text }: Props) => {
  return (
    <div className="flex gap-2">
      <img
        className="w-4 h-4 brightness-0 invert self-center"
        src={icon}
        alt=""
      />
      <p>{text}</p>
    </div>
  )
}