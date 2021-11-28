import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

export function Table({
  headers,
  rows,
  loading,
  noDataMessage,
  onHeaderClick,
  sort,
}: {
  headers: (string | { displayName: string; sortableProperty: string })[];
  rows: any[];
  loading: boolean;
  noDataMessage: string;
  onHeaderClick?: (x: string, desc: boolean) => void;
  sort?: { property: string; desc: boolean };
}) {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 dark:border-gray-900">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              <thead className="">
                <tr>
                  {headers.map((h) => {
                    if (typeof h === 'object' && onHeaderClick) {
                      return (
                        <th scope="col">
                          <button
                            onClick={() => {
                              if (sort.property === h.sortableProperty) {
                                onHeaderClick(h.sortableProperty, !sort.desc);
                              } else {
                                onHeaderClick(h.sortableProperty, true);
                              }
                            }}
                            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider flex items-center space-x-2 outline-none whitespace-nowrap focus:outline-none"
                          >
                            <span>{h.displayName}</span>

                            <div>
                              <FaChevronUp
                                style={{ height: '0.7em', width: '0.7em' }}
                                className={
                                  sort?.property === h.sortableProperty &&
                                  !sort?.desc &&
                                  'text-green-500'
                                }
                              />
                              <FaChevronDown
                                className={
                                  sort?.property === h.sortableProperty &&
                                  sort?.desc &&
                                  'text-green-500'
                                }
                                style={{ height: '0.7em', width: '0.7em' }}
                              />
                            </div>
                          </button>
                        </th>
                      );
                    }
                    return (
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider whitespace-nowrap"
                      >
                        {h}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-750">
                {loading ? (
                  <tr>
                    <td colSpan={100}>
                      <div className="flex justify-center">
                        <Loader
                          type="ThreeDots"
                          color="#4f46e5"
                          height={40}
                          width={40}
                          timeout={10000} //3 secs
                        />
                      </div>
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={100}>
                      <div className="text-center text-gray-600 dark:text-gray-400 text-sm py-6 w-full">
                        {noDataMessage}
                      </div>
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => {
                    return (
                      <tr>
                        {r.map((column) => (
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">
                            {column}
                          </td>
                        ))}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
