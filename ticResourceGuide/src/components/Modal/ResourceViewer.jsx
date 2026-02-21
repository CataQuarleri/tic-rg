import React from 'react';
import { X, ExternalLink, Maximize2, Info } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

const ResourceViewer = ({ resource, isOpen, onClose }) => {
  const containerRef = useFocusTrap(isOpen);

  if (!resource || !isOpen) return null;

  const isVideo = resource.type.toLowerCase() === 'video';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal Content */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Previewing: ${resource.title}`}
        className="relative bg-white w-full max-w-6xl h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-scale-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-4 truncate">
            <div className="bg-sage-100 p-2 rounded-xl shrink-0">
              <Maximize2 className="w-5 h-5 text-sage-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 truncate">
              {resource.title}
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-sage-600 transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">New Tab</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-slate-50 relative group">
          {isVideo ? (
            <iframe
              src={resource.url}
              className="w-full h-full border-none"
              title={resource.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col">
              <div className="bg-amber-50 px-8 py-2 flex items-center gap-3 text-amber-700 text-xs font-medium border-b border-amber-100">
                <Info className="w-4 h-4" />
                <span>Note: Some resources may not load here due to security settings. If you don't see the content, please use the "New Tab" button.</span>
              </div>
              <iframe
                src={resource.url}
                className="w-full h-full border-none bg-white"
                title={resource.title}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceViewer;
