import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useResources } from '../../hooks/useResources';
import { 
  CheckCircle2, XCircle, ExternalLink, Trash2, 
  Settings, LayoutDashboard, PlusCircle, Inbox, 
  ExternalLink as LinkIcon, Loader2 
} from 'lucide-react';
import Button from '../../components/Button/Button';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('review'); // 'review', 'add', 'manage'
  const [submissions, setSubmissions] = useState([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);
  const { resources, refetch: refetchResources } = useResources();

  const fetchSubmissions = async () => {
    setIsLoadingSubmissions(true);
    const { data, error } = await supabase
      .from('proposed_resources')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    
    if (data) setSubmissions(data);
    setIsLoadingSubmissions(false);
  };

  useEffect(() => {
    if (activeTab === 'review') fetchSubmissions();
  }, [activeTab]);

  const handleApprove = async (id) => {
    const { error } = await supabase.rpc('approve_resource', { submission_id: id });
    if (error) {
      alert("Error approving: " + error.message);
    } else {
      setSubmissions(submissions.filter(s => s.id !== id));
      refetchResources();
    }
  };

  const handleReject = async (id) => {
    const { error } = await supabase
      .from('proposed_resources')
      .update({ status: 'rejected' })
      .eq('id', id);
    
    if (!error) setSubmissions(submissions.filter(s => s.id !== id));
  };

  const handleDeleteResource = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource from the main database?')) {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);
      
      if (!error) refetchResources();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto animate-fade-in-up">
        <header className="flex flex-col gap-8 mb-12">
          <div className="space-y-1 text-center md:text-left">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-dusk-50 text-dusk-600 rounded-full text-xs font-black tracking-wider uppercase">
               <Settings className="w-3 h-3" />
               Administration
             </div>
             <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Control Panel</h1>
             <p className="text-slate-500 font-medium text-sm md:text-base">Manage resource quality and safety.</p>
          </div>

          <nav className="flex overflow-x-auto no-scrollbar bg-white p-1.5 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm md:self-start">
            <div className="flex min-w-full md:min-w-0">
              {[
                { id: 'review', label: 'Review', icon: Inbox },
                { id: 'add', label: 'New', icon: PlusCircle },
                { id: 'manage', label: 'Manage', icon: LayoutDashboard }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 flex-1 md:flex-none px-4 md:px-6 py-2.5 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-slate-900 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </header>

        <main>
          {activeTab === 'review' && (
            <div className="space-y-6">
              {isLoadingSubmissions ? (
                <div className="py-20 flex justify-center"><Loader2 className="w-10 h-10 animate-spin text-sage-500" /></div>
              ) : submissions.length === 0 ? (
                <div className="bg-white rounded-[2rem] border-2 border-dashed border-slate-100 py-20 text-center animate-scale-in">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                    <Inbox className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400">No pending submissions</h3>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                   {submissions.map((sub) => (
                     <div 
                        key={sub.id} 
                        className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-sm space-y-4 md:space-y-6 flex flex-col animate-scale-in"
                     >
                       <div className="flex justify-between items-start">
                         <div className="flex flex-wrap gap-2">
                           <span className="bg-sage-50 text-sage-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">{sub.type}</span>
                           <span className="bg-dusk-50 text-dusk-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">{sub.population}</span>
                           <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">{sub.time}m</span>
                         </div>
                         <a href={sub.url} target="_blank" rel="noopener" className="p-2 bg-slate-50 rounded-xl hover:bg-sage-50 hover:text-sage-600 transition-colors shrink-0">
                           <ExternalLink className="w-5 h-5" />
                         </a>
                       </div>
                       
                       <div>
                         <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 leading-tight">{sub.title}</h3>
                         <p className="text-slate-500 text-sm bg-slate-50 p-3 md:p-4 rounded-xl md:rounded-2xl italic">
                           " {sub.why_helpful} "
                         </p>
                       </div>

                       <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-slate-50">
                         <button 
                            onClick={() => handleApprove(sub.id)}
                            className="flex-1 bg-sage-500 text-white py-3 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-sage-600 transition-all active:scale-95"
                         >
                           <CheckCircle2 className="w-5 h-5" />
                           Approve
                         </button>
                         <button 
                            onClick={() => handleReject(sub.id)}
                            className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-all active:scale-95"
                         >
                           <XCircle className="w-5 h-5" />
                           Reject
                         </button>
                       </div>
                     </div>
                   ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'add' && <AdminAddForm onSuccess={() => setActiveTab('manage')} />}

          {activeTab === 'manage' && (
             <div className="space-y-4">
               {/* Mobile List View */}
               <div className="grid grid-cols-1 gap-4 md:hidden">
                 {resources?.map((res) => (
                   <div key={res.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 animate-scale-in">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-bold text-slate-900 leading-tight">{res.title}</h3>
                          <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest flex items-center gap-2">
                             {res.type} • {res.time}m
                          </div>
                        </div>
                        <span className="bg-dusk-50 text-dusk-600 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                           {res.population}
                         </span>
                      </div>
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
                        <a href={res.url} target="_blank" rel="noopener" className="flex-1 bg-slate-50 text-slate-600 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                           <LinkIcon className="w-4 h-4" />
                           Visit
                        </a>
                        <button 
                          onClick={() => handleDeleteResource(res.id)}
                          className="flex-1 bg-red-50 text-red-600 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                        >
                           <Trash2 className="w-4 h-4" />
                           Delete
                        </button>
                      </div>
                   </div>
                 ))}
               </div>

               {/* Desktop Table View */}
               <div className="hidden md:block bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden animate-scale-in">
                 <table className="w-full text-left">
                   <thead className="bg-slate-50 border-b border-slate-100">
                     <tr>
                       <th className="px-8 py-5 text-sm font-black text-slate-500 uppercase tracking-wider">Resource</th>
                       <th className="px-8 py-5 text-sm font-black text-slate-500 uppercase tracking-wider">Population</th>
                       <th className="px-8 py-5 text-sm font-black text-slate-500 uppercase tracking-wider">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                     {resources?.map((res) => (
                       <tr key={res.id} className="hover:bg-slate-50/50 transition-colors">
                         <td className="px-8 py-6">
                           <div className="font-bold text-slate-900">{res.title}</div>
                           <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                              <span className="uppercase">{res.type}</span> • {res.time}m
                           </div>
                         </td>
                         <td className="px-8 py-6">
                           <span className="bg-dusk-50 text-dusk-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                             {res.population}
                           </span>
                         </td>
                         <td className="px-8 py-6 text-right">
                           <div className="flex items-center gap-2">
                             <a href={res.url} target="_blank" rel="noopener" className="p-2 text-slate-300 hover:text-dusk-500 transition-colors">
                               <LinkIcon className="w-5 h-5" />
                             </a>
                             <button 
                              onClick={() => handleDeleteResource(res.id)}
                              className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                             >
                               <Trash2 className="w-5 h-5" />
                             </button>
                           </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

const AdminAddForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ title: '', url: '', population: 'general', type: 'article', time: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refetch } = useResources();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from('resources').insert([formData]);
    setIsSubmitting(false);
    if (!error) {
      refetch();
      onSuccess();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 animate-scale-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-sage-500 p-3 rounded-2xl text-white">
          <PlusCircle className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">New Resource</h2>
          <p className="text-slate-500 font-medium text-sm">Upload verified content directly.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">Title</label>
          <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-sage-200" 
            value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">URL</label>
          <input required type="url" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-sage-200" 
            value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Type</label>
            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-sage-200"
              value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="article">Article</option>
              <option value="video">Video</option>
              <option value="research-paper">Research</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Population</label>
            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-sage-200"
              value={formData.population} onChange={e => setFormData({...formData, population: e.target.value})}>
              <option value="general">General</option>
              <option value="youth">Youth</option>
              <option value="healthcare">Healthcare</option>
              <option value="families">Families</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Time (m)</label>
            <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-sage-200" 
              value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Add to Database'}
        </Button>
      </form>
    </div>
  );
};

export default AdminDashboard;
