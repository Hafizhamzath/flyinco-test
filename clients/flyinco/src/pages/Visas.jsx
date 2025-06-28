import React, { useState } from 'react';
import '../styles/Visas.css';
import DataTableShell from '../components/DataTableShell';
import { visaColumns } from '../components/VisaColumns';

const mockVisaApplications = [
  {
    id: 'v1',
    applicantName: 'Fatima Al-Salem',
    country: 'UK',
    visaType: 'Student Visa',
    submissionDate: '2024-06-20',
    status: 'Processing'
  },
  {
    id: 'v2',
    applicantName: 'Yousef Hassan',
    country: 'USA',
    visaType: 'Tourist Visa',
    submissionDate: '2024-06-10',
    status: 'Approved'
  },
  {
    id: 'v3',
    applicantName: 'Hana Badr',
    country: 'Canada',
    visaType: 'Work Visa',
    submissionDate: '2024-05-30',
    status: 'Rejected'
  },
  {
    id: 'v4',
    applicantName: 'Omar Zahrani',
    country: 'Australia',
    visaType: 'Business Visa',
    submissionDate: '2024-06-15',
    status: 'Approved'
  },
  {
    id: 'v5',
    applicantName: 'Amina Noor',
    country: 'Germany',
    visaType: 'Student Visa',
    submissionDate: '2024-06-12',
    status: 'Processing'
  },
  {
    id: 'v6',
    applicantName: 'Tariq Jalal',
    country: 'France',
    visaType: 'Tourist Visa',
    submissionDate: '2024-06-05',
    status: 'Rejected'
  },
  {
    id: 'v7',
    applicantName: 'Leila Samir',
    country: 'Japan',
    visaType: 'Work Visa',
    submissionDate: '2024-06-01',
    status: 'Processing'
  },
  {
    id: 'v8',
    applicantName: 'Noura Al-Hamdan',
    country: 'Italy',
    visaType: 'Tourist Visa',
    submissionDate: '2024-06-03',
    status: 'Requires Attention'
  },
  {
    id: 'v9',
    applicantName: 'Salman Rafiq',
    country: 'Spain',
    visaType: 'Business Visa',
    submissionDate: '2024-06-08',
    status: 'Approved'
  },
  {
    id: 'v10',
    applicantName: 'Zainab Yasin',
    country: 'Netherlands',
    visaType: 'Student Visa',
    submissionDate: '2024-06-18',
    status: 'Processing'
  }
];

const Visas = () => {
  const [visibleCols] = useState([
    'id',
    'applicantName',
    'country',
    'status',
    'actions'
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedVisa, setSelectedVisa] = useState(null);

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

  return (
    <div className="visas-page space-y-6">
      <h1 className="text-3xl font-headline font-bold text-primary">Visa Applications</h1>
      <p className="text-muted-foreground">Track and manage all visa applications.</p>

      <DataTableShell
        data={mockVisaApplications}
        columns={visaColumns(visibleCols, handleAction)}
        searchKey="applicantName"
        searchValue={searchQuery}
        filterKey="status"
        filterValue={statusFilter}
        filterOptions={['Approved', 'Processing', 'Rejected', 'Requires Attention']}
        onAction={handleAction}
        searchPlaceholder="Search applicants..."
      />

      {selectedVisa && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Visa Details</h2>
            <ul className="space-y-2 text-sm">
              <li><strong>Applicant Name:</strong> {selectedVisa.applicantName}</li>
              <li><strong>Country:</strong> {selectedVisa.country}</li>
              <li><strong>Visa Type:</strong> {selectedVisa.visaType}</li>
              <li><strong>Submission Date:</strong> {new Date(selectedVisa.submissionDate).toLocaleDateString()}</li>
              <li><strong>Status:</strong> {selectedVisa.status}</li>
              <li><strong>Application ID:</strong> {selectedVisa.id}</li>
            </ul>
            <button onClick={closeModal} className="close-btn mt-4">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visas;
