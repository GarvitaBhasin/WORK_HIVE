import React from 'react';
import { Briefcase, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Job<span className="text-violet-400">Sphere</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering talented professionals to discover opportunities and connecting forward-thinking companies with world-class talent.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Job Seekers</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/jobs" className="hover:text-white transition-colors">Search Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-white transition-colors">Browse Categories</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors">Top Tech Companies</Link></li>
              <li><Link to="/signup" className="hover:text-white transition-colors">Create Candidate Profile</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Employers</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/signup" className="hover:text-white transition-colors">Post a Job Opening</Link></li>
              <li><Link to="/admin/companies" className="hover:text-white transition-colors">Manage Company Profile</Link></li>
              <li><Link to="/admin/jobs" className="hover:text-white transition-colors">Applicant Tracking</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span></li>
              <li><span className="cursor-pointer hover:text-white transition-colors">Support & Help</span></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} JobSphere Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with care for careers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;