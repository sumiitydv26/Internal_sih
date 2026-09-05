import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Universal Data Service with Resilient Dual-Engine
 * Communicates with Supabase Postgres when connected;
 * Gracefully falls back to local storage/memory if unconfigured or offline.
 */

// Helper to normalize produce row from Supabase to frontend model
const mapProduceRow = (row) => ({
  id: row.id,
  name: row.name,
  variety: row.variety,
  category: row.category,
  grade: row.grade,
  availableVolume: Number(row.available_volume),
  unit: row.unit || 'MT',
  pricePerKg: Number(row.price_per_kg),
  minOrder: Number(row.min_order),
  hub: row.hub,
  harvestDate: row.harvest_date,
  farmerName: row.farmer_name,
  fpoId: row.fpo_id,
  description: row.description,
  image: row.image_url,
  verified: row.verified,
  soilTested: row.soil_tested,
  fssaiLicense: row.fssai_license,
  status: row.status
});

// Helper to map order row
const mapOrderRow = (row) => ({
  id: row.id,
  produceId: row.produce_id,
  cropName: row.crop_name,
  quantityMT: Number(row.quantity_mt),
  unitPrice: Number(row.unit_price),
  totalPrice: Number(row.total_price),
  buyerName: row.buyer_name,
  buyerCompany: row.buyer_company,
  hub: row.hub,
  status: row.status,
  trackingId: row.tracking_id,
  escrowStatus: row.escrow_status,
  temperatureC: Number(row.temperature_c),
  orderedAt: row.ordered_at
});

// Helper to map fleet row
const mapFleetRow = (row) => ({
  id: row.id,
  driverName: row.driver_name,
  phone: row.phone,
  vehicleType: row.vehicle_type,
  capacityMT: Number(row.capacity_mt),
  status: row.status,
  route: row.route,
  currentTemp: Number(row.current_temp),
  targetTemp: Number(row.target_temp),
  speedKmh: row.speed_kmh,
  batteryPct: row.battery_pct,
  gps: { lat: Number(row.gps_lat), lng: Number(row.gps_lng) },
  assignedOrderId: row.assigned_order_id,
  updatedAt: row.updated_at
});

