import React, { useState } from 'react';
import { X, ShieldPlus } from 'lucide-react';

export default function AddIssueModal({ isOpen, onClose, onAdd }) {
  // Local state to handle the form before we "submit" it to the dashboard
  const [formData, setFormData] = useState({
    url: '',
    criteria: '1.1.1 Non-text Content',
    severity: 'Major'
  });

  // If the modal isn't open, we return null so nothing renders
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate a mock score based on severity to keep the Risk Score dynamic
    const scoreMap = { 'Critical': 9.5, 'Major': 7.0, 'Minor': 3.0 };
    
    onAdd({
      ...formData,
      id: Date.now(), // Generate a unique ID
      score: scoreMap[formData.severity]
    });

    // Reset the form fields and close the modal
    setFormData({ url: '', criteria: '1.1.1 Non-text Content', severity: 'Major' });
    onClose();
  };

  return (
    /* The Background Overlay (Fade In + Blur) */
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      
      {/* The Modal Box (Scale and Slide Up animation) */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in slide-in-from-bottom-4 duration-300 ease-out">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-600 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldPlus size={24}/> Log New Barrier
          </h2>
          <button 
            onClick={onClose} 
            className="hover:bg-blue-700 p-1 rounded-full transition-transform active:scale-90"
          >
            <X size={20}/>
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Target URL / Component</label>
            <input 
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
              placeholder="e.g. /navigation-menu or #hero-section"
              value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">WCAG Success Criteria</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-white"
              value={formData.criteria}
              onChange={(e) => setFormData({...formData, criteria: e.target.value})}
            >
              <option>1.1.1 Non-text Content</option>
              <option>2.1.1 Keyboard Accessible</option>
              <option>2.4.7 Focus Visible</option>
              <option>4.1.2 Name, Role, Value</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Severity Level</label>
            <div className="grid grid-cols-3 gap-2">
              {['Minor', 'Major', 'Critical'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({...formData, severity: level})}
                  className={`py-2 rounded-md text-xs font-bold transition border ${
                    formData.severity === level 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-gray-500 border-gray-200 hover:border-blue-400'
                  }`}
                >
                  {level.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg shadow-lg hover:bg-blue-700 hover:-translate-y-1 active:scale-95 transition-all duration-200 mt-4"
          >
            Add to Queue
          </button>
        </form>
      </div>
    </div>
  );
}