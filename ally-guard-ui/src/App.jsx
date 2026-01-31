import React, { useState } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import AddIssueModal from './components/AddIssueModal';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronRight,
  Trash2,
} from 'lucide-react';

// This is the dashboard code
function Dashboard({ user, signOut }) {
  const [issues, setIssues] = useState([
    { id: 1, url: '/login-page', criteria: '1.1.1 Non-text Content', severity: 'Critical', score: 9.2 },
    { id: 2, url: '/nav-menu', criteria: '2.4.7 Focus Visible', severity: 'Major', score: 7.5 },
    { id: 3, url: '/footer', criteria: '4.1.2 Name, Role, Value', severity: 'Minor', score: 3.1 },
  ]);

  // ADDED: State for both modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const totalRiskScore = issues.reduce((sum, issue) => sum + parseFloat(issue.score), 0).toFixed(1);

  const getRiskColor = (score) => {
    if (score > 20) return 'text-red-600';
    if (score > 10) return 'text-yellow-600';
    return 'text-green-600';
  };

  const deleteIssue = (id) => {
    setIssues(issues.filter(issue => issue.id !== id));
  };

  return (
    <div className="flex h-screen bg-gray-50 text-slate-900 w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 font-bold text-2xl flex items-center gap-2">
          <ShieldAlert className="text-blue-400" /> A11yGuard
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 text-left">
          <button className="flex items-center gap-3 w-full p-3 bg-blue-600 rounded-lg"><LayoutDashboard size={20}/> Dashboard</button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-slate-800 rounded-lg text-gray-400"><FileText size={20}/> Reports</button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-slate-800 rounded-lg text-gray-400"><Settings size={20}/> Settings</button>
        </nav>
        <button onClick={signOut} className="p-6 flex items-center gap-3 text-gray-400 hover:text-white border-t border-slate-800">
          <LogOut size={20}/> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.username}</h1>
            <p className="text-gray-500">Here is your current compliance risk overview.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 min-w-[150px]">
            <span className="text-sm text-gray-500 uppercase font-bold tracking-wider">Overall Risk Score</span>
            <div className={`text-3xl font-black ${getRiskColor(totalRiskScore)}`}>
              {totalRiskScore}
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm font-medium">Critical Barriers</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm font-medium">Pending Fixes</h3>
            <p className="text-3xl font-bold">28</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium">Resolved (Last 30d)</h3>
            <p className="text-3xl font-bold">104</p>
          </div>
        </div>

        {/* Issues Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-lg text-slate-800">Active Remediation Queue</h2>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition shadow-md"
            >
              + New Audit Issue
            </button>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
              <tr>
                <th className="p-4 font-medium">Target URL</th>
                <th className="p-4 font-medium">WCAG Criteria</th>
                <th className="p-4 font-medium">Severity</th>
                <th className="p-4 font-medium text-center">Risk</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {issues.map(issue => (
                <tr key={issue.id} className="hover:bg-blue-50/50 transition-colors duration-200 group">
                  <td className="p-4 font-mono text-xs text-blue-600">{issue.url}</td>
                  <td className="p-4 text-sm font-medium">{issue.criteria}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                      issue.severity === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {issue.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold text-slate-900">{issue.score}</td>
                  <td className="p-4 text-right flex items-center justify-end gap-4">
                    <button 
                      onClick={() => setSelectedIssue(issue)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 transition-transform hover:translate-x-1"
                    >
                      View AI Fix <ChevronRight size={14}/>
                    </button>
                    <button 
                      onClick={() => deleteIssue(issue.id)}
                      className="text-gray-400 hover:text-red-600 transition"
                      title="Delete Issue"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOVED: Modal must be inside the Dashboard component's return */}
        <AddIssueModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={(newIssue) => setIssues([newIssue, ...issues])} 
        />
      </main>
    </div>
  );
}

export default function App() {
  const mockUser = { username: "Shaun" }; 
  const isLoggedIn = true;

  return (
    <div className={`min-h-screen bg-gray-100 w-full ${!isLoggedIn ? 'flex items-center justify-center' : ''}`}>
      {isLoggedIn ? (
        <Dashboard user={mockUser} signOut={() => alert("Sign out clicked")} />
      ) : (
        <Authenticator>
          {({ signOut, user }) => (
            <Dashboard user={user} signOut={signOut} />
          )}
        </Authenticator>
      )}
    </div>
  );
}