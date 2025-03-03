import { DropDownProps } from "@/types/track-rev";

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
    return <div>Error: Selected value isn't included in the options.</div>;
  }

  return (
    <div className="mx-auto mt-5 flex w-full justify-center">
      <select
        value={currentValue}
        onChange={handleYearChange}
        className="border-2 border-stone-400 rounded-xl border-stone-100 bg-inherit text-inherit p-1 w-1/6 text-center"
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
