import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const PharmacyProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    licenseNumber: '',
    gstNumber: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
  });
  const [licenseFile, setLicenseFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await api.get('/pharmacy/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setLicenseFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('licenseNumber', profile.licenseNumber);
      formData.append('gstNumber', profile.gstNumber);
      formData.append('address', profile.address);
      formData.append('contactEmail', profile.contactEmail);
      formData.append('contactPhone', profile.contactPhone);
      if (licenseFile) {
        formData.append('licenseFile', licenseFile);
      }

      await api.put('/pharmacy/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Pharmacy Profile & License Upload</h1>

      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
          <div>
            <label className="block font-semibold mb-1">Pharmacy Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">License Number</label>
            <input
              type="text"
              name="licenseNumber"
              value={profile.licenseNumber}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">GST / Tax Number</label>
            <input
              type="text"
              name="gstNumber"
              value={profile.gstNumber}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Address</label>
            <textarea
              name="address"
              value={profile.address}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={profile.contactEmail}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Contact Phone</label>
            <input
              type="tel"
              name="contactPhone"
              value={profile.contactPhone}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Upload Pharmacy License</label>
            <input
              type="file"
              accept="application/pdf,image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-emerald-600 text-white px-6 py-3 rounded font-bold hover:bg-emerald-700 transition"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default PharmacyProfile;
