import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { MoreHorizontal } from 'lucide-react';

const DataTableShell = ({
  data,
  columns,
  searchPlaceholder = 'Search by name or email',
  searchKey = 'name',
  searchValue = '',
  filterKey = 'role',
  filterValue = '',
  filterOptions = [],
  showActions = false,
  onAction
}) => {
  const [query, setQuery] = useState(searchValue);
  const [sortConfig, setSortConfig] = useState(null);
  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(columns.map(col => [col.accessor, true]))
  );
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const controlRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (controlRef.current && !controlRef.current.contains(e.target)) {
        setShowColumnDropdown(false);
        setActiveId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const visibleCols = useMemo(
    () => columns.filter(col => columnVisibility[col.accessor]),
    [columns, columnVisibility]
  );

  const filtered = useMemo(() => {
    let arr = data;
    if (query) {
      arr = arr.filter(item =>
        (item[searchKey] || '').toString().toLowerCase().includes(query.toLowerCase())
      );
    }
    if (filterValue) {
      arr = arr.filter(item => item[filterKey] === filterValue);
    }
    if (sortConfig) {
      const { key, dir } = sortConfig;
      arr = [...arr].sort((a, b) => {
        const x = (a[key] || '').toString().toLowerCase();
        const y = (b[key] || '').toString().toLowerCase();
        if (x < y) return dir === 'asc' ? -1 : 1;
        if (x > y) return dir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return arr;
  }, [data, query, filterValue, sortConfig, searchKey, filterKey]);

  const requestSort = key => {
    let dir = 'asc';
    if (sortConfig?.key === key && sortConfig.dir === 'asc') dir = 'desc';
    setSortConfig({ key, dir });
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <input
          type="text"
          className="flex-grow min-w-[180px] max-w-xs px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder={searchPlaceholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="flex flex-wrap gap-4">
          {filterOptions.length > 0 && (
            <div className="min-w-[160px] relative">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={filterValue}
                onChange={e => onAction('__filter__', e.target.value)}
              >
                <option value="">All</option>
                {filterOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          )}
          <div className="relative min-w-[160px]" ref={controlRef}>
            <button
              onClick={() => setShowColumnDropdown(!showColumnDropdown)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Columns
            </button>
            {showColumnDropdown && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-md z-50 p-2 mt-1">
                {columns.map(col => (
                  <label
                    key={`col-toggle-${col.accessor}`}
                    className="flex items-center gap-2 mb-2 text-gray-700 text-sm last:mb-0 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={columnVisibility[col.accessor]}
                      onChange={() =>
                        setColumnVisibility(prev => ({
                          ...prev,
                          [col.accessor]: !prev[col.accessor]
                        }))
                      }
                      className="cursor-pointer"
                    />
                    {col.header}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            {visibleCols.map(col => (
              <th
                key={`th-${col.accessor}`}
                onClick={() => col.sortable && requestSort(col.accessor)}
                className={`cursor-pointer select-none px-4 py-3 border-b border-gray-300 bg-gray-100 text-left text-gray-700 text-sm font-semibold ${
                  col.sortable ? 'hover:bg-gray-200' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  {col.header}
                  <FontAwesomeIcon
                    icon={
                      sortConfig?.key === col.accessor
                        ? sortConfig.dir === 'asc'
                          ? faSortUp
                          : faSortDown
                        : faSort
                    }
                    className="text-gray-400"
                  />
                </div>
              </th>
            ))}
            {showActions && (
              <th className="px-4 py-3 border-b border-gray-300 bg-gray-100 text-left text-gray-700 text-sm font-semibold">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr
              key={`row-${item.id}`}
              className="hover:bg-gray-50"
            >
              {visibleCols.map(col => (
                <td key={`cell-${item.id}-${col.accessor}`} className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm align-middle">
                  {col.render ? col.render(item) : item[col.accessor]}
                </td>
              ))}
              {showActions && (
                <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm align-middle relative">
                  <div className="relative inline-block">
                    <button
                      className="text-gray-600 hover:text-gray-900 p-1 rounded focus:outline-none"
                      onClick={() => setActiveId(prev => (prev === item.id ? null : item.id))}
                      aria-label="Toggle actions"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                    {activeId === item.id && (
                      <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-md z-50 p-2">
                        {visibleCols.find(c => c.accessor === 'actions')?.render(item)}
                      </div>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTableShell;
