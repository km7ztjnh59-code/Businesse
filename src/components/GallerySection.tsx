import React, { useState } from 'react';
import { Sparkles, Camera, X, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/bakeryData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters = ['all', 'Custom Cakes', 'Signature Cakes', 'Brownies', 'Bento Cakes', 'Cupcakes'];

  const filteredGallery = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3ECE2] border border-[#EADBCB] text-[#C86D51] text-xs font-bold uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            Visual Diary
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#231714] tracking-tight mb-4">
            Fresh from the Kitchen Gallery
          </h2>
          <p className="text-base sm:text-lg text-[#5C4A3E]">
            A peek at recent bespoke birthday cakes, rustic celebration layers, and sweet delivery boxes.
          </p>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide capitalize transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#3E2723] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#F3ECE2] text-[#5C4A3E] hover:bg-[#EADBCB]'
              }`}
            >
              {filter === 'all' ? 'All Creations' : filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => setSelectedItem(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#F3ECE2] border border-[#EADBCB] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#EADBCB] font-semibold">
                  {item.category}
                </span>
                <h4 className="font-serif text-lg font-bold mt-0.5">{item.title}</h4>
                <p className="text-xs text-white/90 line-clamp-2 mt-1">{item.description}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#EADBCB]">
                  <ZoomIn className="w-4 h-4" /> Click to expand
                </div>
              </div>

              {/* Mobile permanent caption bar */}
              <div className="p-3 bg-[#FAF7F2] border-t border-[#EADBCB] flex items-center justify-between sm:hidden">
                <div>
                  <h4 className="font-serif text-sm font-bold text-[#231714]">{item.title}</h4>
                  <p className="text-[10px] text-[#7D6658]">{item.category}</p>
                </div>
                <ZoomIn className="w-4 h-4 text-[#7D6658]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#EADBCB]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="lightbox-close-btn"
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
              aria-label="Close image modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] bg-black">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C86D51]">
                    {selectedItem.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#231714] mt-0.5">
                    {selectedItem.title}
                  </h3>
                </div>
                <span className="font-script text-2xl text-[#3E2723]">
                  Jerryyss Made
                </span>
              </div>
              <p className="text-sm text-[#5C4A3E] mt-3 leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
