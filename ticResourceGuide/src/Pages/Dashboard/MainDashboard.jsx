import React, { useContext, useState, useMemo, useRef, useEffect } from 'react';
import { ResourceContext } from '../../context/ResourceContext';
import TimeFilter from '../../components/TimeFilter/TimeFilter';
import ResourceCard from '../../components/ResourceCard/ResourceCard';
import { Sparkles, ArrowRight, RefreshCcw, Filter, Users, Loader2, AlertCircle } from 'lucide-react';

const categories = [
  { id: 'article', label: 'Articles', icon: '📄' },
  { id: 'video', label: 'Videos', icon: '🎥' },
  { id: 'research-paper', label: 'Research', icon: '🔬' },
];

const MainDashboard = () => {
  const { 
    resources, 
    isLoading,
    error,
    timeFilter, setTimeFilter, 
    typeFilter, setTypeFilter, 
    populationFilter, setPopulationFilter,
    clearFilters 
  } = useContext(ResourceContext);
  
  const [showResults, setShowResults] = useState(false);
  useEffect(() => {
  console.log("💎 Current State:", { 
    isLoading, 
    resourceCount: resources?.length, 
    hasError: !!error 
  });
}, [isLoading, resources, error]);
  // Scroll refs
  const categorySectionRef = useRef(null);
  const resultsSectionRef = useRef(null);

const populations = useMemo(() => {
  if (!resources || !Array.isArray(resources)) return ['All'];
  return ['All', ...new Set(resources.map(r => r?.population).filter(Boolean))];
}, [resources]);

  const filteredResources = useMemo(() => {
    return resources.filter(res => {
      const matchesTime = !timeFilter || res.time <= timeFilter;
      const matchesType = !typeFilter || res.type?.toLowerCase() === typeFilter?.toLowerCase();
      const matchesPop = populationFilter === 'All' || res.population === populationFilter;
      return matchesTime && matchesType && matchesPop;
    });
  }, [resources, timeFilter, typeFilter, populationFilter]);

  const handleTimeSelect = (val) => {
    setTimeFilter(val);
    setTimeout(() => {
      categorySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleCategorySelect = (id) => {
    setTypeFilter(id);
    setShowResults(true);
    setTimeout(() => {
      resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const resetFlow = () => {
    clearFilters();
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <Loader2 className="w-12 h-12 text-sage-500 animate-spin" />
        <p className="text-slate-500 font-medium animate-pulse">Loading resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4 p-4 text-center">
        <div className="bg-red-50 p-4 rounded-full">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Oops! Something went wrong</h2>
        <p className="text-slate-500 max-w-md">{error.message || "We couldn't connect to the database. Please try again later."}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-sage-500 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 px-4 pt-8 md:pt-16">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Step 1: Time Lens */}
        <section className="text-center space-y-8 min-h-[40vh] flex flex-col justify-center animate-fade-in-up">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-bold tracking-wide uppercase">
              <Sparkles className="w-4 h-4" />
              Mindful Resource Guide
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              A moment for <span className="text-sage-500">you.</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
              Choose your window of time. We'll curate the best trauma-informed insights for your busy schedule.
            </p>
          </div>

          <TimeFilter selected={timeFilter} onSelect={handleTimeSelect} />
        </section>

        {/* Step 2: Category Selector (Unlocked by Time) */}
        <div ref={categorySectionRef} className="scroll-mt-24">
          {timeFilter && (
            <section className="space-y-8 pt-12 border-t border-slate-200 min-h-[40vh] animate-fade-in-up">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">What are you looking for?</h2>
                <p className="text-slate-500">Select a medium that fits your current energy.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    aria-pressed={typeFilter === cat.id}
                    className={`p-6 rounded-[2rem] border-2 transition-all duration-500 text-left flex flex-col gap-4 group relative overflow-hidden focus-visible:ring-4 focus-visible:ring-sage-200 outline-none ${
                      typeFilter === cat.id 
                        ? 'border-sage-500 bg-white shadow-xl scale-[1.02]' 
                        : 'border-white bg-white hover:border-slate-100 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-colors duration-300 ${
                      typeFilter === cat.id ? 'bg-sage-100' : 'bg-slate-50'
                    }`} aria-hidden="true">
                      {cat.icon}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`font-bold text-lg ${typeFilter === cat.id ? 'text-slate-900' : 'text-slate-700'}`}>
                        {cat.label}
                      </span>
                      <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                        typeFilter === cat.id ? 'text-sage-500 translate-x-0' : 'text-slate-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                      }`} aria-hidden="true" />
                    </div>
                    {typeFilter === cat.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-sage-500" />
                    )}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Step 3: Results */}
        <div ref={resultsSectionRef} className="scroll-mt-24">
          {showResults && (
            <section className="space-y-8 pt-12 animate-fade-in-up" aria-live="polite">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-4">
                   <div className="bg-sage-50 p-3 rounded-2xl" aria-hidden="true">
                     <Filter className="w-5 h-5 text-sage-500" />
                   </div>
                   <div>
                     <h2 className="text-xl font-bold text-slate-800">
                       {filteredResources.length} Resources found
                     </h2>
                     <p className="text-sm text-slate-400 font-medium">Filtered for your {timeFilter}m window</p>
                   </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative flex-1 md:flex-none">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                    <select
                      value={populationFilter}
                      onChange={(e) => setPopulationFilter(e.target.value)}
                      aria-label="Filter by target population"
                      className="pl-10 pr-8 py-2.5 bg-slate-50 border-none rounded-xl text-sm font-bold text-slate-600 appearance-none focus:ring-2 focus:ring-sage-200 transition-all cursor-pointer outline-none"
                    >
                      {populations.map(pop => (
                        <option key={pop} value={pop}>{pop.charAt(0).toUpperCase() + pop.slice(1)}</option>
                      ))}
                    </select>
                  </div>
                  
                  <button 
                    onClick={resetFlow}
                    className="p-2.5 bg-slate-50 text-slate-400 hover:text-sage-600 hover:bg-sage-50 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-sage-200 outline-none"
                    aria-label="Reset all filters"
                    title="Reset filters"
                  >
                    <RefreshCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((res, index) => (
                  <ResourceCard key={res.url || index} resource={res} />
                ))}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100 animate-scale-in">
                   <p className="text-slate-400 font-medium">No resources match your exact criteria. Try a longer time lens.</p>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
