import React, { useState, useMemo } from 'react';
import DataTableShell from '../../components/admin/Datatableshell';
import { userColumns } from '../../components/admin/UserColumns';
import { useLanguage } from '../../context/admin/LanguageContext';

const mockUsers = [
  {
    id: 1,
    name: 'HAFIZ A H',
    email: 'hafiz@example.com',
    role: 'Admin',
    verified: true,
    lastLogin: '2025-08-05T14:48:00.000Z',
  },
  {
    id: 2,
    name: 'Mohammed Swalih',
    email: 'mohammed@example.com',
    role: 'Corporate',
    verified: false,
    lastLogin: '2025-08-04T09:15:00.000Z',
  },
  {
    id: 3,
    name: 'Rahul',
    email: 'rahul@example.com',
    role: 'Client',
    verified: true,
    lastLogin: '2025-08-07T11:30:00.000Z',
  },
  {
    id: 4,
    name: 'David',
    email: 'david@example.com',
    role: 'Client',
    verified: false,
    lastLogin: '2025-08-06T16:20:00.000Z',
  },
];

const Users = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activeUserId, setActiveUserId] = useState(null);

  const visibleCols = ['name', 'email', 'role', 'verified', 'lastLogin'];

  // Filter and search logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = statusFilter ? user.role === statusFilter : true;
      return matchesSearch && matchesFilter;
    });
  }, [users, searchQuery, statusFilter]);

  const handleAction = (type, user) => {
    if (type === 'verify' || type === 'unverify') {
      setUsers(prev =>
        prev.map(u =>
          u.id === user.id ? { ...u, verified: type === 'verify' } : u
        )
      );
    } else {
      console.log(type, user.name);
    }
  };

  return (
    <div className="p-6 bg-white text-gray-900 space-y-6">
      <h1 className="m-0 font-serif font-bold text-3xl">{t('userManagement')}</h1>
      <p className="text-gray-500 text-sm">{t('userManagementDescription')}</p>

      {/* Controls: Search and Filter */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <input
          type="search"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex items-center gap-2">
          <label htmlFor="statusFilter" className="text-sm">
            {t('filterByRole')}:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">{t('allRoles')}</option>
            <option value="Admin">Admin</option>
            <option value="Corporate">Corporate</option>
            <option value="Client">Client</option>
          </select>
        </div>
      </div>

      {/* DataTable */}
      <DataTableShell
        data={filteredUsers}
        columns={userColumns(visibleCols, handleAction, activeUserId, setActiveUserId)}
        searchKey="name"
        searchValue={searchQuery}
        filterKey="role"
        filterValue={statusFilter}
        filterOptions={['Admin', 'Corporate', 'Client']}
        searchPlaceholder={t('searchPlaceholder')}
      />
    </div>
  );
};

export default Users;
