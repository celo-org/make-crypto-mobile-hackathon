import { FragmentsOnCompositeTypesRule } from 'graphql';
import { useState, useEffect, useRef } from 'react';

export function Dropdown({
  options,
  selected,
  setSelected,
  render,
}: {
  options: string[];
  selected: string;
  setSelected: any;
  render?: any;
}) {
  const dropdownRef = useRef();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (!open) {
        return;
      }
      // @ts-ignore
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef.current, open]);

  return (
    <div>
      <div className="relative w-40">
        <button
          onClick={() => setOpen((o) => !o)}
          type="button"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          className="bg-gray-50 dark:bg-gray-800 relative w-full border border-gray-600 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-10 p-2"
        >
          <span className="block truncate text-white">{selected}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {/* <!-- Heroicon name: selector --> */}
            <svg
              className="h-5 w-5 text-gray-600 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>

        {/* <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
        {open && (
          <div
            ref={dropdownRef}
            className="absolute mt-1 w-full rounded-md bg-gray-600 shadow-lg z-50"
          >
            <ul
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-item-3"
              className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            >
              {/* <!--
          Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

          Highlighted: "text-white bg-indigo-600", Not Highlighted: "text-gray-900"
        --> */}
              {options.map((o) => (
                <li
                  id="listbox-option-0 "
                  role="option"
                  onClick={() => {
                    setSelected(o);
                    setOpen(false);
                  }}
                  className={`flex ${'hover:text-white hover:bg-indigo-600'} group cursor-default select-none relative py-2 pl-3 pr-9`}
                >
                  {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                  <span
                    className={`${
                      selected === o ? 'font-semibold' : 'font-normal'
                    }  block truncate `}
                  >
                    {o}
                  </span>

                  {/* <!--
                    Checkmark, only display for selected option.
                    Highlighted: "text-white", Not Highlighted: "text-indigo-600"
                  --> */}
                  {selected === o && (
                    <span className="text-indigo-800 group-hover:text-white absolute inset-y-0 right-0 flex items-center pr-4">
                      {/* <!-- Heroicon name: check --> */}
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function DropButton({
  groups,
  display,
  disabled,
  className,
}: {
  display: any;
  groups?: { text: any; onClick: () => Promise<void> | void }[][];
  disabled?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      // @ts-ignore
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <div ref={dropRef} className={`inline-block ${className}`}>
      <div>
        <button
          type="button"
          className={`flex justify-between rounded-md px-2 py-2 text-sm border border-gray-400 dark:border-gray-500 px-4 py-2 focus:ring-0 focus:outline-none ${
            !disabled && 'dark:hover:bg-gray-800'
          } whitespace-nowrap transition`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={disabled ? undefined : () => setOpen((o) => !o)}
        >
          {display}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="relative">
        {open && (
          <div
            className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {groups!.map((group) => (
              <div className="py-1">
                {group.map(({ onClick, text }) => (
                  <button
                    className="block px-4 py-2 text-sm transition hover:bg-gray-100 dark:hover:bg-gray-825 w-full text-left"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      e.nativeEvent.stopImmediatePropagation();
                      onClick();
                      setOpen(false);
                    }}
                  >
                    {text}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
