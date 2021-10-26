export function Panel({ children }: any) {
  return (
    <div className="bg-white dark:bg-gray-850 shadow rounded-lg px-5 py-4 space-y-6 flex flex-col">
      {children}
    </div>
  );
}

export function PanelGrid({ children }: any) {
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">{children[0]}</div>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <div className="space-y-6">{children[1]}</div>
      </div>
    </div>
  );
}

export function PanelWithButton({ children }: any) {
  return (
    <div className="bg-white dark:bg-gray-850 shadow rounded-md">
      <div className="px-5 py-5 space-y-4 rounded-t-md">{children[0]}</div>
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 text-right sm:px-6 rounded-b-md">
        {children[1]}
      </div>
    </div>
  );
}

export function PanelHeader({ children }: any) {
  return (
    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200 mb-2">
      {children}
    </h3>
  );
}

export function PanelDescription({ children }: any) {
  return (
    <p className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
      {children}
    </p>
  );
}
