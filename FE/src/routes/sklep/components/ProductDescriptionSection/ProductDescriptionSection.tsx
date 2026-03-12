type Props = {
  description: string;
};

export function ProductDescriptionSection({ description }: Props) {
  return (
    <div className="py-16 mx-auto w-full text-center max-w-2/4">
      <h1 className="text-2xl font-bold mb-4">Opis</h1>
      <p>{description}</p>
    </div>
  );
}
