import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import confetti from 'canvas-confetti';

export default function BuyerMarketplace() {
  const { produceList, placeBulkOrder, orderList, setInspectingBatch } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Bulk Order Modal State
  const [activeCropForOrder, setActiveCropForOrder] = useState(null);
  const [orderVolume, setOrderVolume] = useState(5);
  const [deliveryLocation, setDeliveryLocation] = useState('Mumbai APMC Terminal (Vashi)');
  const [includeColdChain, setIncludeColdChain] = useState(true);
  const [orderSuccessNotice, setOrderSuccessNotice] = useState(null);

  // Filter produce
  const filteredProduce = produceList.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          item.hub.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          item.grade.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenOrderModal = (crop) => {
    setActiveCropForOrder(crop);
    setOrderVolume(crop.minOrder || 5);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (!activeCropForOrder) return;

    const basePrice = orderVolume * 1000 * activeCropForOrder.pricePerKg;
    const logisticsFee = includeColdChain ? orderVolume * 1800 : orderVolume * 900;
    const assayingFee = 1500;
    const totalAmount = basePrice + logisticsFee + assayingFee;

    const createdOrder = placeBulkOrder({
      produceId: activeCropForOrder.id,
      cropName: activeCropForOrder.name,
      variety: activeCropForOrder.variety,
      volumeMT: parseFloat(orderVolume),
      pricePerKg: activeCropForOrder.pricePerKg,
      totalValue: totalAmount,
      buyerName: "FreshBasket Retail Ltd",
      buyerLocation: deliveryLocation,
      farmerName: activeCropForOrder.farmerName,
      fpoId: activeCropForOrder.fpoId,
      deliveryDate: "Tomorrow by 04:00 PM"
    });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    setActiveCropForOrder(null);
    setOrderSuccessNotice(createdOrder);
    setTimeout(() => setOrderSuccessNotice(null), 6000);
  };

  const activeOrdersCount = orderList.length;
  const totalPurchaseValue = orderList.reduce((sum, o) => sum + (o.totalValue || 0), 0);

  return (
    <div className="flex flex-col w-full pb-16 overflow-x-hidden">
      {/* Top Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm flex items-center justify-between border border-outline-variant/20">
          <div>
            <span className="text-[10px] text-on-surface-variant block mb-1 uppercase font-bold tracking-wider">
              Active Orders
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-primary">{activeOrdersCount}</span>
            <span className="text-xs text-secondary flex items-center mt-1 font-bold">
              <Icon name="trending_up" className="w-3.5 h-3.5 mr-1 text-secondary" />+2 today
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm shrink-0">
            <Icon name="shopping_cart" className="w-6 h-6 text-on-primary-container" />
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm flex items-center justify-between border border-outline-variant/20">
          <div>
            <span className="text-[10px] text-on-surface-variant block mb-1 uppercase font-bold tracking-wider">
              Pending Quotes
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-primary">6</span>
            <span className="text-xs text-on-surface-variant block mt-1">Awaiting FPO reply</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
            <Icon name="request_quote" className="w-6 h-6 text-primary" />
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm flex items-center justify-between border border-outline-variant/20">
          <div>
            <span className="text-[10px] text-on-surface-variant block mb-1 uppercase font-bold tracking-wider">
              Incoming Deliveries
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-primary">3</span>
            <span className="text-xs text-secondary flex items-center mt-1 font-bold">
              <Icon name="local_shipping" className="w-3.5 h-3.5 mr-1 text-secondary" />En route
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
            <Icon name="local_shipping" className="w-6 h-6 text-on-secondary-container" />
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl shadow-sm flex items-center justify-between border border-outline-variant/20">
          <div>
            <span className="text-[10px] text-on-surface-variant block mb-1 uppercase font-bold tracking-wider">
              Total Escrow Procured
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-primary">
              ₹{(totalPurchaseValue / 100000).toFixed(2)}L
            </span>
            <span className="text-xs text-secondary flex items-center mt-1 font-bold">
              <Icon name="verified" className="w-3.5 h-3.5 mr-1 text-secondary" />Verified contracts
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
            <Icon name="payments" className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>

      {/* Success alert banner */}
      {orderSuccessNotice && (
        <div className="mb-6 p-4 rounded-xl bg-secondary-container/40 border border-secondary text-on-secondary-container flex items-center justify-between animate-fadeIn flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <Icon name="verified" className="w-6 h-6 text-secondary shrink-0" />
            <div>
              <span className="font-bold block text-xs sm:text-sm">
                Bulk Order Confirmed & Secured in Escrow! #{orderSuccessNotice.id}
              </span>
              <span className="text-xs">
                Purchased {orderSuccessNotice.volumeMT} MT of {orderSuccessNotice.cropName} (₹
                {orderSuccessNotice.totalValue.toLocaleString('en-IN')}). Dispatched to Transport Fleet.
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono bg-white/70 px-2.5 py-1 rounded-md font-bold">
            Tracking: {orderSuccessNotice.trackingId}
          </span>
        </div>
      )}

      {/* Marketplace Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary">Find Reliable Regional Supply</h2>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Direct bulk procurement from verified FPOs and regional aggregation hubs.
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {[
            { id: 'all', label: 'All Crops' },
            { id: 'vegetables', label: 'Vegetables' },
            { id: 'grains', label: 'Grains & Paddy' },
            { id: 'pulses', label: 'Pulses' },
            { id: 'fruits', label: 'Fruits' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Regional Supply Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredProduce.map((crop) => (
          <div
            key={crop.id}
            className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all border border-outline-variant/20 hover:-translate-y-1"
          >
            <div className="relative h-48 w-full bg-cover bg-center overflow-hidden">
              <img
                src={crop.image}
                alt={crop.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-md text-on-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow">
                {crop.grade}
              </div>
              <div className="absolute bottom-3 right-3 bg-surface/95 backdrop-blur-md text-primary px-3 py-1 rounded-lg text-xs sm:text-sm font-extrabold shadow">
                ₹{crop.pricePerKg.toFixed(2)} / kg
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    {crop.hub}
                  </span>
                  <span className="text-xs text-secondary font-bold flex items-center gap-1">
                    <Icon name="verified" className="w-3.5 h-3.5 text-secondary" />Verified
                  </span>
                </div>

                <h3 className="text-base sm:text-lg text-primary font-bold mb-1.5">{crop.name}</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mb-4 line-clamp-2">
                  {crop.description}
                </p>

                <div className="grid grid-cols-2 gap-3 bg-surface-container p-3 rounded-xl mb-4">
                  <div>
                    <span className="text-[10px] text-on-surface-variant block uppercase font-bold">
                      Available Volume
                    </span>
                    <span className="text-sm font-extrabold text-primary">
                      {crop.availableVolume} MT
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant block uppercase font-bold">
                      Min. Order
                    </span>
                    <span className="text-sm font-extrabold text-primary">
                      {crop.minOrder} MT
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInspectingBatch(crop)}
                  className="flex-1 bg-surface-container-high text-primary hover:bg-surface-container py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                >
                  <Icon name="qr_code_2" className="w-4 h-4 text-primary" />
                  <span>Trace Lot</span>
                </button>
                <button
                  onClick={() => handleOpenOrderModal(crop)}
                  disabled={crop.availableVolume <= 0}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center ${
                    crop.availableVolume <= 0
                      ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed'
                      : 'bg-primary text-on-primary hover:bg-primary-container shadow-sm hover:scale-[1.02]'
                  }`}
                >
                  {crop.availableVolume <= 0 ? 'Sold Out' : 'Place Bulk Order'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Market Ticker */}
      <div className="bg-primary text-on-primary p-6 lg:p-8 rounded-2xl shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
            <Icon name="trending_up" className="w-6 h-6 text-secondary-container" />
          </div>
          <div>
            <span className="text-[10px] text-on-primary-container block mb-1 uppercase tracking-wider font-bold">
              Mandi Price Index (Live)
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              Regional vegetable & grain prices stable with +1.4% upward trend
            </h3>
            <p className="text-xs text-surface-variant mt-1">
              Lock in contracted rates for the upcoming harvest season to hedge against volatility with automated escrow.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 w-full lg:w-auto">
          <button
            onClick={() => alert("Current APMC & e-NAM market price index downloaded.")}
            className="flex-1 lg:flex-none bg-surface text-on-surface px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-surface-container transition-all text-center"
          >
            Download Price Sheet
          </button>
          <button
            onClick={() => alert("Price alert active! You will be notified of rate changes > 5%.")}
            className="flex-1 lg:flex-none bg-secondary text-on-secondary px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-secondary-fixed transition-all text-center"
          >
            Setup Price Alert
          </button>
        </div>
      </div>

      {/* "Place Bulk Order" Escrow Modal */}
      {activeCropForOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-outline-variant/30 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-surface-variant pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                  <Icon name="shopping_cart_checkout" className="w-5 h-5 text-on-primary-container" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary">Confirm Bulk Procurement</h3>
                  <span className="text-[11px] text-on-surface-variant">Smart Escrow Secured Transaction</span>
                </div>
              </div>
              <button onClick={() => setActiveCropForOrder(null)} className="text-on-surface-variant hover:text-on-surface p-1">
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            {/* Produce summary */}
            <div className="flex items-center gap-3.5 p-3 bg-surface-container rounded-xl mb-4">
              <img
                src={activeCropForOrder.image}
                alt={activeCropForOrder.name}
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-bold text-xs sm:text-sm text-on-surface">{activeCropForOrder.name}</h4>
                <span className="text-xs text-on-surface-variant block">
                  {activeCropForOrder.variety} • {activeCropForOrder.grade}
                </span>
                <span className="text-[11px] text-secondary font-semibold">
                  Supplier: {activeCropForOrder.farmerName} ({activeCropForOrder.hub})
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm sm:text-base font-bold text-primary">₹{activeCropForOrder.pricePerKg}/kg</span>
                <span className="text-[10px] text-on-surface-variant block">
                  Max: {activeCropForOrder.availableVolume} MT
                </span>
              </div>
            </div>

            <form onSubmit={handleConfirmOrder} className="space-y-3.5">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-on-surface">Order Volume (Metric Tons)</label>
                  <span className="text-[11px] text-on-surface-variant">
                    Min: {activeCropForOrder.minOrder} MT
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={activeCropForOrder.minOrder || 1}
                    max={activeCropForOrder.availableVolume}
                    step="1"
                    value={orderVolume}
                    onChange={(e) => setOrderVolume(parseFloat(e.target.value))}
                    className="flex-1 accent-primary"
                  />
                  <div className="flex items-center bg-surface-container px-3 py-1.5 rounded-xl border border-outline-variant/30">
                    <input
                      type="number"
                      min={activeCropForOrder.minOrder || 1}
                      max={activeCropForOrder.availableVolume}
                      value={orderVolume}
                      onChange={(e) => setOrderVolume(Math.min(activeCropForOrder.availableVolume, Math.max(1, parseFloat(e.target.value) || 1)))}
                      className="w-14 bg-transparent text-center font-bold text-on-surface outline-none text-xs"
                    />
                    <span className="text-xs font-bold text-on-surface-variant">MT</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">Destination Delivery Hub</label>
                <select
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full bg-surface-container px-3 py-2 rounded-xl text-xs text-on-surface outline-none border border-outline-variant/30 cursor-pointer"
                >
                  <option value="Mumbai APMC Terminal (Vashi)">Mumbai APMC Terminal (Vashi)</option>
                  <option value="Pune Hadapsar Wholesale Warehouse">Pune Hadapsar Wholesale Warehouse</option>
                  <option value="Nagpur Processing Plant #2">Nagpur Processing Plant #2</option>
                  <option value="Delhi Azadpur Mandi Inbound Yard">Delhi Azadpur Mandi Inbound Yard</option>
                </select>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl flex items-center justify-between border border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <Icon name="ac_unit" className="w-5 h-5 text-primary" />
                  <div>
                    <span className="text-xs font-bold text-on-surface block">Refrigerated Cold-Chain Transit</span>
                    <span className="text-[11px] text-on-surface-variant">IoT Temperature Sensor Geofenced Truck</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeColdChain}
                  onChange={(e) => setIncludeColdChain(e.target.checked)}
                  className="w-4 h-4 accent-primary rounded cursor-pointer"
                />
              </div>

              {/* Price Breakdown Calculation */}
              <div className="bg-surface-container p-3.5 rounded-xl space-y-1.5 text-xs border border-outline-variant/20">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Produce Subtotal ({orderVolume} MT @ ₹{activeCropForOrder.pricePerKg}/kg):</span>
                  <span className="font-semibold text-on-surface">
                    ₹{(orderVolume * 1000 * activeCropForOrder.pricePerKg).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Transport Logistics ({includeColdChain ? 'Cold-Chain Reefer' : 'Standard Mini-truck'}):</span>
                  <span className="font-semibold text-on-surface">
                    ₹{(includeColdChain ? orderVolume * 1800 : orderVolume * 900).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Optical Assaying & FSSAI Verification Fee:</span>
                  <span className="font-semibold text-on-surface">₹1,500</span>
                </div>
                <div className="border-t border-outline-variant/30 pt-2 flex justify-between items-center text-sm sm:text-base font-extrabold text-primary">
                  <span>Total Escrow Deposit:</span>
                  <span>
                    ₹{(
                      (orderVolume * 1000 * activeCropForOrder.pricePerKg) +
                      (includeColdChain ? orderVolume * 1800 : orderVolume * 900) +
                      1500
                    ).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs shadow hover:bg-primary-container transition-all flex items-center justify-center gap-1.5"
                >
                  <Icon name="lock" className="w-4 h-4" />
                  <span>Deposit to Smart Escrow & Place Order</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCropForOrder(null)}
                  className="px-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
