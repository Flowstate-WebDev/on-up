type Props = {
  releaseYear?: number;
};

export function ProductReleaseYear({ releaseYear }: Props) {
  if (!releaseYear) return null;

  return (
    <p className="text-text-secondary text-sm mt-1 mb-2">
      Rok wydania: <span className="font-medium">{releaseYear}</span>
    </p>
  );
}
