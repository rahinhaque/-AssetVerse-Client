import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-base-200 py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl max-w-4xl mx-auto opacity-80">
            We're here to help! Whether you have questions about AssetVerse,
            need support, or want to discuss custom solutions for your
            organization—reach out anytime.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="card bg-base-100 shadow-xl text-center p-8">
            <div className="text-primary text-6xl mb-4">📧</div>
            <h3 className="text-2xl font-semibold mb-3">Email Us</h3>
            <p className="mb-4">For general inquiries and support</p>
            <a
              href="mailto:support@assetverse.com"
              className="link link-primary"
            >
              support@assetverse.com
            </a>
          </div>

          <div className="card bg-base-100 shadow-xl text-center p-8">
            <div className="text-primary text-6xl mb-4">📞</div>
            <h3 className="text-2xl font-semibold mb-3">Call Us</h3>
            <p className="mb-4">Monday–Friday, 9AM–6PM EST</p>
            <a href="tel:+15551234567" className="link link-primary">
              (555) 123-4567
            </a>
          </div>

          <div className="card bg-base-100 shadow-xl text-center p-8">
            <div className="text-primary text-6xl mb-4">🌐</div>
            <h3 className="text-2xl font-semibold mb-3">Live Chat</h3>
            <p className="mb-4">Instant support from our team</p>
            <button className="btn btn-primary btn-sm">Start Chat</button>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Send Us a Message
          </h2>
          <div className="card bg-base-100 shadow-2xl">
            <div className="card-body">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Your Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">Subject</span>
                  </label>
                  <select className="select select-bordered w-full">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Pricing & Plans</option>
                    <option>Feature Request</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">Message</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full h-40"
                    placeholder="Tell us how we can help..."
                    required
                  ></textarea>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-wide">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Teaser */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
            Before reaching out, check if your question is already answered in
            our FAQ section.
          </p>
          <a href="/faqs" className="btn btn-outline btn-primary">
            View FAQs
          </a>
        </div>

        {/* Map Placeholder (Optional - replace with real embed later) */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Location</h2>
          <div className="card bg-base-100 shadow-xl overflow-hidden">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center text-gray-500">
              <p className="text-2xl">Google Maps Embed Here</p>
              {/* Example real embed (uncomment when ready): */}
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe> */}
            </div>
            <div className="card-body text-center">
              <p className="font-semibold">AssetVerse HQ</p>
              <p>
                123 Business Avenue, Suite 500
                <br />
                New York, NY 10001
                <br />
                United States
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
