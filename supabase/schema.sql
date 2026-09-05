-- ==============================================================================
-- Annapurna AgriChain - Full-Stack Supabase Schema & Database DDL
-- Designed for Smart India Hackathon (SIH 2026)
-- Covers: Produce Listings, Orders & Escrow, Cold Chain IoT Telemetry,
-- Regional Admin Oversight, and Cryptographic Audit Logs.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. Table: produce_batches
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS produce_batches (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    variety TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('vegetables', 'grains', 'fruits', 'pulses', 'spices', 'other')),
    grade TEXT NOT NULL,
    available_volume NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    unit TEXT NOT NULL DEFAULT 'MT',
    price_per_kg NUMERIC(10,2) NOT NULL,
    min_order NUMERIC(10,2) NOT NULL DEFAULT 1.00,
    hub TEXT NOT NULL,
    harvest_date TEXT NOT NULL,
    farmer_name TEXT NOT NULL,
    fpo_id TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    verified BOOLEAN NOT NULL DEFAULT true,
    soil_tested TEXT,
    fssai_license TEXT,
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'contracted', 'in_transit', 'delivered')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. Table: orders
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    produce_id TEXT REFERENCES produce_batches(id) ON DELETE SET NULL,
    crop_name TEXT NOT NULL,
    quantity_mt NUMERIC(10,2) NOT NULL,
    unit_price NUMERIC(10,2) NOT NULL,
    total_price NUMERIC(12,2) NOT NULL,
    buyer_name TEXT NOT NULL,
    buyer_company TEXT,
    hub TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Assigned to Fleet' CHECK (status IN ('Pending', 'Assigned to Fleet', 'In Cold Transit', 'Delivered & Settled', 'Cancelled')),
    tracking_id TEXT NOT NULL UNIQUE,
    escrow_status TEXT NOT NULL DEFAULT 'Secured in Smart Escrow',
    temperature_c NUMERIC(4,1) DEFAULT 4.0,
    ordered_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. Table: fleet_vehicles
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS fleet_vehicles (
    id TEXT PRIMARY KEY,
    driver_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    vehicle_type TEXT NOT NULL,
    capacity_mt NUMERIC(10,2) NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('En Route', 'Loading', 'Available', 'Scheduled', 'Maintenance')),
    route TEXT NOT NULL,
    current_temp NUMERIC(4,1) NOT NULL,
    target_temp NUMERIC(4,1) NOT NULL,
    speed_kmh INTEGER NOT NULL DEFAULT 0,
    battery_pct INTEGER NOT NULL DEFAULT 100,
    gps_lat NUMERIC(9,6) NOT NULL,
    gps_lng NUMERIC(9,6) NOT NULL,
    assigned_order_id TEXT REFERENCES orders(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. Table: audit_logs
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY DEFAULT ('LOG-' || floor(extract(epoch from now()) * 1000)::text),
    title TEXT NOT NULL,
    detail TEXT NOT NULL,
    event_type TEXT NOT NULL CHECK (event_type IN ('produce', 'order', 'iot', 'admin', 'qc')),
    badge TEXT NOT NULL DEFAULT 'Verified',
    badge_class TEXT NOT NULL DEFAULT 'bg-primary-container/10 text-primary',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. Table: regional_telemetry
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS regional_telemetry (
    region_id TEXT PRIMARY KEY,
    region_name TEXT NOT NULL,
    active_volume_mt NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    transit_vehicles INTEGER NOT NULL DEFAULT 0,
    mandi_count INTEGER NOT NULL DEFAULT 1,
    price_index TEXT,
    alerts JSONB DEFAULT '[]'::jsonb,
    bottlenecks JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. Row Level Security (RLS) Policies
-- ------------------------------------------------------------------------------
ALTER TABLE produce_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE fleet_vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE regional_telemetry ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read produce_batches" ON produce_batches FOR SELECT USING (true);
CREATE POLICY "Allow public read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public read fleet_vehicles" ON fleet_vehicles FOR SELECT USING (true);
CREATE POLICY "Allow public read audit_logs" ON audit_logs FOR SELECT USING (true);
CREATE POLICY "Allow public read regional_telemetry" ON regional_telemetry FOR SELECT USING (true);

CREATE POLICY "Allow public insert produce_batches" ON produce_batches FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update produce_batches" ON produce_batches FOR UPDATE USING (true);

CREATE POLICY "Allow public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update orders" ON orders FOR UPDATE USING (true);

CREATE POLICY "Allow public update fleet_vehicles" ON fleet_vehicles FOR UPDATE USING (true);
CREATE POLICY "Allow public insert audit_logs" ON audit_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update regional_telemetry" ON regional_telemetry FOR UPDATE USING (true);

-- ------------------------------------------------------------------------------
-- 7. Realtime Enablement
-- ------------------------------------------------------------------------------
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE produce_batches, orders, fleet_vehicles, audit_logs, regional_telemetry;
COMMIT;

-- ------------------------------------------------------------------------------
-- 8. Seed Initial Production Data
-- ------------------------------------------------------------------------------
INSERT INTO produce_batches (id, name, variety, category, grade, available_volume, unit, price_per_kg, min_order, hub, harvest_date, farmer_name, fpo_id, description, image_url, verified, soil_tested, fssai_license, status)
VALUES
('PROD-TOM-01', 'Hybrid Red Tomatoes (Roma)', 'Roma Special', 'vegetables', 'Grade A • Export Quality', 45.00, 'MT', 28.50, 5.00, 'Nashik FPO Hub, MH', '18 hours ago', 'Ramesh Patil', 'MH-NSK-8842', 'Cold chain verified storage with consistent firmness, vibrant color, and uniform sizing. Directly harvested from progressive cooperative clusters.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiFG_m2K9IX76vsUFmvNe5Ff1IvlYHHKbpxRyZbyW8c4VzlBk6spcGzTKb1N5W77MYwvolfzh8ZSwW9dkHCHMPNwzNsD4nHezDNVJuH7tP3rMclLiHR96NuUBDpPhsw76ZbaG0VMU47Xm_3k3PFMNLKiYt2sYimHUU9A32Axm6B60hBeI-3T8smbAB6ikspHVxOncxd1wyO38_iJ_E7YbVw_n7PzTNBwX_-C_s1JwjJ7tm1Pp3ZDgi', true, 'Optimal (N: 240, P: 38, K: 190)', 'FSSAI-11522036000412', 'available'),
('PROD-POT-02', 'Premium Table Potatoes', 'Jyoti Variety', 'vegetables', 'Grade A • Jyoti Variety', 120.00, 'MT', 18.00, 20.00, 'Agra Cold Storage, UP', '3 days ago', 'Baldev Yadav', 'UP-AGR-4011', 'Low sugar content, uniform large tubers, ideal for chipping and direct retail packaging. Cleanly excavated and cured.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZklK8ciAh9y5zGm-3lNQPdeebIZcYqxLnX1CoU9xSU0p8de4VVinen9X3B7TJZiIR3MjdF5bGxSDu3A5BMqgPySzQTGgbJZqT9HqcObeYZUoVXUkQ2gjb3apTrOkrffQKv683Obzzb2OQd9F74R1mQGYZ5PU9M4Yi6_OtNS9YHkHvEJdhYqWFi-tmwNOwpnTKXKB7A1aPPkjQ5y5GvU3AXFEE3QEW5YQZF95fm56Skq9xlgxkrjC1', true, 'Certified Alluvial pH 6.8', 'FSSAI-10419012000889', 'available'),
('PROD-ONI-03', 'Pungent Red Onions', 'Puneri Red', 'vegetables', 'Grade A • Puneri Red', 85.00, 'MT', 32.00, 10.00, 'Lasalgaon Mandi Hub, MH', '2 days ago', 'Ganesh Shinde', 'MH-LSG-9032', 'Well-cured medium to large bulbs with high shelf life and crisp layers. Rigorously sorted for export standards and long-distance transit.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiOua6vDhlIloVoMFKLu3n9RxY9uGZZHxx-RK5Y8nnkFhQpIsj_ctY8vZ9stjr7Hp-BEI_qqd6G6AdZDbN-8wU5oqyJaUp2BiNgVv1ugkHuvosreHwrksbpywBSGKijP32seklcWG8uPZjEe-9zcs91075XODGrj7G-pcTvntR38LrfcZ146wlR83fKQq30w42Zwze0TuaeBX-e4W5K1AsNj00gUk2GaFj1_ruh5yAu85eWq-tBiqo', true, 'High Potassium Black Clay', 'FSSAI-11520021000334', 'available'),
('PROD-WHT-04', 'Sharbati Organic Wheat', 'C-306 Golden', 'grains', 'Grade A • Certified Organic', 210.00, 'MT', 24.50, 15.00, 'Sehore Grain Terminal, MP', 'Last week', 'Digvijay Singh', 'MP-SEH-1102', 'Naturally sweet Sharbati grains harvested from the fertile black soil of Sehore. High gluten strength and rich golden luster.', 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80', true, '100% Pesticide Residue Free', 'FSSAI-11421045000219', 'available'),
('PROD-RIC-05', 'Basmati Paddy 1121', '1121 Extra Long Grain', 'grains', 'Grade A • Export Quality', 150.00, 'MT', 38.90, 15.00, 'Karnal Rice Hub, HR', '4 days ago', 'Harpreet Singh', 'HR-KNL-5521', 'Traditional aromatic long-grain paddy with average grain length of 8.35mm. Ideal for aged milling and retail distribution.', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', true, 'Optimal Moisture 11.8%', 'FSSAI-10820005000143', 'available')
ON CONFLICT (id) DO NOTHING;

INSERT INTO orders (id, produce_id, crop_name, quantity_mt, unit_price, total_price, buyer_name, buyer_company, hub, status, tracking_id, escrow_status, temperature_c)
VALUES
('ORD-2026-8812', 'PROD-TOM-01', 'Hybrid Red Tomatoes (Roma)', 12.00, 28.50, 342000.00, 'Rajiv Mehrotra', 'KisanFresh Retailers Ltd.', 'Vashi APMC, Navi Mumbai', 'In Cold Transit', 'APN-TRK-99201', '30% Released upon QC Confirmation', 4.2),
('ORD-2026-8809', 'PROD-ONI-03', 'Pungent Red Onions', 25.00, 32.00, 800000.00, 'Sunil Khurana', 'Apex Agro-Export Consortium', 'JNPT Cold Terminal, Navi Mumbai', 'Assigned to Fleet', 'APN-TRK-98842', 'Secured in Smart Escrow', 14.8)
ON CONFLICT (id) DO NOTHING;

INSERT INTO fleet_vehicles (id, driver_name, phone, vehicle_type, capacity_mt, status, route, current_temp, target_temp, speed_kmh, battery_pct, gps_lat, gps_lng, assigned_order_id)
VALUES
('MH-15-EG-4402', 'Mahesh Jadhav', '+91 98221 44102', 'Reefer Truck (16T Multi-Axle)', 16.00, 'En Route', 'Nashik Hub -> Vashi APMC Terminal', 4.2, 4.0, 58, 88, 19.3142, 73.1205, 'ORD-2026-8812'),
('MH-04-AX-8911', 'Sardar Balwinder Singh', '+91 97112 88231', 'Ventilated Agri Carrier (24T)', 24.00, 'En Route', 'Lasalgaon Mandi -> JNPT Port Terminal', 15.1, 14.0, 52, 94, 19.1028, 73.0112, 'ORD-2026-8809'),
('MH-12-RT-3319', 'Prakash Kale', '+91 94220 19344', 'Solar-Assisted Reefer (8T)', 8.00, 'Loading', 'Hadapsar Aggregation Center, Pune', 3.8, 3.5, 0, 99, 18.5018, 73.9312, NULL),
('MH-31-CB-7720', 'Anil Deshmukh', '+91 98901 66219', 'Heavy Tri-Axle Insulated (30T)', 30.00, 'Available', 'Nagpur Central Logistic Park', 12.0, 10.0, 0, 100, 21.1458, 79.0882, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO audit_logs (id, title, detail, event_type, badge, badge_class)
VALUES
('LOG-001', 'Smart Escrow Funded: ₹3,42,000', 'Buyer KisanFresh Retailers locked payment for Lot #PROD-TOM-01', 'order', 'Escrow Locked', 'bg-tertiary-container/30 text-tertiary'),
('LOG-002', 'QC Grade-A Verified at Lasalgaon Mandi', 'Moisture 13.2%, zero pesticide trace verified by Inspector Deshmukh', 'qc', 'QC Passed', 'bg-secondary-container/40 text-secondary'),
('LOG-003', 'Cold Chain Sensor Sync: Optimal 4.2°C', 'Reefer MH-15-EG-4402 verified along Kasara Ghat corridor', 'iot', 'Optimal', 'bg-secondary-container/40 text-secondary'),
('LOG-004', 'New Harvest Listing #PROD-TOM-01', 'Farmer Ramesh Patil listed 45 MT Roma Tomatoes at ₹28.5/kg', 'produce', 'Verified', 'bg-primary-container/10 text-primary')
ON CONFLICT (id) DO NOTHING;

INSERT INTO regional_telemetry (region_id, region_name, active_volume_mt, transit_vehicles, mandi_count, price_index)
VALUES
('nashik_mh15', 'Nashik Cluster (MH-15)', 1420.00, 38, 12, 'Tomato: ₹28.50/kg | Onion: ₹32.00/kg'),
('mumbai_mh01', 'Mumbai Agro Corridor (MH-01)', 2890.00, 64, 4, 'Export Premium: +8.4% | JNPT Docks active'),
('pune_mh12', 'Pune Hub (MH-12)', 980.00, 26, 8, 'Vegetables: Stable | Sugar Belt Active'),
('nagpur_mh31', 'Nagpur Central Cluster (MH-31)', 1150.00, 31, 6, 'Orange: ₹42.00/kg | Cotton Transit Steady')
ON CONFLICT (region_id) DO NOTHING;
