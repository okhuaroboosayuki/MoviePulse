const Spinner = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 h-full w-full rounded-full border-6 border-transparent border-t-[#BE123C] animate-spin"></div>
        <div className="absolute inset-0 h-full w-full rounded-full border-6 border-transparent border-b-[#BE123C] animate-spin-alternate"></div>
      </div>
    </div>
  );
};

export default Spinner;
