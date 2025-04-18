import type { DropDownProps } from "@/types/track-rev";

const DropDown: React.FC<DropDownProps> = ({
  field,
  currentValue,
  options,
  onYearChange,
}) => {
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onYearChange(event.target.value, field);
  };

  if (!options.includes(currentValue)) {
    return <div>Error: Selected value isn&apos;t included in the options.</div>;
  }

  return (
    <div className="mx-auto mt-5 flex w-full justify-center">
      <select
        value={currentValue}
        onChange={handleYearChange}
        className="w-1/2 rounded-xl border-2 border-stone-100 border-stone-400 bg-inherit p-1 text-center text-inherit md:w-1/6"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
