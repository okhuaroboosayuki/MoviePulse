const Message = ({ text }) => {
  return (
    <div className="flex items-center justify-center h-[200px]">
      <p className="sm:text-xl text-lg text-[#111827] capitalize">
        <span role="image">😥 </span>
        {text}
      </p>
    </div>
  );
};

export default Message;
