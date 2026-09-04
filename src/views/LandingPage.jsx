import React from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';

export default function LandingPage() {
  const { navigateTo, setInspectingBatch, produceList } = useApp();

  return (
    <div className="flex flex-col w-full bg-surface overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-16">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAKHgwx0DuNJsJkY2RILkTWYqwm0jl2o34xFmRyZkTTNJpcDw3jXMvcDwE9K_NPHZhfN95fcGfeOuIb4Yvl69vPJsckFovKe6x6s05zeeR_w2bdCkuKMh3ABi4V0oSAknytEQrHsw6-YMRap2S-0rchYbMfH_WD6EE6Tb-Sv04jAJZWd03JK07ySvs22YXMO81Cbpf0QoB76ppR-Kctq2s2A4LkHHFuuXM05IK5lM1cddP2k54qAOFN')`
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-4 sm:gap-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-surface-container-highest/20 backdrop-blur-md text-on-primary border border-white/20">
              <Icon name="verified" className="w-4 h-4 text-secondary-container" />
              <span className="text-xs sm:text-sm font-semibold">Smart India Hackathon 2026 Enterprise Solution</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-on-primary tracking-tight leading-[1.15]">
              From Farm to Market, With Fewer Middle Layers.
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-on-primary-container max-w-xl font-normal leading-relaxed">
              Connect farmers, regional aggregation centers, commercial buyers, and local transport providers through one transparent agricultural supply network.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => navigateTo('login')}
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-secondary-container text-on-secondary-container font-bold text-sm sm:text-base shadow-xl hover:bg-secondary-fixed transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Started Now</span>
                <Icon name="arrow_forward" className="w-5 h-5 text-on-secondary-container" />
              </button>
              <a
                href="#platform-flow"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-surface-container-highest/15 backdrop-blur-md text-on-primary font-bold text-sm sm:text-base border border-white/20 hover:bg-surface-container-highest/25 transition-all"
              >
                Explore the Platform
              </a>
            </div>
          </div>

          {/* Mandi Live Index Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-surface-container-lowest/15 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-white/20 shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-md shrink-0">
                    <Icon name="trending_up" className="w-6 h-6 text-on-secondary-container" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs text-on-primary-container uppercase tracking-wider block font-bold">
                      LIVE MANDI INDEX
                    </span>
                    <h4 className="text-lg sm:text-xl text-on-primary font-bold">Punjab & Haryana Tier-1</h4>
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary-fixed border border-secondary-fixed/30 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>
                  Real-Time
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest/10 hover:bg-surface-container-lowest/15 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon name="eco" className="w-4 h-4 text-secondary-fixed" />
                    </div>
                    <span className="text-xs sm:text-sm text-on-primary font-medium">Organic Wheat (Grade A)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs sm:text-sm text-on-primary font-bold">₹2,450 / quintal</span>
                    <span className="text-[11px] text-secondary-fixed flex items-center justify-end gap-0.5 font-bold">
                      <Icon name="arrow_upward" className="w-3 h-3 text-secondary-fixed" /> +4.2%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest/10 hover:bg-surface-container-lowest/15 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon name="nutrition" className="w-4 h-4 text-secondary-fixed" />
                    </div>
                    <span className="text-xs sm:text-sm text-on-primary font-medium">Basmati Paddy (1121)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs sm:text-sm text-on-primary font-bold">₹3,890 / quintal</span>
                    <span className="text-[11px] text-secondary-fixed flex items-center justify-end gap-0.5 font-bold">
                      <Icon name="arrow_upward" className="w-3 h-3 text-secondary-fixed" /> +1.8%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest/10 hover:bg-surface-container-lowest/15 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <Icon name="local_florist" className="w-4 h-4 text-secondary-fixed" />
                    </div>
                    <span className="text-xs sm:text-sm text-on-primary font-medium">Roma Tomatoes (MH)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs sm:text-sm text-on-primary font-bold">₹2,850 / quintal</span>
                    <span className="text-[11px] text-secondary-fixed flex items-center justify-end gap-0.5 font-bold">
                      <Icon name="arrow_upward" className="w-3 h-3 text-secondary-fixed" /> +6.1%
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center border-t border-white/10">
                <span className="text-[11px] text-on-primary-container font-medium">
                  ⚡ Aggregated across 142 collection hubs & APMC mandis today
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Platform Flow */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full" id="platform-flow">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <span className="text-xs text-secondary uppercase tracking-widest font-extrabold mb-2 block">
            END-TO-END ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-on-surface">Visual Platform Flow</h2>
          <p className="text-sm sm:text-base text-on-surface-variant mt-2">
            Seamless digital handshakes from harvest soil to commercial delivery.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center gap-2.5 hover:shadow-lg transition-all border border-outline-variant/20 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
              <Icon name="agriculture" className="w-6 h-6 text-on-primary-container" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-on-surface">Farmers / FPOs</span>
            <span className="text-[11px] text-on-surface-variant">Direct harvest listing & aggregation</span>
          </div>

          <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center gap-2.5 hover:shadow-lg transition-all border border-outline-variant/20 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
              <Icon name="storefront" className="w-6 h-6 text-on-primary-container" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-on-surface">Village Hubs</span>
            <span className="text-[11px] text-on-surface-variant">Local aggregation & optical sorting</span>
          </div>

          <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center gap-2.5 hover:shadow-lg transition-all border border-outline-variant/20 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
              <Icon name="verified" className="w-6 h-6 text-on-primary-container" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-on-surface">Quality Assured</span>
            <span className="text-[11px] text-on-surface-variant">Assaying, grading & FSSAI check</span>
          </div>

          <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center gap-2.5 hover:shadow-lg transition-all border border-outline-variant/20 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
              <Icon name="payments" className="w-6 h-6 text-on-primary-container" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-on-surface">Fair Pricing</span>
            <span className="text-[11px] text-on-surface-variant">Mandi index & smart escrow</span>
          </div>

          <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center gap-2.5 hover:shadow-lg transition-all border border-outline-variant/20 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
              <Icon name="local_shipping" className="w-6 h-6 text-on-primary-container" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-on-surface">Transporters</span>
            <span className="text-[11px] text-on-surface-variant">GPS geofenced reefer fleet</span>
          </div>

          <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center gap-2.5 hover:shadow-lg transition-all border border-outline-variant/20 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
              <Icon name="shopping_cart" className="w-6 h-6 text-on-primary-container" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-on-surface">Buyers</span>
            <span className="text-[11px] text-on-surface-variant">Bulk verified supply & escrow</span>
          </div>
        </div>
      </section>

      {/* Role Switcher Direct Access (Interactive Bento Grid) */}
      <section className="py-16 bg-surface-container-low border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs text-secondary uppercase tracking-widest font-extrabold block mb-1">
                ROLE-BASED WORKSPACES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface">Experience All Perspectives</h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md">
              Click into any role to see how data flows dynamically between farmers, buyers, fleet, and command center.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Role 1: Farmer */}
            <div
              onClick={() => navigateTo('farmer', 'farmer')}
              className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-outline-variant/20 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Icon name="agriculture" className="w-6 h-6 text-on-primary-container" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Farmer / FPO</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                  Register farm produce, inspect market clearing prices, and track pickup schedules with zero middlemen.
                </p>
              </div>
              <div className="flex items-center text-xs sm:text-sm font-bold text-primary gap-1.5 group-hover:gap-2.5 transition-all">
                <span>Enter Farmer Hub</span>
                <Icon name="arrow_forward" className="w-4 h-4 text-primary" />
              </div>
            </div>

            {/* Role 2: Buyer */}
            <div
              onClick={() => navigateTo('buyer', 'buyer')}
              className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-outline-variant/20 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Icon name="storefront" className="w-6 h-6 text-on-secondary-container" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Buyer / Mandi</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                  Discover verified bulk harvests, lock in escrow payments, and trace soil-to-table provenance.
                </p>
              </div>
              <div className="flex items-center text-xs sm:text-sm font-bold text-primary gap-1.5 group-hover:gap-2.5 transition-all">
                <span>Open Marketplace</span>
                <Icon name="arrow_forward" className="w-4 h-4 text-primary" />
              </div>
            </div>

            {/* Role 3: Transport Fleet */}
            <div
              onClick={() => navigateTo('fleet', 'transport')}
              className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-outline-variant/20 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-tertiary-fixed/40 text-tertiary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Icon name="local_shipping" className="w-6 h-6 text-tertiary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Fleet & Logistics</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                  Manage drivers, verify RC and fitness documentation, and optimize cold corridor transit loads.
                </p>
              </div>
              <div className="flex items-center text-xs sm:text-sm font-bold text-primary gap-1.5 group-hover:gap-2.5 transition-all">
                <span>Manage Fleet</span>
                <Icon name="arrow_forward" className="w-4 h-4 text-primary" />
              </div>
            </div>

            {/* Role 4: Command Center */}
            <div
              onClick={() => navigateTo('admin', 'admin')}
              className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-outline-variant/20 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <Icon name="admin_panel_settings" className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Command Center</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4">
                  Live oversight of corridor telematics, warehouse utilization, and network-wide clearing settlement.
                </p>
              </div>
              <div className="flex items-center text-xs sm:text-sm font-bold text-primary gap-1.5 group-hover:gap-2.5 transition-all">
                <span>View Command Hub</span>
                <Icon name="arrow_forward" className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Produce Showcase */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <span className="text-xs text-secondary uppercase tracking-widest font-extrabold block mb-1">
              DIRECT FROM ORIGIN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface">Available Aggregated Lots</h2>
          </div>
          <button
            onClick={() => navigateTo('buyer', 'buyer')}
            className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1 self-start md:self-auto"
          >
            <span>View All in Marketplace</span>
            <Icon name="arrow_forward" className="w-4 h-4 text-primary" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {produceList.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-outline-variant/20 flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {item.grade}
                </div>
                <div className="absolute bottom-3 right-3 bg-surface/95 backdrop-blur-md text-primary px-3 py-1 rounded-lg text-xs sm:text-sm font-extrabold shadow">
                  ₹{item.pricePerKg.toFixed(2)} / kg
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold">{item.hub}</span>
                    <span className="text-[11px] text-secondary font-bold flex items-center gap-1">
                      <Icon name="verified" className="w-3.5 h-3.5 text-secondary" /> Verified
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-1.5">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 mb-4">{item.description}</p>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-surface-variant">
                  <button
                    onClick={() => setInspectingBatch(item)}
                    className="flex-1 py-2 px-3 rounded-xl bg-surface-container-high hover:bg-surface-container text-primary font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Icon name="qr_code_2" className="w-4 h-4 text-primary" />
                    <span>Trace Lot</span>
                  </button>
                  <button
                    onClick={() => navigateTo('buyer', 'buyer')}
                    className="flex-1 py-2 px-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs transition-all text-center"
                  >
                    Procure
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-on-primary py-10 sm:py-12 px-4 sm:px-6 lg:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold shrink-0">
              <Icon name="eco" className="w-5 h-5 text-on-secondary-container" />
            </div>
            <div>
              <span className="text-lg font-bold block leading-tight">Annapurna Supply Network</span>
              <span className="text-xs text-on-primary-container">Smart India Hackathon 2026 Initiative</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs text-on-primary-container font-semibold">
            <button onClick={() => navigateTo('landing')} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => navigateTo('farmer', 'farmer')} className="hover:text-white transition-colors">Farmer Hub</button>
            <button onClick={() => navigateTo('buyer', 'buyer')} className="hover:text-white transition-colors">Buyer Marketplace</button>
            <button onClick={() => navigateTo('fleet', 'transport')} className="hover:text-white transition-colors">Fleet Hub</button>
            <button onClick={() => navigateTo('admin', 'admin')} className="hover:text-white transition-colors">Command Center</button>
          </div>
          <div className="text-[11px] text-on-primary-container">
            © 2026 Annapurna. Built for National Agro Logistics Integration.
          </div>
        </div>
      </footer>
    </div>
  );
}
