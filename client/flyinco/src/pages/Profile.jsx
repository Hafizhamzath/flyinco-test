import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit, FiSave, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Profile.css';
import PageWrapper from '../components/Layout/PageWrapper';

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    department: 'Travel Operations',
    title: 'Senior Travel Consultant',
    joinDate: '2023-03-15',
    bio: 'Experienced travel consultant with over 5 years in the industry, specializing in corporate travel and luxury vacation planning.'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const stats = [
    { label: 'Bookings Processed', value: '1,247' },
    { label: 'Customer Rating', value: '4.9/5' },
    { label: 'Years Experience', value: '5+' },
    { label: 'Certifications', value: '3' }
  ];

  return (
    <PageWrapper>
    <div className="profile-container">
      <div className="profile-header">
        <div>
          <h1>{t('profile')}</h1>
          <p>Manage your account information and preferences</p>
        </div>
        <div>
          {isEditing ? (
            <div className="action-buttons">
              <button className="btn-primary" onClick={handleSave}>
                <FiSave /> {t('save')}
              </button>
              <button className="btn-secondary" onClick={() => setIsEditing(false)}>
                <FiX /> {t('cancel')}
              </button>
            </div>
          ) : (
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              <FiEdit /> {t('edit')}
            </button>
          )}
        </div>
      </div>

      <div className="profile-grid">
        {/* Profile Main Info */}
        <div className="profile-main card">
          <div className="profile-summary">
            <img src={user.avatar} alt={user.name} />
            <div>
              <h2>{formData.name}</h2>
              <p>{formData.title}</p>
              <small>{formData.department}</small>
            </div>
          </div>

          <div className="form-grid">
            {['name', 'email', 'phone', 'location'].map((field, idx) => (
              <div key={idx}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                {isEditing ? (
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div className="readonly">
                    {field === 'name' && <FiUser />}
                    {field === 'email' && <FiMail />}
                    {field === 'phone' && <FiPhone />}
                    {field === 'location' && <FiMapPin />}
                    <span>{formData[field]}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <label>Bio</label>
            {isEditing ? (
              <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows="4" />
            ) : (
              <div className="readonly bio">{formData.bio}</div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="sidebar">
          <div className="card">
            <h3>Performance Stats</h3>
            {stats.map((s, i) => (
              <div className="stat-row" key={i}>
                <p>{s.label}</p>
                <strong>{s.value}</strong>
              </div>
            ))}
          </div>

          <div className="card">
            <h3>Account Information</h3>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Join Date:</strong> {formData.joinDate}</p>
            <p><strong>Status:</strong> <span className="status-active">Active</span></p>
          </div>

          <div className="card">
            <h3>Quick Actions</h3>
            <button className="btn-secondary">Change Password</button>
            <button className="btn-secondary">Two-Factor Authentication</button>
            <button className="btn-secondary">Download Data</button>
            <button className="btn-secondary danger">Deactivate Account</button>
          </div>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
};

export default Profile;
