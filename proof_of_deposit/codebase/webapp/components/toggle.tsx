export function Toggle({
  active,
  onChange,
  disabled,
}: {
  disabled?: boolean;
  active: boolean;
  onChange: (newValue: boolean) => void;
}) {
  return (
    <button
      disabled={disabled}
      type="button"
      aria-pressed="false"
      aria-labelledby="toggleLabel"
      className={`${
        active ? 'bg-indigo-600' : 'bg-gray-200'
      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      onClick={() => {
        if (disabled) {
          return;
        }
        onChange(!active);
      }}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${
          active ? 'translate-x-5' : 'translate-x-0'
        } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
      ></span>
    </button>
  );
}
