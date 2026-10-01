import { CheckCircleIcon } from "./Icon";

interface CheckListProps {
  items: string[];
  className?: string;
  gapClassName?: string;
  iconClassName?: string;
}

/** Bulleted list with check icons. Text size is inherited from the parent. */
export function CheckList({
  items,
  className = "",
  gapClassName = "gap-2",
  iconClassName = "text-brand",
}: CheckListProps) {
  return (
    <ul className={`flex flex-col ${gapClassName} ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <CheckCircleIcon className={`mt-px size-6 shrink-0 lg:mt-1 ${iconClassName}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
