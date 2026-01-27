
import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Globe, MapPin, Users, Target, Save, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BrandProfile: React.FC = () => {
  const { t, language } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    name: 'EcoStream',
    slogan: 'Decarbonizing the grid with AI.',
    about: 'EcoStream is a Copenhagen-based startup focused on real-time energy monitoring. Our mission is to provide businesses with the tools they need to achieve net-zero goals through data-driven insights.',
    website: 'https://ecostream.dk',
    location: 'Hovedstaden',
    industry: 'GreenTech',
    teamSize: '11-50',
    selectedValues: ['Innovation', 'Sustainability']
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleValue = (val: string) => {
    setFormData(prev => ({
      ...prev,
      selectedValues: prev.selectedValues.includes(val)
        ? prev.selectedValues.filter(v => v !== val)
        : [...prev.selectedValues, val]
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-black text-[#1A2E26] tracking-tight">{t.brand.title}</h1>
        <p className="text-[#1A2E26]/40 font-bold uppercase tracking-widest text-[10px] mt-2">{t.brand.subtitle}</p>
      </header>

      <form onSubmit={handleSave} className="bg-white p-8 md:p-12 rounded-3xl border border-[#2D5A4C]/5 shadow-sm space-y-12">
        {/* Logo Upload Section */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
            {t.brand.logo}
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-40 h-40 bg-[#F4F7F5] rounded-3xl border-2 border-dashed border-[#2D5A4C]/20 flex flex-col items-center justify-center cursor-pointer hover:border-[#2D5A4C] hover:bg-[#2D5A4C]/5 transition-all group overflow-hidden relative"
          >
            {logoPreview ? (
              <img src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <Camera size={32} className="text-[#2D5A4C]/20 group-hover:text-[#2D5A4C] transition-colors mb-2" />
                <span className="text-[10px] font-black text-[#2D5A4C]/40 group-hover:text-[#2D5A4C] uppercase tracking-widest">
                  {t.brand.upload_hint}
                </span>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
          </div>
        </div>

        {/* Basic Info Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">{t.brand.name}</label>
            <input 
              required
              type="text" 
              className="w-full px-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">{t.brand.slogan}</label>
            <input 
              required
              type="text" 
              className="w-full px-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all" 
              value={formData.slogan}
              onChange={(e) => setFormData({...formData, slogan: e.target.value})}
            />
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">{t.brand.about}</label>
          <textarea 
            required
            rows={5}
            className="w-full px-6 py-4 rounded-2xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all resize-none leading-relaxed" 
            value={formData.about}
            onChange={(e) => setFormData({...formData, about: e.target.value})}
          />
        </div>

        {/* Secondary Info Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
              <span className="flex items-center"><Globe size={12} className="mr-1" /> {t.brand.website}</span>
            </label>
            <input 
              type="url" 
              className="w-full px-5 py-4 rounded-xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all text-sm" 
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
              <span className="flex items-center"><MapPin size={12} className="mr-1" /> {t.brand.location}</span>
            </label>
            <select 
              className="w-full px-5 py-4 rounded-xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all text-sm appearance-none cursor-pointer" 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            >
              {Object.keys(t.regions).map(reg => (
                <option key={reg} value={reg}>{t.regions[reg]}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
              <span className="flex items-center"><Target size={12} className="mr-1" /> {t.brand.industry}</span>
            </label>
            <select 
              className="w-full px-5 py-4 rounded-xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all text-sm appearance-none cursor-pointer" 
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
            >
              {Object.keys(t.brand.industries).map(ind => (
                <option key={ind} value={ind}>{t.brand.industries[ind]}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">
              <span className="flex items-center"><Users size={12} className="mr-1" /> {t.brand.team_size}</span>
            </label>
            <select 
              className="w-full px-5 py-4 rounded-xl bg-[#F4F7F5] border border-transparent focus:bg-white focus:border-[#2D5A4C]/20 outline-none font-bold text-[#1A2E26] transition-all text-sm appearance-none cursor-pointer" 
              value={formData.teamSize}
              onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
            >
              {['1-10', '11-50', '51-200', '201-500', '500+'].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Company Values Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#1A2E26]/40 ml-2">{t.brand.values}</label>
          <div className="flex flex-wrap gap-3">
            {t.brand.company_values.map((val: string) => {
              const isSelected = formData.selectedValues.includes(val);
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => toggleValue(val)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all border ${
                    isSelected 
                    ? 'bg-[#2D5A4C] border-[#2D5A4C] text-white shadow-lg shadow-[#2D5A4C]/10' 
                    : 'bg-[#F4F7F5] border-transparent text-[#1A2E26]/40 hover:border-[#2D5A4C]/20 hover:text-[#2D5A4C]'
                  }`}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-8 border-t border-[#F4F7F5] flex flex-col md:flex-row items-center justify-between gap-6">
          <AnimatePresence>
            {isSaved && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center text-[#2D5A4C] font-black text-sm"
              >
                <CheckCircle2 size={18} className="mr-2" />
                {t.brand.success}
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            type="submit"
            className="w-full md:w-auto bg-[#2D5A4C] text-white px-12 py-5 rounded-2xl font-black text-lg active:scale-95 transition-all shadow-xl shadow-[#2D5A4C]/20 flex items-center justify-center space-x-3"
          >
            <Save size={20} />
            <span>{t.brand.save}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandProfile;
