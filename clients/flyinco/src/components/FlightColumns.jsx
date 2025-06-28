import { Badge } from './UI/Badge';
import { MoreHorizontal, Eye } from 'lucide-react';
import React from 'react';

export const flightColumns = (visibleColumns, onAction, activeId, setActiveId) => {
  const baseColumns = [
    {
      accessor: 'passengerName',
      header: 'Passenger Name',
      sortable: true
    },
    {
      accessor: 'flight',
      header: 'Flight',
      sortable: true
    },
    {
      accessor: 'route',
      header: 'Route',
      sortable: true
    },
    {
      accessor: 'departure',
      header: 'Departure',
      sortable: true
    },
    {
      accessor: 'status',
      header: 'Status',
      sortable: true,
      render: (f) => (
        <Badge variant={
          f.status === 'Confirmed' ? 'default' :
          f.status === 'Pending' ? 'secondary' :
          f.status === 'Cancelled' ? 'destructive' :
          'outline'
        }>
          {f.status}
        </Badge>
      )
    },
    {
      accessor: 'pnr',
      header: 'PNR',
      sortable: true
    },
    {
      accessor: 'actions',
      header: 'Actions',
      render: (flight) => (
        <div className="user-actions">
          <button
            className="ghost-btn"
            onClick={() => setActiveId(prev => prev === flight.id ? null : flight.id)}
          >
            <MoreHorizontal />
          </button>
          {activeId === flight.id && (
            <div className="dropdown-actions">
              <button onClick={() => onAction('view', flight)}>
                <Eye size={14} /> View Details
              </button>
            </div>
          )}
        </div>
      )
    }
  ];

  return baseColumns.filter(col => visibleColumns.includes(col.accessor) || col.accessor === 'actions');
};
