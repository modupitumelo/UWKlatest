import React from 'react';

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="bg-neutral-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-serif font-semibold mb-6">Terms and Conditions</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-neutral-700 leading-relaxed">
                Welcome to the UWK Foundation website. By accessing and using this website, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree with these terms, please refrain from using our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Eligibility</h2>
              <ul className="list-disc pl-6 text-neutral-700 leading-relaxed space-y-2">
                <li>Participation in our competition is open to all individuals who meet the necessary legal requirements.</li>
                <li>By purchasing a ticket, you confirm that you are legally eligible to participate.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Competition Details</h2>
              <ul className="list-disc pl-6 text-neutral-700 leading-relaxed space-y-2">
                <li>By purchasing a ticket, participants have the chance to win a luxury home, opt to have a new home built to their specifications, or receive building materials to support their construction project.</li>
                <li>The number of tickets purchased increases the chances of winning.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Community Contribution</h2>
              <p className="text-neutral-700 leading-relaxed">
                Proceeds from ticket sales contribute to community development and initiatives aimed at making a positive impact.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Winner Selection and Event</h2>
              <ul className="list-disc pl-6 text-neutral-700 leading-relaxed space-y-2">
                <li>Winners will be selected through a live draw at an official UWK Foundation event.</li>
                <li>Participants are encouraged to attend the event, though presence is not mandatory for winning.</li>
                <li>The results of the draw are final and binding.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Prize Options and Claiming</h2>
              <ul className="list-disc pl-6 text-neutral-700 leading-relaxed space-y-2">
                <li>Winners may choose between a pre-selected dream home, a custom-built home, or building materials.</li>
                <li>Prizes must be claimed within the specified timeframe, as communicated by UWK Foundation.</li>
                <li>Failure to claim the prize within the stipulated period may result in forfeiture.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. No Refunds</h2>
              <p className="text-neutral-700 leading-relaxed">
                All ticket purchases are final. No refunds or cancellations will be allowed.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
              <ul className="list-disc pl-6 text-neutral-700 leading-relaxed space-y-2">
                <li>UWK Foundation is not responsible for any losses, damages, or liabilities arising from participation in the competition.</li>
                <li>The company reserves the right to modify, suspend, or cancel the competition at any time without prior notice.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">9. Modification of Terms</h2>
              <p className="text-neutral-700 leading-relaxed">
                UWK Foundation reserves the right to update or change these Terms and Conditions at any time. Continued use of the website implies acceptance of any modifications.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">10. Contact Information</h2>
              <p className="text-neutral-700 leading-relaxed">
                For any inquiries or concerns, please contact us through our official communication channels available on the website.
              </p>
            </section>
            
            <div className="pt-4 border-t border-neutral-200">
              <p className="text-neutral-700 font-medium">
                By participating in our competition and using this website, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;