export const apiService = {
  isConfigured() {
    return isSupabaseConfigured;
  },

  // --------------------------------------------------------------------------
  // PRODUCE
  // --------------------------------------------------------------------------
  async fetchProduce(fallbackList) {
    if (!isSupabaseConfigured || !supabase) return fallbackList;
    try {
      const { data, error } = await supabase
        .from('produce_batches')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) return fallbackList;
      return data.map(mapProduceRow);
    } catch (err) {
      console.warn('Supabase fetchProduce error, using local data:', err);
      return fallbackList;
    }
  },

  async createProduce(produceItem) {
    if (!isSupabaseConfigured || !supabase) return { success: true, item: produceItem };
    try {
      const payload = {
        id: produceItem.id,
        name: produceItem.name,
        variety: produceItem.variety || 'Hybrid Commercial',
        category: produceItem.category || 'vegetables',
        grade: produceItem.grade || 'Grade A',
        available_volume: produceItem.availableVolume,
        unit: produceItem.unit || 'MT',
        price_per_kg: produceItem.pricePerKg,
        min_order: produceItem.minOrder || 1,
        hub: produceItem.hub || 'Regional Aggregation Center',
        harvest_date: produceItem.harvestDate || 'Just now',
        farmer_name: produceItem.farmerName || 'Registered Farmer',
        fpo_id: produceItem.fpoId || 'FPO-GENERAL',
        description: produceItem.description || '',
        image_url: produceItem.image,
        verified: produceItem.verified ?? true,
        soil_tested: produceItem.soilTested || 'Optimal',
        fssai_license: produceItem.fssaiLicense || 'FSSAI-PENDING',
        status: 'available'
      };

      const { data, error } = await supabase
        .from('produce_batches')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.warn('Supabase produce insert error:', error);
        return { success: false, error, item: produceItem };
      }
      return { success: true, item: mapProduceRow(data) };
    } catch (err) {
      console.warn('Supabase createProduce exception:', err);
      return { success: true, item: produceItem };
    }
  },

  // --------------------------------------------------------------------------
  // ORDERS
  // --------------------------------------------------------------------------
  async fetchOrders(fallbackOrders) {
    if (!isSupabaseConfigured || !supabase) return fallbackOrders;
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('ordered_at', { ascending: false });

      if (error || !data || data.length === 0) return fallbackOrders;
      return data.map(mapOrderRow);
    } catch (err) {
      console.warn('Supabase fetchOrders error, using local data:', err);
      return fallbackOrders;
    }
  },

  async createOrder(orderItem) {
    if (!isSupabaseConfigured || !supabase) return { success: true, order: orderItem };
    try {
      const payload = {
        id: orderItem.id,
        produce_id: orderItem.produceId || null,
        crop_name: orderItem.cropName || orderItem.name,
        quantity_mt: orderItem.quantityMT || orderItem.quantity,
        unit_price: orderItem.unitPrice || orderItem.pricePerKg,
        total_price: orderItem.totalPrice,
        buyer_name: orderItem.buyerName,
        buyer_company: orderItem.buyerCompany,
        hub: orderItem.hub,
        status: orderItem.status || 'Assigned to Fleet',
        tracking_id: orderItem.trackingId,
        escrow_status: orderItem.escrowStatus || 'Secured in Smart Escrow',
        temperature_c: orderItem.temperatureC || 4.0
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.warn('Supabase order insert error:', error);
        return { success: false, error, order: orderItem };
      }
      return { success: true, order: mapOrderRow(data) };
    } catch (err) {
      console.warn('Supabase createOrder exception:', err);
      return { success: true, order: orderItem };
    }
  },

  // --------------------------------------------------------------------------
  // FLEET
  // --------------------------------------------------------------------------
  async fetchFleet(fallbackFleet) {
    if (!isSupabaseConfigured || !supabase) return fallbackFleet;
    try {
      const { data, error } = await supabase
        .from('fleet_vehicles')
        .select('*')
        .order('id');

      if (error || !data || data.length === 0) return fallbackFleet;
      return data.map(mapFleetRow);
    } catch (err) {
      console.warn('Supabase fetchFleet error, using local data:', err);
      return fallbackFleet;
    }
  },

  // --------------------------------------------------------------------------
  // AUDIT LOGS
  // --------------------------------------------------------------------------
  async fetchAuditLogs(fallbackLogs) {
    if (!isSupabaseConfigured || !supabase) return fallbackLogs;
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error || !data || data.length === 0) return fallbackLogs;
      return data.map(row => ({
        id: row.id,
        title: row.title,
        detail: row.detail,
        type: row.event_type,
        badge: row.badge,
        badgeClass: row.badge_class,
        time: new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
    } catch (err) {
      console.warn('Supabase fetchAuditLogs error:', err);
      return fallbackLogs;
    }
  },

  async logAudit(logItem) {
    if (!isSupabaseConfigured || !supabase) return { success: true };
    try {
      const payload = {
        id: logItem.id || ('LOG-' + Date.now()),
        title: logItem.title,
        detail: logItem.detail,
        event_type: logItem.type || 'produce',
        badge: logItem.badge || 'Verified',
        badge_class: logItem.badgeClass || 'bg-primary-container/10 text-primary'
      };

      await supabase.from('audit_logs').insert([payload]);
      return { success: true };
    } catch (err) {
      console.warn('Supabase logAudit error:', err);
      return { success: true };
    }
  },

  // --------------------------------------------------------------------------
  // REAL-TIME SUBSCRIPTIONS
  // --------------------------------------------------------------------------
  subscribeToChanges({ onProduceChange, onOrderChange, onFleetChange, onLogChange }) {
    if (!isSupabaseConfigured || !supabase) return () => {};

    const channel = supabase
      .channel('annapurna_realtime_feed')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'produce_batches' },
        payload => onProduceChange && onProduceChange(payload)
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        payload => onOrderChange && onOrderChange(payload)
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'fleet_vehicles' },
        payload => onFleetChange && onFleetChange(payload)
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'audit_logs' },
        payload => onLogChange && onLogChange(payload)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};
