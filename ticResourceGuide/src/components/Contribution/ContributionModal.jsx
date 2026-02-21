import React, { useState } from 'react';
import { X, Send, Heart, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import Button from '../Button/Button';

const ContributionModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    population: 'general',
    type: 'article',
    time: 5,
    why_helpful: '',
    full_name_verification: '' // Honeypot field
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.full_name_verification) {
      onClose();
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase
      .from('proposed_resources')
      .insert([{
          title: formData.title,
          url: formData.url,
          population: formData.population,
          type: formData.type,
          time: parseInt(formData.time),
          why_helpful: formData.why_helpful
      }]);

    setIsSubmitting(false);
    if (error) {
      alert("Submission error: " + error.message);
    } else {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({ title: '', url: '', population: 'general', type: 'article', time: 5, why_helpful: '', full_name_verification: '' });
      }, 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in"
      />

      <div
        className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 p-8 md:p-10 animate-scale-in"
      >
        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto text-sage-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Thanks for contributing!</h2>
            <p className="text-slate-500 font-medium max-w-xs mx-auto">
              Your resource has been submitted for review. Together we build a safer space.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-50 text-sage-600 rounded-full text-xs font-bold tracking-wider uppercase">
                  <Heart className="w-3 h-3 fill-current" />
                  Contribute
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Propose Resource</h2>
                <p className="text-slate-500 text-sm font-medium">Help other professionals with valuable content.</p>
              </div>
              <button onClick={onClose} className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contribution Form">
              <input
                type="text"
                name="full_name_verification"
                aria-label="Verification Field"
                className="opacity-0 absolute -z-10"
                tabIndex="-1"
                autoComplete="off"
                value={formData.full_name_verification}
                onChange={(e) => setFormData({...formData, full_name_verification: e.target.value})}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Title</label>
                  <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none transition-all text-sm font-medium"
                    placeholder="Resource name" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">URL</label>
                  <input required type="url" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none transition-all text-sm font-medium"
                    placeholder="https://..." value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Type</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 appearance-none outline-none"
                    value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                    <option value="article">Article</option>
                    <option value="video">Video</option>
                    <option value="research-paper">Research</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Population</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 appearance-none outline-none"
                    value={formData.population} onChange={(e) => setFormData({...formData, population: e.target.value})}>
                    <option value="general">General</option>
                    <option value="youth">Youth</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="families">Families</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Minutes</label>
                  <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-sm font-medium"
                    value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Why is this helpful?</label>
                <textarea required className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl outline-none transition-all text-sm font-medium h-24 resize-none"
                  placeholder="Briefly describe why you recommend this resource..." value={formData.why_helpful} onChange={(e) => setFormData({...formData, why_helpful: e.target.value})} />
              </div>

              <Button type="submit" className="w-full py-4 text-base flex items-center gap-2 justify-center" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />Sending...</> : <><Send className="w-5 h-5" />Submit Proposal</>}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContributionModal;
