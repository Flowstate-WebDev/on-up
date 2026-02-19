interface UserDataBlockProps {
  label: string;
  value: string;
}

export const UserDataBlock = ({ label, value }: UserDataBlockProps) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
        {label}
      </span>
      <p className="text-lg font-medium">{value}</p>
    </div>
  );
};