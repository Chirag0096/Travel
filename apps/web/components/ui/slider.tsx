export function Slider(props: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return <input {...props} type="range" className={`w-full ${props.className ?? ''}`} />;
}
