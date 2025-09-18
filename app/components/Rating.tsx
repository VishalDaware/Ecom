export const Rating = ({ value }: { value: number }) => {
  const stars = '★★★★★'.slice(0, Math.round(value)) + '☆☆☆☆☆'.slice(Math.round(value));
  return <div className="text-yellow-400">{stars}</div>;
};