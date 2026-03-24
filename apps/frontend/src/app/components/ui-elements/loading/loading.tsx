const BallPulseSyncLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-1">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 bg-pink-500 rounded-full animate-pulse`}
            style={{
              animation: `ballPulseSync 0.6s ${index * 0.07}s infinite ease-in-out`,
            }}
          ></div>
        ))}
      </div>
      <style jsx>{`
        @keyframes ballPulseSync {
          33% {
            transform: translateY(5px);
          }
          66% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BallPulseSyncLoading;
