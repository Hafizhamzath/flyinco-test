import { ShieldCheck, ShieldAlert, MoreHorizontal, Pencil, KeyRound } from 'lucide-react';
import { Badge } from '../UI/Badge';
import React from 'react';

export const userColumns = (visibleColumns, onAction, activeUserId, setActiveUserId) => {
  const baseColumns = [
    {
      accessor: 'name',
      header: 'Name',
      sortable: true,
      render: (user) => (
        <div className="profile-cell">
          <div className="profile-avatar">{user.name?.charAt(0).toUpperCase()}</div>
          <span>{user.name}</span>
        </div>
      )
    },
    {
      accessor: 'email',
      header: 'Email',
      sortable: true
    },
    {
      accessor: 'role',
      header: 'Role',
      sortable: true,
      render: (user) => (
        <Badge variant={user.role === 'Admin' ? 'destructive' : 'secondary'}>
          {user.role}
        </Badge>
      )
    },
    {
      accessor: 'verified',
      header: 'Verification',
      sortable: true,
      render: (user) =>
        user.verified ? (
          <Badge variant="default"><ShieldCheck size={14} /> Verified</Badge>
        ) : (
          <Badge variant="outline"><ShieldAlert size={14} /> Unverified</Badge>
        )
    },
    {
      accessor: 'lastLogin',
      header: 'Last Login',
      sortable: true
    },
    {
      accessor: 'actions',
      header: 'Actions',
      render: (user) => (
        <div className="user-actions">
          <button
            className="ghost-btn"
            onClick={() =>
              setActiveUserId(prev => (prev === user.id ? null : user.id))
            }
          >
            <MoreHorizontal />
          </button>
          {activeUserId === user.id && (
            <div className="dropdown-actions">
              <button onClick={() => onAction('edit', user)}>
                <Pencil size={14} /> Edit Role
              </button>
              <button onClick={() => onAction('reset', user)}>
                <KeyRound size={14} /> Reset OTP
              </button>
              <button onClick={() => onAction(user.verified ? 'unverify' : 'verify', user)}>
                {user.verified ? (
                  <><ShieldAlert size={14} /> Unverify</>
                ) : (
                  <><ShieldCheck size={14} /> Verify</>
                )}
              </button>
            </div>
          )}
        </div>
      )
    }
  ];

  return baseColumns.filter(col => visibleColumns.includes(col.accessor) || col.accessor === 'actions');
};
