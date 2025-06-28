import React, { useState, useMemo, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { MoreHorizontal } from 'lucide-react';
import '../styles/DataTableShell.css';

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
    <div className="datatable">
      <div className="datatable-controls">
        <input
          type="text"
          className="search-input"
          placeholder={searchPlaceholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="right-controls">
          {filterOptions.length > 0 && (
            <div className="filter-control">
              <select
                className="filter-select"
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
          <div className="filter-control" ref={controlRef}>
            <button
              className="filter-select"
              onClick={() => setShowColumnDropdown(!showColumnDropdown)}
            >
              Columns
            </button>
            {showColumnDropdown && (
              <div className="dropdown-menu">
                {columns.map(col => (
                  <label key={`col-toggle-${col.accessor}`} className="dropdown-item">
                    <input
                      type="checkbox"
                      checked={columnVisibility[col.accessor]}
                      onChange={() =>
                        setColumnVisibility(prev => ({
                          ...prev,
                          [col.accessor]: !prev[col.accessor]
                        }))
                      }
                    />
                    {col.header}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            {visibleCols.map(col => (
              <th key={`th-${col.accessor}`} onClick={() => col.sortable && requestSort(col.accessor)}>
                {col.header}
                <FontAwesomeIcon
                  icon={
                    sortConfig?.key === col.accessor
                      ? sortConfig.dir === 'asc'
                        ? faSortUp
                        : faSortDown
                      : faSort
                  }
                  className="sort-icon"
                />
              </th>
            ))}
            {showActions && <th key="actions-header">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr key={`row-${item.id}`}>
              {visibleCols.map(col => (
                <td key={`cell-${item.id}-${col.accessor}`}>
                  {col.render ? col.render(item) : item[col.accessor]}
                </td>
              ))}
              {showActions && (
                <td key={`action-${item.id}`}>
                  <div className="user-actions">
                    <button
                      className="ghost-btn"
                      onClick={() => setActiveId(prev => prev === item.id ? null : item.id)}
                    >
                      <MoreHorizontal />
                    </button>
                    {activeId === item.id && (
                      <div className="dropdown-actions" key={`dropdown-${item.id}`}>
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
