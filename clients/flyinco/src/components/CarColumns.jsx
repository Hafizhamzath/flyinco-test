import React, { useState } from 'react';
import { Car, Eye, MoreHorizontal } from 'lucide-react';
import { Badge } from './UI/Badge';

export const carColumns = (visibleColumns, onAction) => {
  const ActionDropdown = ({ rental }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="user-actions">
        <button className="ghost-btn" onClick={() => setOpen(!open)}>
          <MoreHorizontal size={16} />
        </button>
        {open && (
          <div className="dropdown-actions">
            <button onClick={() => onAction('view', rental)}>
              <Eye size={14} className="mr-1" /> View Details
            </button>
          </div>
        )}
      </div>
    );
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Confirmed': return 'default';
      case 'Pending': return 'secondary';
      case 'Cancelled': return 'destructive';
      case 'Completed': return 'outline';
      default: return 'secondary';
    }
  };

  const baseColumns = [
    {
      accessor: 'renterName',
      header: <span className="column-header">Renter Name</span>
    },
    {
      accessor: 'pickupLocation',
      header: <span className="column-header">Pickup Location</span>
    },
    {
      accessor: 'destinationLocation',
      header: <span className="column-header">Destination Location</span>
    },
    {
      accessor: 'carModel',
      header: <span className="column-header">Car Model</span>,
      render: (row) => (
        <div className="flex items-center">
          <Car className="mr-2 text-muted-foreground" size={16} />
          {row.carModel}
        </div>
      )
    },
    {
      accessor: 'pickupDate',
      header: <span className="column-header">Pickup Date</span>,
      render: (row) => new Date(row.pickupDate).toLocaleDateString()
    },
    {
      accessor: 'returnDate',
      header: <span className="column-header">Return Date</span>,
      render: (row) => new Date(row.returnDate).toLocaleDateString()
    },
    {
      accessor: 'status',
      header: <span className="column-header">Status</span>,
      render: (row) => (
        <Badge variant={getStatusBadgeVariant(row.status)}>
          {row.status}
        </Badge>
      )
    },
    {
      accessor: 'actions',
      header: <span className="column-header">Actions</span>,
      render: (row) => <ActionDropdown rental={row} />
    }
  ];

  return baseColumns.filter(col => visibleColumns.includes(col.accessor));
};
