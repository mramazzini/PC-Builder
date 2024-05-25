export default function Rating({
  rating,
  size,
  name,
}: {
  rating: number;
  size: string;
  name: string;
}) {
  const calcRating = (rating: number) => {
    if (rating > 5) {
      return 5;
    } else if (rating < 0) {
      return 0;
    } else {
      return Math.round(rating * 2) / 2;
    }
  };

  const finalRating = calcRating(rating);

  return (
    <div className={`rating rating-${size} rating-half`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <>
          <input
            type="radio"
            name={name}
            className="bg-green-500 mask mask-star-2 mask-half-1"
            disabled
            checked={finalRating === value - 0.5}
          />
          <input
            type="radio"
            name={name}
            className="bg-green-500 mask mask-star-2 mask-half-2"
            disabled
            checked={finalRating === value}
          />
        </>
      ))}
    </div>
  );
}
