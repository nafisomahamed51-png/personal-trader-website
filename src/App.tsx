import React, { useState } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PerformancePage } from './pages/PerformancePage';
import { JournalPage } from './pages/JournalPage';
import { RiskPage } from './pages/RiskPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { Toast, ToastMessage } from './components/Toast';
import { PrivacyModal } from './components/PrivacyModal';
import { TradeModal } from './components/TradeModal';
import { TradeDetailModal } from './components/TradeDetailModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { CSVImportModal } from './components/CSVImportModal';
import { ProfileEditModal } from './components/ProfileEditModal';
import { AnalysisModal } from './components/AnalysisModal';

import { Trade, TraderProfile, PrivacySettings, MarketAnalysis } from './types/trade';
import { 
  loadTrades, 
  saveTrades, 
  loadProfile, 
  saveProfile, 
  loadPrivacy, 
  savePrivacy, 
  loadAnalyses, 
  saveAnalyses, 
  resetAllData 
} from './utils/storage';
import { INITIAL_TRADES } from './data/initialTrades';
import { INITIAL_PROFILE } from './data/initialProfile';
import { INITIAL_ANALYSES } from './data/initialAnalyses';

export function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<PageId>('home');

  // Core Data State
  const [trades, setTrades] = useState<Trade[]>(loadTrades);
  const [profile, setProfile] = useState<TraderProfile>(loadProfile);
  const [privacy, setPrivacy] = useState<PrivacySettings>(loadPrivacy);
  const [analyses, setAnalyses] = useState<MarketAnalysis[]>(loadAnalyses);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Modals State
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeToEdit, setTradeToEdit] = useState<Trade | null>(null);

  const [isTradeDetailModalOpen, setIsTradeDetailModalOpen] = useState(false);
  const [tradeToView, setTradeToView] = useState<Trade | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tradeToDelete, setTradeToDelete] = useState<Trade | null>(null);

  const [isCSVImportModalOpen, setIsCSVImportModalOpen] = useState(false);
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);

  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [analysisToView, setAnalysisToView] = useState<MarketAnalysis | null>(null);
  const [isAnalysisCreateMode, setIsAnalysisCreateMode] = useState(false);

  // Trade CRUD Handlers
  const handleOpenAddTrade = () => {
    setTradeToEdit(null);
    setIsTradeModalOpen(true);
  };

  const handleOpenEditTrade = (trade: Trade) => {
    setTradeToEdit(trade);
    setIsTradeModalOpen(true);
  };

  const handleSaveTrade = (trade: Trade) => {
    let updatedTrades: Trade[];
    const exists = trades.some(t => t.id === trade.id);

    if (exists) {
      updatedTrades = trades.map(t => t.id === trade.id ? trade : t);
      showToast('Trade-ka Waa La Cusboonaysiiyay', `Xogta ${trade.pair} (${trade.id}) si guul leh ayaa loo keydiyay.`, 'success');
    } else {
      updatedTrades = [trade, ...trades];
      showToast('Trade Cusub Waa La Diiwaangeliyay', `${trade.pair} (${trade.id}) waxaa lagu daray diiwaankaaga.`, 'success');
    }

    setTrades(updatedTrades);
    saveTrades(updatedTrades);
    setIsTradeModalOpen(false);
  };

  const handleOpenDeleteTrade = (trade: Trade) => {
    setTradeToDelete(trade);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDeleteTrade = (tradeId: string) => {
    const updated = trades.filter(t => t.id !== tradeId);
    setTrades(updated);
    saveTrades(updated);
    showToast('Trade-ka Waa La Tirtiray', `Trade-kii aqoonsigiisu ahaa ${tradeId} waa laga saaray diiwaanka.`, 'info');
  };

  const handleViewTrade = (trade: Trade) => {
    setTradeToView(trade);
    setIsTradeDetailModalOpen(true);
  };

  // CSV Import Handler
  const handleImportCSVTrades = (newTrades: Trade[]) => {
    const merged = [...newTrades, ...trades];
    setTrades(merged);
    saveTrades(merged);
    showToast('CSV Waa La Soo Geliyay', `${newTrades.length} trades ayaa lagu daray diiwaankaaga.`, 'success');
  };

  // Profile Save Handler
  const handleSaveProfile = (newProfile: TraderProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
    showToast('Xogta Shakhsiga Waa La Keydiyay', 'Isbeddellada profile-kaaga waa la dhaqangeliyay.', 'success');
  };

  // Privacy Save Handler
  const handleSavePrivacy = (newPrivacy: PrivacySettings) => {
    setPrivacy(newPrivacy);
    savePrivacy(newPrivacy);
    showToast(
      'Asturnaanta Waa La Cusboonaysiiyay', 
      newPrivacy.isPublicView ? 'Qaabka: Muuqaalka Dadweynaha (Public)' : 'Qaabka: Muuqaalka Trader-ka (Private Admin)', 
      'info'
    );
  };

  // Analysis Handlers
  const handleOpenAnalysisReader = (analysis: MarketAnalysis) => {
    setAnalysisToView(analysis);
    setIsAnalysisCreateMode(false);
    setIsAnalysisModalOpen(true);
  };

  const handleOpenCreateAnalysis = () => {
    setAnalysisToView(null);
    setIsAnalysisCreateMode(true);
    setIsAnalysisModalOpen(true);
  };

  const handleSaveNewAnalysis = (newAnalysis: MarketAnalysis) => {
    const updated = [newAnalysis, ...analyses];
    setAnalyses(updated);
    saveAnalyses(updated);
    showToast('Falanqayn Waa La Daabacay', `Qoraalkaaga ku saabsan ${newAnalysis.pair} si guul leh ayaa loo daabacay.`, 'success');
  };

  // Reset to demo data
  const handleResetData = () => {
    resetAllData();
    setTrades(INITIAL_TRADES);
    setProfile(INITIAL_PROFILE);
    setAnalyses(INITIAL_ANALYSES);
    showToast('Xogta Waa La Cusboonaysiiyay', 'Xogta tusaalaha xirfadeed ayaa dib loo soo celiyay.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-[#F5F7FA] flex flex-col justify-between selection:bg-gold selection:text-[#080B10]">
      
      {/* Top Sticky Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        privacy={privacy}
        onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        onOpenAddTradeModal={handleOpenAddTrade}
        profile={profile}
      />

      {/* Main Pages View Routing */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={setCurrentPage}
            trades={trades}
            profile={profile}
            privacy={privacy}
            onViewTrade={handleViewTrade}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            profile={profile}
            onOpenEditProfile={() => setIsProfileEditModalOpen(true)}
          />
        )}

        {currentPage === 'performance' && (
          <PerformancePage
            trades={trades}
            privacy={privacy}
          />
        )}

        {currentPage === 'journal' && (
          <JournalPage
            trades={trades}
            onOpenAddModal={handleOpenAddTrade}
            onOpenEditModal={handleOpenEditTrade}
            onOpenDeleteModal={handleOpenDeleteTrade}
            onOpenViewModal={handleViewTrade}
            onOpenImportModal={() => setIsCSVImportModalOpen(true)}
            onResetData={handleResetData}
            privacy={privacy}
          />
        )}

        {currentPage === 'risk' && (
          <RiskPage />
        )}

        {currentPage === 'analysis' && (
          <AnalysisPage
            analyses={analyses}
            onOpenAnalysis={handleOpenAnalysisReader}
            onOpenCreateAnalysis={handleOpenCreateAnalysis}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            profile={profile}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Unified Footer */}
      <Footer
        onNavigate={setCurrentPage}
        profile={profile}
      />

      {/* Interactive Modals */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        privacy={privacy}
        onUpdatePrivacy={handleSavePrivacy}
      />

      <TradeModal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
        onSave={handleSaveTrade}
        tradeToEdit={tradeToEdit}
      />

      <TradeDetailModal
        isOpen={isTradeDetailModalOpen}
        trade={tradeToView}
        onClose={() => setIsTradeDetailModalOpen(false)}
        onEdit={handleOpenEditTrade}
        onDelete={handleOpenDeleteTrade}
        privacy={privacy}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        trade={tradeToDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDeleteTrade}
      />

      <CSVImportModal
        isOpen={isCSVImportModalOpen}
        onClose={() => setIsCSVImportModalOpen(false)}
        onImport={handleImportCSVTrades}
      />

      <ProfileEditModal
        isOpen={isProfileEditModalOpen}
        onClose={() => setIsProfileEditModalOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

      <AnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        analysisToView={analysisToView}
        isCreateMode={isAnalysisCreateMode}
        onSaveAnalysis={handleSaveNewAnalysis}
      />

      {/* Floating Notifications */}
      <Toast
        toasts={toasts}
        onDismiss={handleDismissToast}
      />

    </div>
  );
}

export default App;
