function Card(props) {
  return (
    <div className="flex flex-col justify-center bg-[#e9ecef] border-solid border-2 shadow-xl rounded-xl   w-72 py-1">
      <div className="h-2/3">
        <img className="h-full w-80" src={props.image} alt="" />
      </div>
      <div className="px-2">
        <div className="text-xl font-bold">{props.head}</div>
        <div className="text-lg">{props.body}</div>
      </div>
    </div>
  );
}
export default Card;
