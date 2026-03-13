type Props = {
  description: string;
};

export function ProductDescriptionSection({ description }: Props) {
  return (
    <div className="py-16 mx-auto max-w-4xl px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Opis</h1>
      <p className="leading-relaxed text-text-secondary">{description}</p>
    </div>
  );
}
