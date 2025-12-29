import React from 'react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">How It Works</h1>
      <ol className="list-decimal list-inside space-y-4 text-lg">
        <li><strong>Register:</strong> Partner pharmacies register on the YonMedicare platform.</li>
        <li><strong>Verify:</strong> YonMedicare verifies the pharmacy licenses and approves registrations.</li>
        <li><strong>Order:</strong> Pharmacies place bulk medicine orders through the centralized catalog.</li>
        <li><strong>Deliver:</strong> Orders are processed, packed, and delivered via express logistics.</li>
      </ol>
    </div>
  );
};

export default HowItWorks;
