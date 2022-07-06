export default function FormInputBlock(props) {
  return (
    <div className="mt-5">
      <small
        className={`block my-2  text-lg opacity-80 ${
          props.error ? "text-red-500" : "text-[#000B33]"
        }`}
      >
        {props.label}
        {props.required ? "*" : null}
      </small>
      {props.children}
    </div>
  );
}
