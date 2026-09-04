import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';

export default function FarmerDashboard() {
  const { produceList, addProduce, orderList, setInspectingBatch } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPickupModal, setShowPickupModal] = useState(false);

  // Add produce form state
  const [formName, setFormName] = useState('');
  const [formVariety, setFormVariety] = useState('');
  const [formCategory, setFormCategory] = useState('vegetables');
  const [formGrade, setFormGrade] = useState('Grade A • Export Quality');
  const [formVolume, setFormVolume] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formMinOrder, setFormMinOrder] = useState('2');
  const [formDescription, setFormDescription] = useState('');

  // Sample presets for quick demo fill
  const fillSampleProduce = (type) => {
    if (type === 'mango') {
      setFormName('Devgad Alphonso Mangoes');
      setFormVariety('Hapus Premium');
      setFormCategory('fruits');
      setFormGrade('Grade A • GI Tagged');
      setFormVolume('15');
      setFormPrice('180.00');
      setFormMinOrder('2');
      setFormDescription('Naturally ripened in coastal orchards. Unmatched aroma and golden pulp, export certified.');
    } else if (type === 'cauliflower') {
      setFormName('Snowball Cauliflower');
      setFormVariety('Snowball Hybrid');
      setFormCategory('vegetables');
      setFormGrade('Grade A • Fresh Harvest');
      setFormVolume('22');
      setFormPrice('24.00');
      setFormMinOrder('3');
      setFormDescription('Compact, pure white curd heads harvested this morning under micro-irrigation.');
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formVolume || !formPrice) return;

    addProduce({
      name: formName,
      variety: formVariety || 'Selected Hybrid',
      category: formCategory,
      grade: formGrade,
      availableVolume: parseFloat(formVolume),
      unit: 'MT',
      pricePerKg: parseFloat(formPrice),
      minOrder: parseFloat(formMinOrder) || 1,
      description: formDescription || 'Freshly harvested produce from registered cooperative farms.',
      image: formCategory === 'fruits'
        ? 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=800&q=80',
      soilTested: 'Optimal pH (Certified)',
      fssaiLicense: 'FSSAI-11522036000412'
    });

    setShowAddModal(false);
    setFormName('');
    setFormVariety('');
    setFormVolume('');
    setFormPrice('');
    setFormDescription('');
  };

  const totalVolumeMT = produceList.reduce((sum, item) => sum + (item.availableVolume || 0), 0);
  const totalEstimatedValue = produceList.reduce((sum, item) => sum + ((item.availableVolume || 0) * 1000 * (item.pricePerKg || 0)), 0);
  const activeOrdersCount = orderList.filter(o => o.status !== 'Delivered & Settled').length;

  return (
    <div className="flex flex-col w-full pb-16 overflow-x-hidden">
      {/* Top Welcome & Greeting Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] text-on-surface-variant uppercase tracking-wider block font-bold mb-1">
            FPO ID: MH-NSK-8842 • NASHIK AGRO CLUSTER
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">Good morning, Ramesh 👋</h1>
          <p className="text-sm sm:text-base text-on-surface-variant mt-1">
            Here is your farm aggregation summary and market outlook for today.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setShowPickupModal(true)}
            className="bg-surface-container hover:bg-surface-container-high text-on-surface font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 border border-outline-variant/30 transition-all text-xs sm:text-sm shadow-sm"
          >
            <Icon name="event" className="w-4 h-4 text-primary" />
            <span>Schedule Pickup</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary hover:bg-primary-container text-on-primary font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md transition-all text-xs sm:text-sm hover:scale-[1.02]"
          >
            <Icon name="add_circle" className="w-5 h-5 text-on-primary" />
            <span>+ Add Produce</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Metric 1 */}
        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden border border-outline-variant/20">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-primary-container"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Available Produce</span>
            <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
              <Icon name="inventory_2" className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">
              {totalVolumeMT.toLocaleString()} MT
            </span>
            <span className="text-xs text-secondary flex items-center gap-1 mt-1 font-bold">
              <Icon name="trending_up" className="w-3.5 h-3.5 text-secondary" /> +12% from last week
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden border border-outline-variant/20">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-tertiary-container"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Estimated Value</span>
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/40 flex items-center justify-center text-tertiary shrink-0">
              <Icon name="payments" className="w-5 h-5 text-tertiary" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">
              ₹{(totalEstimatedValue / 100000).toFixed(2)} Lakhs
            </span>
            <span className="text-xs text-on-surface-variant mt-1 block">
              Market indexed rates
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden border border-outline-variant/20">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Active Transit Orders</span>
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
              <Icon name="local_shipping" className="w-5 h-5 text-on-secondary-container" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">
              {activeOrdersCount} Active
            </span>
            <span className="text-xs text-secondary mt-1 block font-bold">
              Guaranteed Escrow
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden border border-outline-variant/20">
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-outline"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Next Hub Collection</span>
            <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface shrink-0">
              <Icon name="schedule" className="w-5 h-5 text-on-surface" />
            </div>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">Tomorrow</span>
            <span className="text-xs text-on-surface-variant mt-1 block">
              09:30 AM • Nashik Center
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layout (2 Columns on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: My Produce & Recent Sales */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Produce Listing */}
          <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface">My Active Produce Listings</h2>
                <span className="text-xs text-on-surface-variant">
                  Published live to verified commercial buyers in the network.
                </span>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <Icon name="add" className="w-4 h-4 text-primary" />
                <span>Add New</span>
              </button>
            </div>

            <div className="space-y-3">
              {produceList.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-surface-container-lowest p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm border border-outline-variant/15 hover:border-outline-variant/40 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-outline-variant/20 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-on-surface">{crop.name}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary font-bold">
                          {crop.grade}
                        </span>
                      </div>
                      <span className="text-xs text-on-surface-variant block mt-0.5">
                        {crop.variety} • Harvested {crop.harvestDate}
                      </span>
                      <span className="text-[11px] text-primary font-semibold block mt-1">
                        📍 {crop.hub}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 sm:border-l sm:border-surface-variant sm:pl-5">
                    <div className="text-left sm:text-right">
                      <span className="text-base sm:text-lg font-bold text-primary block">
                        ₹{crop.pricePerKg.toFixed(2)} / kg
                      </span>
                      <span className="text-xs text-on-surface-variant font-medium">
                        {crop.availableVolume} MT available
                      </span>
                    </div>
                    <button
                      onClick={() => setInspectingBatch(crop)}
                      className="p-2 rounded-xl bg-surface-container-high hover:bg-surface-container text-primary transition-all shadow-sm"
                      title="Inspect Batch Provenance Passport"
                    >
                      <Icon name="qr_code_2" className="w-5 h-5 text-primary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders & Escrow Settlements Table */}
          <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-on-surface">Recent Orders & Payouts</h2>
                <span className="text-xs text-on-surface-variant">
                  Smart escrow settlements linked to digital gate passes.
                </span>
              </div>
              <span className="text-[10px] text-secondary font-bold px-2 py-1 rounded-md bg-secondary-container/40">
                RBI Escrow Protected
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[540px]">
                <thead>
                  <tr className="border-b border-surface-variant text-[11px] text-on-surface-variant uppercase font-bold">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Produce</th>
                    <th className="pb-3">Buyer</th>
                    <th className="pb-3">Volume</th>
                    <th className="pb-3">Payout Value</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant text-xs sm:text-sm">
                  {orderList.map((ord) => (
                    <tr key={ord.id} className="hover:bg-surface-container-high/40 transition-colors">
                      <td className="py-3 font-mono text-xs text-primary font-bold">{ord.id}</td>
                      <td className="py-3 font-semibold text-on-surface">{ord.cropName}</td>
                      <td className="py-3 text-on-surface-variant">{ord.buyerName}</td>
                      <td className="py-3">{ord.volumeMT} MT</td>
                      <td className="py-3 font-bold text-on-surface">₹{ord.totalValue.toLocaleString('en-IN')}</td>
                      <td className="py-3">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold inline-block ${
                          ord.status === 'Delivered & Settled'
                            ? 'bg-secondary-container text-secondary'
                            : 'bg-primary-container/20 text-primary'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Collection Schedule, Mandi Ticker */}
        <div className="space-y-6">
          {/* Next Dispatch & Pickup Box */}
          <div className="bg-primary text-on-primary p-5 sm:p-6 rounded-2xl shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase tracking-wider text-primary-fixed font-bold">
                SCHEDULED MANDI ROUTE
              </span>
              <Icon name="local_shipping" className="w-5 h-5 text-primary-fixed" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-1">Morning Dispatch Route #4</h3>
            <p className="text-xs text-on-primary-container mb-4">
              Mini-truck MH-15-EG-3890 arriving at Dindori aggregation node tomorrow.
            </p>
            <div className="bg-surface/10 backdrop-blur-md p-3 rounded-xl mb-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-on-primary-container">Driver:</span>
                <span className="font-bold text-white">Rajendra More (+91 97652...)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-primary-container">Pickup Window:</span>
                <span className="font-bold text-white">09:30 AM - 10:30 AM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-primary-container">Drop Hub:</span>
                <span className="font-bold text-white">Nashik Central Yard</span>
              </div>
            </div>
            <button
              onClick={() => alert("Pickup time confirmed with Driver Rajendra More!")}
              className="w-full bg-secondary-container text-on-secondary-container font-bold py-2.5 px-4 rounded-xl hover:bg-secondary-fixed transition-all text-xs"
            >
              Confirm Gate Ready
            </button>
          </div>

          {/* Live APMC Mandi Ticker */}
          <div className="bg-surface-container-low p-5 sm:p-6 rounded-2xl shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-bold text-on-surface">APMC Mandi Ticker</h3>
              <span className="text-[10px] text-secondary font-bold flex items-center gap-1">
                <Icon name="refresh" className="w-3 h-3 text-secondary" /> Real-time
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-on-surface block">Nashik Red Onion</span>
                  <span className="text-[10px] text-on-surface-variant">Lasalgaon Terminal</span>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-bold text-on-surface block">₹3,200 / Qtl</span>
                  <span className="text-[11px] text-secondary font-bold flex items-center justify-end">
                    ▲ +3.4%
                  </span>
                </div>
              </div>

              <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-on-surface block">Roma Tomato</span>
                  <span className="text-[10px] text-on-surface-variant">Pimpalgaon Yard</span>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-bold text-on-surface block">₹2,850 / Qtl</span>
                  <span className="text-[11px] text-secondary font-bold flex items-center justify-end">
                    ▲ +4.8%
                  </span>
                </div>
              </div>

              <div className="p-3 bg-surface-container rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-on-surface block">Sharbati Wheat</span>
                  <span className="text-[10px] text-on-surface-variant">Central MP Hub</span>
                </div>
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-bold text-on-surface block">₹2,450 / Qtl</span>
                  <span className="text-[11px] text-secondary font-bold flex items-center justify-end">
                    ▲ +1.2%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* "+ Add Produce" Interactive Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-outline-variant/30 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-surface-variant pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                  <Icon name="add_circle" className="w-5 h-5 text-on-primary-container" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary">List New Harvest Lot</h3>
                  <span className="text-[11px] text-on-surface-variant">Direct listing to Annapurna commercial buyer catalog</span>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-on-surface p-1">
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            {/* Quick preset buttons */}
            <div className="mb-4 p-3 bg-surface-container-low rounded-xl">
              <span className="text-[10px] text-on-surface-variant font-bold block mb-1.5 uppercase">
                ⚡ Quick Fill Presets for Demo:
              </span>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => fillSampleProduce('mango')}
                  className="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-primary-container/30 text-[11px] font-bold text-primary transition-all"
                >
                  🥭 Alphonso Mangoes (15 MT)
                </button>
                <button
                  type="button"
                  onClick={() => fillSampleProduce('cauliflower')}
                  className="px-3 py-1 rounded-lg bg-surface-container-high hover:bg-primary-container/30 text-[11px] font-bold text-primary transition-all"
                >
                  🥦 Snowball Cauliflower (22 MT)
                </button>
              </div>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">Produce Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Alphonso Mangoes"
                    className="w-full bg-surface-container px-3 py-2 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">Variety / Cultivar</label>
                  <input
                    type="text"
                    value={formVariety}
                    onChange={(e) => setFormVariety(e.target.value)}
                    placeholder="e.g. Hapus A-Grade"
                    className="w-full bg-surface-container px-3 py-2 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30 cursor-pointer"
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="grains">Grains & Cereals</option>
                    <option value="pulses">Pulses & Legumes</option>
                    <option value="fruits">Fruits</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">Quality Grade</label>
                  <select
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value)}
                    className="w-full bg-surface-container px-3 py-2 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30 cursor-pointer"
                  >
                    <option value="Grade A • Export Quality">Grade A • Export Quality</option>
                    <option value="Grade A • Retail Ready">Grade A • Retail Ready</option>
                    <option value="Grade B • Processing Grade">Grade B • Processing Grade</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">Volume (MT) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formVolume}
                    onChange={(e) => setFormVolume(e.target.value)}
                    placeholder="e.g. 15"
                    className="w-full bg-surface-container px-3 py-2 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">Price (₹ / kg) *</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. 45.00"
                    className="w-full bg-surface-container px-3 py-2 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-on-surface block mb-1">Min Order (MT)</label>
                  <input
                    type="number"
                    step="1"
                    value={formMinOrder}
                    onChange={(e) => setFormMinOrder(e.target.value)}
                    placeholder="e.g. 2"
                    className="w-full bg-surface-container px-3 py-2 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">Lot Notes & Certification</label>
                <textarea
                  rows="2"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Mention soil test, pesticide status, harvesting method..."
                  className="w-full bg-surface-container px-3 py-2 rounded-xl text-xs text-on-surface focus:ring-2 focus:ring-primary outline-none border border-outline-variant/30"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs shadow hover:bg-primary-container transition-all"
                >
                  Publish to Buyer Marketplace
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Pickup Modal */}
      {showPickupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-outline-variant/30">
            <h3 className="text-lg font-bold text-primary mb-2">Book Village Collection Pickup</h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Select date and pickup volume. A verified refrigerated or mini-truck will be assigned automatically.
            </p>
            <div className="space-y-3 mb-6">
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">Target Pickup Date</label>
                <input
                  type="date"
                  defaultValue="2026-09-05"
                  className="w-full bg-surface-container px-3 py-2 rounded-xl text-xs text-on-surface border border-outline-variant/30"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">Aggregation Node</label>
                <select className="w-full bg-surface-container px-3 py-2 rounded-xl text-xs text-on-surface border border-outline-variant/30">
                  <option>Dindori Aggregation Hub (Node 4)</option>
                  <option>Niphad Cooperative Center (Node 2)</option>
                  <option>Lasalgaon Mandi Yard (Node 1)</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert("Collection pickup scheduled for 2026-09-05. Notification sent to local logistics fleet.");
                  setShowPickupModal(false);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setShowPickupModal(false)}
                className="px-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
