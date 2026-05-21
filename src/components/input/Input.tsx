import type { Inputprops } from "@/types/input/input";
import "../../styles/input/input.css";

export default function Input({
  label,
  type,
  placeholder,
  htmlFor,
  ...props
}: Inputprops) {
  return (
    <div className="input-container">
      <label htmlFor={htmlFor}>{label}</label>
      {type === "textarea" ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        <textarea id={htmlFor} placeholder={placeholder} {...(props as any)} />
      ) : (
        <input id={htmlFor} type={type} placeholder={placeholder} {...props} />
      )}
    </div>
  );
}
