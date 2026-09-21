import React, { useState, useEffect } from 'react';
import { PageType, CustomizedOrderItem, CustomerDetails } from './types';
import { StepNavbar } from './components/StepNavbar';
import { HomePage } from './components/pages/HomePage';
import { MenuProductsPage } from './components/pages/MenuProductsPage';
import { OrderSummaryPage } from './components/pages/OrderSummaryPage';
import { PaymentPage } from './components/pages/PaymentPage';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Customer's customized order tray
  const [orderItems, setOrderItems] = useState<CustomizedOrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('jerryyss_bakery_order');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Tomorrow as default date string
  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  // Customer delivery details
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>(() => ({
    name: '',
    phone: '',
    email: '',
    deliveryDate: getTomorrowStr(),
    deliveryTimeSlot: 'Afternoon (1:00 PM – 5:00 PM)',
    deliveryType: 'delivery',
    address: '',
    specialInstructions: '',
  }));

  // Sync with local storage
  useEffect(() => {
    try {
      localStorage.setItem('jerryyss_bakery_order', JSON.stringify(orderItems));
    } catch (e) {
      console.error('Could not save order items to storage', e);
    }
  }, [orderItems]);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Add customized item
  const handleAddCustomizedItem = (newItem: CustomizedOrderItem) => {
    setOrderItems((prev) => [...prev, newItem]);
  };

  // Update quantity in order summary
  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setOrderItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0
              ? { ...item, quantity: nextQty, totalPrice: item.unitPrice * nextQty }
              : null;
          }
          return item;
        })
        .filter(Boolean) as CustomizedOrderItem[]
    );
  };

  // Remove item
  const handleRemoveItem = (itemId: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Restart order
  const handleRestartOrder = () => {
    setOrderItems([]);
    localStorage.removeItem('jerryyss_bakery_order');
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#231714] flex flex-col selection:bg-[#EADBCB] selection:text-[#3E2723]">
      {/* 4-Page Sticky Step Navigation Bar */}
      <StepNavbar
        currentPage={currentPage}
        orderItems={orderItems}
        onNavigate={(page) => setCurrentPage(page)}
      />

      {/* Main Dynamic 4-Page Body */}
      <main className="flex-grow">
        {/* PAGE 1: Home Page (Tells about business & has ”check menu and order now ” button) */}
        {currentPage === 'home' && (
          <HomePage onProceedToMenu={() => setCurrentPage('menu')} />
        )}

        {/* PAGE 2: Products & Customization Page (Weight choice & dynamic price change) */}
        {currentPage === 'menu' && (
          <MenuProductsPage
            orderItems={orderItems}
            onAddCustomizedItem={handleAddCustomizedItem}
            onProceedToSummary={() => setCurrentPage('summary')}
            onBackToHome={() => setCurrentPage('home')}
          />
        )}

        {/* PAGE 3: Order Summary & Delivery Details (Order recap & final price in INR) */}
        {currentPage === 'summary' && (
          <OrderSummaryPage
            orderItems={orderItems}
            customerDetails={customerDetails}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onUpdateCustomerDetails={setCustomerDetails}
            onProceedToPayment={() => setCurrentPage('payment')}
            onBackToMenu={() => setCurrentPage('menu')}
          />
        )}

        {/* PAGE 4: Payment & Thank You Confirmation */}
        {currentPage === 'payment' && (
          <PaymentPage
            orderItems={orderItems}
            customerDetails={customerDetails}
            onBackToSummary={() => setCurrentPage('summary')}
            onRestartOrder={handleRestartOrder}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(section) => {
        if (section === 'menu' || section === 'custom-cakes') {
          setCurrentPage('menu');
        } else if (section === 'team') {
          setCurrentPage('home');
          setTimeout(() => {
            const teamEl = document.getElementById('meet-the-team');
            if (teamEl) {
              teamEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        } else {
          setCurrentPage('home');
        }
      }} />

      {/* Persistent Floating WhatsApp widget */}
      <FloatingWhatsApp />
    </div>
  );
}
