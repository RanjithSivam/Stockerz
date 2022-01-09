export default function Table({ data }) {
  return (
    <div className="details">
      {data &&
        data.map((ele) => (
          <p key={ele.name}>
            <span className="name">{`${ele.name}: `}</span>
            <span className="value">{ele.value}</span>
          </p>
        ))}
    </div>
  );
}
