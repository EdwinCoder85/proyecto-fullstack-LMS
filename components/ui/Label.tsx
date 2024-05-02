interface Props {
  children: React.ReactNode;
}

export function Label({ children }: Props) {
  return <label className="block text-base font-semibold text-slate-700">{children}</label>;
}
