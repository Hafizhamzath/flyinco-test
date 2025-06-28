import React, { useState } from 'react';
import { FileText, MoreHorizontal, Eye, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react';
import { Badge } from './UI/Badge';

export const visaColumns = (visibleColumns, onAction) => {
  const ActionDropdown = ({ application }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="user-actions">
        <button className="ghost-btn" onClick={() => setOpen(!open)}>
          <MoreHorizontal size={16} />
        </button>
        {open && (
          <div className="dropdown-actions">
            <button onClick={() => onAction('view', application)}>
              <Eye size={14} className="mr-1" /> View Details
            </button>
          </div>
        )}
      </div>
    );
  };

  const getStatusBadgeInfo = (status) => {
    switch (status) {
      case 'Approved':
        return { variant: 'default', icon: <CheckCircle size={14} className="mr-1" /> };
      case 'Processing':
        return { variant: 'secondary', icon: <Clock size={14} className="mr-1" /> };
      case 'Rejected':
        return { variant: 'destructive', icon: <XCircle size={14} className="mr-1" /> };
      case 'Requires Attention':
        return { variant: 'outline', icon: <AlertTriangle size={14} className="mr-1" /> };
      default:
        return { variant: 'secondary', icon: null };
    }
  };

  const baseColumns = [
    {
     accessor: 'id',
     header: <span className="column-header">Application ID</span>
    },
    {
      accessor: 'applicantName',
      header: <span className="column-header">Applicant Name</span>
    },
    {
      accessor: 'country',
      header: <span className="column-header">Country</span>
    },
    {
      accessor: 'visaType',
      header: <span className="column-header">Visa Type</span>,
      render: (row) => (
        <div className="flex items-center">
          <FileText className="mr-2 text-muted-foreground" size={16} />
          {row.visaType}
        </div>
      )
    },
    {
      accessor: 'submissionDate',
      header: <span className="column-header">Submission Date</span>,
      render: (row) => new Date(row.submissionDate).toLocaleDateString()
    },
    {
      accessor: 'status',
      header: <span className="column-header">Status</span>,
      render: (row) => {
        const { variant, icon } = getStatusBadgeInfo(row.status);
        return (
          <Badge variant={variant}>
            <div className="flex items-center">
              {icon}
              {row.status}
            </div>
          </Badge>
        );
      }
    },
    {
      accessor: 'actions',
      header: <span className="column-header">Actions</span>,
      render: (row) => <ActionDropdown application={row} />
    }
  ];

  return baseColumns.filter(col => visibleColumns.includes(col.accessor));
};
