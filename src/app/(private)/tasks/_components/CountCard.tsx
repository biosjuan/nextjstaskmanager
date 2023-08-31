import Link from 'next/link';

function CountCard({
  title,
  count,
  path,
  queryParams,
}: {
  title: string;
  count: number;
  path: string;
  queryParams: any;
}) {
  const getRandomTextColor = () => {
    const colours = [
      'text-red-600',
      'text-green-600 ',
      'text-blue-600',
      'text-indigo-600',
      'text-purple-600',
      'text-pink-600',
    ];
    const randomIndex = Math.floor(Math.random() * colours.length);
    return colours[randomIndex];
  };
  return (
    <Link
      href={{
        pathname: path,
        query: queryParams,
      }}
    >
      <div className='flex flex-col gap-5 p-5 border border-gray-300 items-center justify-center'>
        <h1 className='text-xl font-semibold text-gray-600'>{title}</h1>
        <h1 className={`text-7xl font-bold ${getRandomTextColor()}`}>
          {count}
        </h1>
      </div>
    </Link>
  );
}

export default CountCard;
