import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">About YonMedicare</h1>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Company Mission & Vision</h2>
        <p>
          YonMedicare is committed to being a leading digital medicine distributor, simplifying medicine distribution for pharmacies, ensuring regulatory compliance, and driving recurring revenue and long-term partnerships.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Distribution Capacity</h2>
        <p>
          We operate a centralized medicine distribution platform connecting a large primary pharmacy with multiple partner pharmacies, enabling efficient bulk distribution and inventory control.
        </p>
      </section>
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Regulatory Compliance</h2>
        <p>
          YonMedicare ensures full compliance with medicine regulatory standards, maintaining transparency and trust through license verification and audit capabilities.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
