import React, { useEffect, useState } from 'react';
import '../styles/Users.css';
import DataTableShell from '../components/DataTableShell';
import { userColumns } from '../components/UserColumns';
import { useLanguage } from '../context/LanguageContext';
import { getUsers } from '../Api/AdminApi';

const Users = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activeUserId, setActiveUserId] = useState(null);

  const visibleCols = ['name', 'email', 'role', 'verified', 'lastLogin'];

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

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
    <div className="users-page space-y-6">
      <h1 className="text-3xl font-headline font-bold text-primary">{t('userManagement')}</h1>
      <p className="text-muted-foreground">{t('userManagementDescription')}</p>

      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <DataTableShell
          data={users}
          columns={userColumns(visibleCols, handleAction, activeUserId, setActiveUserId)}
          searchKey="name"
          searchValue={searchQuery}
          filterKey="role"
          filterValue={statusFilter}
          filterOptions={['Admin', 'Corporate', 'Client']}
          searchPlaceholder={t('searchPlaceholder')}
        />
      )}
    </div>
  );
};

export default Users;
