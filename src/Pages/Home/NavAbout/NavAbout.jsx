import React from "react";

const NavAbout = () => {
  return (
    <div className="min-h-screen bg-base-200 py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About AssetVerse</h1>
          <p className="text-xl max-w-4xl mx-auto opacity-80">
            AssetVerse is a comprehensive corporate asset management system
            designed to streamline asset tracking, maintenance, requests, and
            allocation for modern organizations—empowering teams to work smarter
            and more efficiently.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed opacity-90">
              To provide businesses of all sizes with an intuitive, secure, and
              scalable platform that eliminates the chaos of manual asset
              management. We believe every organization deserves tools that save
              time, reduce costs, and improve transparency across teams.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-6">Our Vision</h2>
            <p className="text-lg leading-relaxed opacity-90">
              A world where corporate assets are always accounted for, optimally
              utilized, and seamlessly shared—driving productivity and
              sustainability in every workplace.
            </p>
          </div>
        </div>

        {/* Features Highlights */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose AssetVerse?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl p-8">
              <div className="text-primary text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold mb-3">
                Real-Time Tracking
              </h3>
              <p>
                Monitor all company assets in one centralized dashboard with
                live updates and history logs.
              </p>
            </div>
            <div className="card bg-base-100 shadow-xl p-8">
              <div className="text-primary text-5xl mb-4">🔐</div>
              <h3 className="text-2xl font-semibold mb-3">Role-Based Access</h3>
              <p>
                Secure permissions for HR managers and employees—ensuring data
                privacy and smooth workflows.
              </p>
            </div>
            <div className="card bg-base-100 shadow-xl p-8">
              <div className="text-primary text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-semibold mb-3">
                Smart Requests & Approvals
              </h3>
              <p>
                Employees can easily request assets; HR reviews and assigns with
                full audit trails.
              </p>
            </div>
            <div className="card bg-base-100 shadow-xl p-8">
              <div className="text-primary text-5xl mb-4">♻️</div>
              <h3 className="text-2xl font-semibold mb-3">
                Sustainable Management
              </h3>
              <p>
                Extend asset lifespan through maintenance reminders and better
                utilization insights.
              </p>
            </div>
            <div className="card bg-base-100 shadow-xl p-8">
              <div className="text-primary text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-semibold mb-3">
                Responsive & Modern
              </h3>
              <p>
                Built with cutting-edge technology for seamless use on desktop
                and mobile devices.
              </p>
            </div>
            <div className="card bg-base-100 shadow-xl p-8">
              <div className="text-primary text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-semibold mb-3">Scalable Plans</h3>
              <p>
                Grow with flexible packages tailored to startups, mid-size
                companies, and enterprises.
              </p>
            </div>
          </div>
        </div>

        {/* Team Intro (Optional - you can add real photos/names later) */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-bold mb-12">
            Built by a Passionate Team
          </h2>
          <p className="text-lg max-w-3xl mx-auto opacity-90 mb-10">
            AssetVerse is developed by a dedicated team of developers,
            designers, and business experts who understand the real-world
            challenges of asset management in growing companies.
          </p>
          <div className="avatar-group -space-x-6 justify-center">
            <div className="avatar placeholder">
              <div className="w-16 bg-neutral text-neutral-content">
                <span className="text-2xl">A</span>
              </div>
            </div>
            <div className="avatar placeholder">
              <div className="w-16 bg-neutral text-neutral-content">
                <span className="text-2xl">B</span>
              </div>
            </div>
            <div className="avatar placeholder">
              <div className="w-16 bg-neutral text-neutral-content">
                <span className="text-2xl">C</span>
              </div>
            </div>
            <div className="avatar placeholder">
              <div className="w-16 bg-neutral text-neutral-content">
                <span className="text-xl">+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="card bg-primary text-primary-content shadow-2xl max-w-4xl mx-auto">
          <div className="card-body text-center py-12">
            <h2 className="text-4xl font-bold mb-4">
              Stay Updated with AssetVerse
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Subscribe to our newsletter for the latest features, tips on asset
              management, and exclusive updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered text-base-100 w-full"
                required
              />
              <button className="btn btn-neutral">Subscribe</button>
            </div>
            <p className="text-sm mt-4 opacity-80">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavAbout;
