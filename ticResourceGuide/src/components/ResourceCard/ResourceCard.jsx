import React, { useState } from 'react';
import { Bookmark, Clock, ExternalLink, PlayCircle, BookOpen, Maximize2 } from 'lucide-react';
import ResourceViewer from '../Modal/ResourceViewer';

const ResourceCard = ({ resource }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'video': return <PlayCircle className="w-4 h-4" />;
      case 'article': return <BookOpen className="w-4 h-4" />;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <>
      <div
        className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4 relative group animate-scale-in"
      >
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <span className="bg-sage-50 text-sage-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 uppercase tracking-wider">
              {getIcon(resource.type)}
              {resource.type}
            </span>
            <span className="bg-dusk-50 text-dusk-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {resource.time} min
            </span>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsSaved(!isSaved);
            }}
            className={`p-2 rounded-full transition-colors ${
              isSaved ? 'text-sage-500 bg-sage-50' : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h3 
            onClick={() => setIsViewerOpen(true)}
            className="text-xl font-bold text-slate-800 leading-tight group-hover:text-sage-600 transition-colors cursor-pointer"
          >
            {resource.title}
          </h3>
          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
            {resource.description || "Discover evidence-based strategies to support trauma-informed practices in healthcare settings."}
          </p>
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between">
          <button 
            onClick={() => setIsViewerOpen(true)}
            className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-sage-600 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-sage-50 transition-colors">
              <Maximize2 className="w-4 h-4" />
            </div>
            Preview
          </button>
          
          <div className="flex gap-2">
            <a 
              href={resource.url || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-900 text-white p-2 rounded-xl hover:bg-sage-500 transition-all shadow-sm active:scale-95"
              title="Open in new tab"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <ResourceViewer 
        resource={resource}
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </>
  );
};

export default ResourceCard;
