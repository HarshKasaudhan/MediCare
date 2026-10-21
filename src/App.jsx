import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PricingEngine from './components/PricingEngine';
import CategoryCards from './components/CategoryCards';
import ProductCards from './components/ProductCards';
import KendraMapSection from './components/KendraMapSection';
import MedicalSafetyDisclaimer from './components/MedicalSafetyDisclaimer';
import PrescriptionModal from './components/PrescriptionModal';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';

import { MEDICINES_DATA } from './data/medicinesData';
import { findMatchingMedicine, searchMedicines } from './utils/searchEngine';
import { LUCKNOW_KENDRAS } from './data/kendrasData';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    id: 'hazratganj',
    name: 'Hazratganj, Lucknow',
    pincode: '226001',
    landmark: 'Near SPM Civil Hospital'
  });

  const [selectedMedicine, setSelectedMedicine] = useState(MEDICINES_DATA[0]); // Pan 40
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([
    {
      id: 'pan-40-jan-aushadhi',
      name: 'Pantoprazole Gastro-resistant Tablets IP 40mg',
      variant: 'PMBJP Generic',
      brandEquivalent: 'Pan 40',
      mrp: 14.5,
      quantity: 1,
      savings: 150.5
    }
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Trigger floating feedback toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Search handler using typo-tolerant fuzzy matching from searchEngine.js
  const handleSearch = (query) => {
    const matched = findMatchingMedicine(query);
    if (matched) {
      setSelectedMedicine(matched);
      showToast(`💡 Found match: ${matched.brandName || matched.brand_name} (${matched.savingPercentage}% Generic Saving)`);
      const pricingEl = document.getElementById('pricing-engine');
      if (pricingEl) {
        pricingEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const results = searchMedicines(query);
      if (results && results.length > 0) {
        setSelectedMedicine(results[0]);
        showToast(`💡 Suggested match: ${results[0].brandName || results[0].brand_name} (${results[0].savingPercentage}% Generic Saving)`);
        const pricingEl = document.getElementById('pricing-engine');
        if (pricingEl) {
          pricingEl.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        showToast(`No exact match for "${query}". Showing available generic equivalents.`);
      }
    }
  };

  const handleSelectMedicineById = (id) => {
    const found = MEDICINES_DATA.find(m => m.id === id);
    if (found) {
      setSelectedMedicine(found);
      showToast(`Selected: ${found.brandName} (PMBJP Code: ${found.janAushadhi.code})`);
      const pricingEl = document.getElementById('pricing-engine');
      if (pricingEl) {
        pricingEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Cart operations
  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    showToast(`Added ${item.name} to order!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNavigateSection = (sectionId) => {
    const map = {
      pricing: 'pricing-engine',
      categories: 'healthcare-categories',
      kendras: 'lucknow-kendras'
    };
    const target = document.getElementById(map[sectionId] || sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#E6F4F1] via-[#D5EFE3]/50 to-[#E6F4F1] text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#113222] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#34D399]/40 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header / Navbar */}
      <Navbar
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        cartItems={cartItems}
        setIsCartOpen={setIsCartOpen}
        setIsAuthOpen={setIsAuthOpen}
        setIsPrescriptionModalOpen={setIsPrescriptionModalOpen}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Split Layout Hero Section with Musemind Theme */}
        <HeroSection
          onSearch={handleSearch}
          onSelectMedicineById={handleSelectMedicineById}
          onOpenPrescriptionModal={() => setIsPrescriptionModalOpen(true)}
          selectedMedicine={selectedMedicine}
        />

        {/* Zero-Hallucination Tiered Pricing Engine */}
        <PricingEngine
          selectedMedicine={selectedMedicine}
          onSelectMedicine={setSelectedMedicine}
          onAddToCart={handleAddToCart}
          onLocateKendra={(med) => handleNavigateSection('kendras')}
          allMedicines={MEDICINES_DATA}
          onSearchInput={handleSearch}
        />

        {/* Pastel Category Cards Section (Maternal, Headache, Cold, etc.) */}
        <CategoryCards
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (cat) {
              const prodEl = document.getElementById('products-section');
              if (prodEl) prodEl.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Product Recommendations Grid */}
        <div id="products-section">
          <ProductCards
            medicines={MEDICINES_DATA}
            selectedCategory={selectedCategory}
            onSelectMedicine={setSelectedMedicine}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Verified Lucknow Jan Aushadhi Kendra Map Section */}
        <KendraMapSection
          selectedLocation={selectedLocation}
        />

        {/* Official Statutory Medical Safety Disclaimer */}
        <MedicalSafetyDisclaimer />

      </main>

      {/* Footer */}
      <Footer onNavigateSection={handleNavigateSection} />

      {/* Modals & Drawers */}
      <PrescriptionModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        onSelectMedicine={(med) => {
          setSelectedMedicine(med);
          showToast(`Extracted: ${med.brandName} → Jan Aushadhi ${med.savingPercentage}% cheaper`);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        selectedLocation={selectedLocation}
        onClearCart={handleClearCart}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

    </div>
  );
}
