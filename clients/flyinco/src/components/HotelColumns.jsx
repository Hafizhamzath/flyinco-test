import { Eye, Hotel, MoreHorizontal } from 'lucide-react';
import { Badge } from './UI/Badge';
import React, { useState } from 'react';

export const hotelColumns = (visibleColumns, onAction) => {
  const ActionDropdown = ({ booking }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="user-actions">
        <button className="ghost-btn" onClick={() => setOpen(!open)}>
          <MoreHorizontal size={16} />
        </button>
        {open && (
          <div className="dropdown-actions">
            <button onClick={() => onAction('view', booking)}>
              <Eye size={14} className="mr-1" /> View Details
            </button>
          </div>
        )}
      </div>
    );
  };

  const baseColumns = [
    {
      accessor: 'guestName',
      header: 'Guest Name',
      sortable: true,
      render: (row) => (
        <div className="profile-cell">
          <div className="profile-avatar">{row.guestName.charAt(0).toUpperCase()}</div>
          <span>{row.guestName}</span>
        </div>
      )
    },
    {
      accessor: 'hotel',
      header: 'Hotel',
      sortable: true,
      render: (row) => (
        <div className="flex items-center">
          <Hotel className="mr-2 text-muted-foreground" size={16} />
          {row.hotelName}, {row.city}
        </div>
      )
    },
    {
      accessor: 'checkIn',
      header: 'Check-in',
      sortable: true,
      render: (row) => new Date(row.checkIn).toLocaleDateString()
    },
    {
      accessor: 'checkOut',
      header: 'Check-out',
      sortable: true,
      render: (row) => new Date(row.checkOut).toLocaleDateString()
    },
    {
      accessor: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => (
        <Badge variant={
          row.status === 'Confirmed'
            ? 'default'
            : row.status === 'Pending'
              ? 'secondary'
              : 'destructive'
        }>
          {row.status}
        </Badge>
      )
    },
    {
      accessor: 'actions',
      header: 'Actions',
      render: (row) => <ActionDropdown booking={row} />
    }
  ];

  return baseColumns.filter(col => visibleColumns.includes(col.accessor));
};
