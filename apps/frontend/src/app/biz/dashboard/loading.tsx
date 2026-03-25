export default function Loading() {
  return (
    <div className="flex flex-col items-center" aria-label="Now Loading...">
      <p className="text-center text-2xl text-gray-400 font-bold my-4">
        Now Loading...
      </p>
      <div className="animate-spin h-20 w-20 my-5 border-8 border-gray/80 rounded-full border-b-transparent"></div>
    </div>
  );
}
