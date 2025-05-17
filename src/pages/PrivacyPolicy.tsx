import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-neutral-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-serif font-semibold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-neutral-700 leading-relaxed">
            <p>
              At the UWK Foundation, we are committed to safeguarding the privacy and security of our members' personal information. As a trusted organization, we ensure that all data provided to us is handled with the highest level of confidentiality and is never shared with third parties without your explicit consent.
            </p>
            
            <p>
              We value the trust you place in us and adhere to strict data protection standards to maintain the security of your information. Whether you provide personal details during registration or through interactions with our platform, we take all necessary measures to protect your data in accordance with best industry practices.
            </p>
            
            <p>
              In an era where digital security is paramount, we continuously implement advanced security technologies and privacy protocols to prevent unauthorized access, data breaches, or misuse of personal information.
            </p>
            
            <p>
              If you have any questions or concerns regarding our Privacy Policy, please feel free to contact us. Your privacy is our priority, and we are here to address any inquiries you may have.
            </p>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Personal identification information (Name, email address, phone number, etc.)</li>
                <li>Payment information</li>
                <li>Website usage data</li>
                <li>Communication preferences</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>To process ticket purchases and manage your account</li>
                <li>To communicate with you about your purchases and our services</li>
                <li>To notify you about prize draws and results</li>
                <li>To improve our website and services</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Data Security</h2>
              <p>
                We implement appropriate data collection, storage, and processing practices, as well as security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and data stored on our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Third-Party Services</h2>
              <p>
                We use third-party services for payment processing. These services have their own privacy policies, and we recommend that you review their terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
              <p>As a user, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your information</li>
                <li>Request a transfer of your data</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="mt-2">
                <li>Email: info@uwkfoundation.com</li>
                <li>Phone: +27 69 876 8186</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;