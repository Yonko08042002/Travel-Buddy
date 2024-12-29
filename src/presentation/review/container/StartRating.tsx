const ratings = [1, 2, 3, 4, 5]; // Fixed set of 5 stars

interface StarRatingProps {
  rating: number; // Current selected rating
  size: number; // Size of the star icon (e.g., 20px, 24px)
  onChange?: (value: number) => void; // Callback for rating change
}

export default function StarRating({
  size,
  rating,
  onChange
}: StarRatingProps) {
  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onChange?.(index);
    }
    if (event.key === 'ArrowRight' && index < 5) {
      onChange?.(index + 1);
    }
    if (event.key === 'ArrowLeft' && index > 1) {
      onChange?.(index - 1);
    }
  };

  return (
    <div className='flex' role='radiogroup' aria-label='Star Rating'>
      {ratings.map((index) => (
        <button
          key={index}
          type='button'
          aria-checked={index === rating}
          aria-label={`Rate ${index} star${index > 1 ? 's' : ''}`}
          onClick={() => onChange?.(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className='focus:outline-none'
        >
          <svg
            className={index <= rating ? 'text-yellow-500' : 'text-gray-300'}
            fill='currentColor'
            viewBox='0 0 20 20'
            style={{ width: size, height: size }}
          >
            <title>{`Rating: ${index} star${index > 1 ? 's' : ''}`}</title>
            <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.247 3.848a1 1 0 00.95.69h4.011c.969 0 1.371 1.24.588 1.81l-3.24 2.35a1 1 0 00-.364 1.118l1.248 3.848c.3.921-.755 1.688-1.54 1.118l-3.24-2.35a1 1 0 00-1.175 0l-3.24 2.35c-.784.57-1.84-.197-1.54-1.118l1.248-3.848a1 1 0 00-.364-1.118l-3.24-2.35c-.784-.57-.381-1.81.588-1.81h4.011a1 1 0 00.95-.69l1.247-3.848z' />
          </svg>
        </button>
      ))}
    </div>
  );
}
