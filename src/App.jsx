import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import TraceabilityModal from './components/TraceabilityModal';
import Icon from './components/Icon';
import LandingPage from './views/LandingPage';
import LoginView from './views/LoginView';
import FarmerDashboard from './views/FarmerDashboard';
import BuyerMarketplace from './views/BuyerMarketplace';
import FleetManagement from './views/FleetManagement';
import AdminCommandCenter from './views/AdminCommandCenter';

export default function App() {
  const { currentView, navigateTo } = useApp();

  const isWorkspace = ['farmer', 'buyer', 'fleet', 'admin'].includes(currentView);

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface flex flex-col overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar />

      {/* Global Traceability Modal */}
      <TraceabilityModal />

      {/* Main Layout Area */}
      <div className="flex-1 flex w-full">
        {/* Content Container */}
        <main
          className={`flex-1 w-full transition-all overflow-x-hidden ${
            isWorkspace
              ? 'max-w-7xl mx-auto pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 pb-20 md:pb-12'
              : ''
          }`}
        >
          {currentView === 'landing' && <LandingPage />}
          {currentView === 'login' && <LoginView />}
          {currentView === 'farmer' && <FarmerDashboard />}
          {currentView === 'buyer' && <BuyerMarketplace />}
          {currentView === 'fleet' && <FleetManagement />}
          {currentView === 'admin' && <AdminCommandCenter />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      {isWorkspace && (
        <div className="fixed bottom-0 left-0 right-0 bg-surface-container-highest/95 border-t border-outline-variant/30 md:hidden z-40 flex items-center justify-around py-1.5 px-2 shadow-lg backdrop-blur-xl">
          <button
            onClick={() => navigateTo('farmer', 'farmer')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
              currentView === 'farmer' ? 'text-primary font-bold bg-primary-container/20' : 'text-on-surface-variant'
            }`}
          >
            <Icon name="agriculture" className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Farmer</span>
          </button>
          <button
            onClick={() => navigateTo('buyer', 'buyer')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
              currentView === 'buyer' ? 'text-primary font-bold bg-primary-container/20' : 'text-on-surface-variant'
            }`}
          >
            <Icon name="storefront" className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Buyer</span>
          </button>
          <button
            onClick={() => navigateTo('fleet', 'transport')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
              currentView === 'fleet' ? 'text-primary font-bold bg-primary-container/20' : 'text-on-surface-variant'
            }`}
          >
            <Icon name="local_shipping" className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Fleet</span>
          </button>
          <button
            onClick={() => navigateTo('landing')}
            className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
              currentView === 'landing' ? 'text-primary font-bold bg-primary-container/20' : 'text-on-surface-variant'
            }`}
          >
            <Icon name="home" className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Home</span>
          </button>
        </div>
      )}
    </div>
  );
}
