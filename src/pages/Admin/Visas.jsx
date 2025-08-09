import React, { useState, useEffect } from 'react';
import DataTableShell from '../../components/admin/Datatableshell';
import { visaColumns } from '../../components/admin/VisaColumns';
import { useLanguage } from '../../context/admin/LanguageContext';

const Visas = () => {
  const { t } = useLanguage();

  const [visibleCols] = useState([
    'id',
    'applicantName',
    'country',
    'status',
    'actions'
  ]);

  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedVisa, setSelectedVisa] = useState(null);

  useEffect(() => {
    const fetchVisas = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/visas');
        if (!response.ok) {
          throw new Error('Failed to fetch visa applications');
        }
        const data = await response.json();

        const mappedVisas = data.map((visa) => ({
          id: visa._id,
          applicantName: `${visa.firstName} ${visa.lastName}`,
          country: visa.destinationCountry,
          visaType: visa.visaType,
          submissionDate: visa.submittedAt,
          status: visa.status || 'Processing',
          ...visa,
        }));

        setVisas(mappedVisas);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVisas();
  }, []);

  const handleAction = (type, payload) => {
    if (type === 'view') {
      setSelectedVisa(payload);
    } else if (type === 'search') {
      setSearchQuery(payload);
    } else if (type === 'filter') {
      setStatusFilter(payload);
    }
  };

  const closeModal = () => setSelectedVisa(null);

  if (loading) return <p className="text-center py-6">{t('loading')}...</p>;
  if (error) return <p className="text-center py-6 text-red-600">{error}</p>;

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold font-serif text-indigo-700">{t('visaApplications')}</h1>
      <p className="text-gray-500">{t('visaManagementDescription')}</p>

      <DataTableShell
        data={visas}
        columns={visaColumns(visibleCols, handleAction)}
        searchKey="applicantName"
        searchValue={searchQuery}
        filterKey="status"
        filterValue={statusFilter}
        filterOptions={['Approved', 'Processing', 'Rejected', 'Requires Attention']}
        onAction={handleAction}
        searchPlaceholder={t('searchApplicantsPlaceholder')}
      />

      {selectedVisa && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">{t('visaDetails')}</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <strong>{t('applicantName')}:</strong> {selectedVisa.applicantName}
              </li>
              <li>
                <strong>{t('country')}:</strong> {selectedVisa.country}
              </li>
              <li>
                <strong>{t('visaType')}:</strong> {selectedVisa.visaType}
              </li>
              <li>
                <strong>{t('submissionDate')}:</strong> {new Date(selectedVisa.submissionDate).toLocaleDateString()}
              </li>
              <li>
                <strong>{t('status')}:</strong> {selectedVisa.status}
              </li>
              <li>
                <strong>{t('applicationId')}:</strong> {selectedVisa.id}
              </li>
            </ul>
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visas;
