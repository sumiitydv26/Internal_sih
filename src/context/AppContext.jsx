import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const INITIAL_PRODUCE = [
  {
    id: "PROD-TOM-01",
    name: "Hybrid Red Tomatoes (Roma)",
    variety: "Roma Special",
    category: "vegetables",
    grade: "Grade A • Export Quality",
    availableVolume: 45, // in MT
    unit: "MT",
    pricePerKg: 28.50,
    minOrder: 5,
    hub: "Nashik FPO Hub, MH",
    harvestDate: "18 hours ago",
    farmerName: "Ramesh Patil",
    fpoId: "MH-NSK-8842",
    description: "Cold chain verified storage with consistent firmness, vibrant color, and uniform sizing. Directly harvested from progressive cooperative clusters.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiFG_m2K9IX76vsUFmvNe5Ff1IvlYHHKbpxRyZbyW8c4VzlBk6spcGzTKb1N5W77MYwvolfzh8ZSwW9dkHCHMPNwzNsD4nHezDNVJuH7tP3rMclLiHR96NuUBDpPhsw76ZbaG0VMU47Xm_3k3PFMNLKiYt2sYimHUU9A32Axm6B60hBeI-3T8smbAB6ikspHVxOncxd1wyO38_iJ_E7YbVw_n7PzTNBwX_-C_s1JwjJ7tm1Pp3ZDgi",
    verified: true,
    soilTested: "Optimal (N: 240, P: 38, K: 190)",
    fssaiLicense: "FSSAI-11522036000412"
  },
  {
    id: "PROD-POT-02",
    name: "Premium Table Potatoes",
    variety: "Jyoti Variety",
    category: "vegetables",
    grade: "Grade A • Jyoti Variety",
    availableVolume: 120,
    unit: "MT",
    pricePerKg: 18.00,
    minOrder: 20,
    hub: "Agra Cold Storage, UP",
    harvestDate: "3 days ago",
    farmerName: "Baldev Yadav",
    fpoId: "UP-AGR-4011",
    description: "Low sugar content, uniform large tubers, ideal for chipping and direct retail packaging. Cleanly excavated and cured.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZklK8ciAh9y5zGm-3lNQPdeebIZcYqxLnX1CoU9xSU0p8de4VVinen9X3B7TJZiIR3MjdF5bGxSDu3A5BMqgPySzQTGgbJZqT9HqcObeYZUoVXUkQ2gjb3apTrOkrffQKv683Obzzb2OQd9F74R1mQGYZ5PU9M4Yi6_OtNS9YHkHvEJdhYqWFi-tmwNOwpnTKXKB7A1aPPkjQ5y5GvU3AXFEE3QEW5YQZF95fm56Skq9xlgxkrjC1",
    verified: true,
    soilTested: "Certified Alluvial pH 6.8",
    fssaiLicense: "FSSAI-10419012000889"
  },
  {
    id: "PROD-ONI-03",
    name: "Pungent Red Onions",
    variety: "Puneri Red",
    category: "vegetables",
    grade: "Grade A • Puneri Red",
    availableVolume: 85,
    unit: "MT",
    pricePerKg: 32.00,
    minOrder: 10,
    hub: "Lasalgaon Mandi Hub, MH",
    harvestDate: "2 days ago",
    farmerName: "Ganesh Shinde",
    fpoId: "MH-LSG-9032",
    description: "Well-cured medium to large bulbs with high shelf life and crisp layers. Rigorously sorted for export standards and long-distance transit.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiOua6vDhlIloVoMFKLu3n9RxY9uGZZHxx-RK5Y8nnkFhQpIsj_ctY8vZ9stjr7Hp-BEI_qqd6G6AdZDbN-8wU5oqyJaUp2BiNgVv1ugkHuvosreHwrksbpywBSGKijP32seklcWG8uPZjEe-9zcs91075XODGrj7G-pcTvntR38LrfcZ146wlR83fKQq30w42Zwze0TuaeBX-e4W5K1AsNj00gUk2GaFj1_ruh5yAu85eWq-tBiqo",
    verified: true,
    soilTested: "High Potassium Black Clay",
    fssaiLicense: "FSSAI-11520021000334"
  },
  {
    id: "PROD-WHT-04",
    name: "Sharbati Organic Wheat",
    variety: "C-306 Golden",
    category: "grains",
    grade: "Grade A • Certified Organic",
    availableVolume: 210,
    unit: "MT",
    pricePerKg: 24.50,
    minOrder: 15,
    hub: "Sehore Grain Terminal, MP",
    harvestDate: "Last week",
    farmerName: "Digvijay Singh",
    fpoId: "MP-SEH-1102",
    description: "Naturally sweet Sharbati grains harvested from the fertile black soil of Sehore. High gluten strength and rich golden luster.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    verified: true,
    soilTested: "100% Pesticide Residue Free",
    fssaiLicense: "FSSAI-11421045000219"
  },
  {
    id: "PROD-RIC-05",
    name: "Basmati Paddy 1121",
    variety: "1121 Extra Long Grain",
    category: "grains",
    grade: "Grade A • Export Quality",
    availableVolume: 150,
    unit: "MT",
    pricePerKg: 38.90,
    minOrder: 15,
    hub: "Karnal Rice Hub, HR",
    harvestDate: "4 days ago",
    farmerName: "Harpreet Singh",
    fpoId: "HR-KNL-5521",
    description: "Aromatic extra-long grain basmati paddy dried to 12% optimal moisture content. Ready for custom milling and packing.",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    verified: true,
    soilTested: "Indo-Gangetic Silt Verified",
    fssaiLicense: "FSSAI-10820019000142"
  },
  {
    id: "PROD-ORG-06",
    name: "Nagpur Mandarin Oranges",
    variety: "Nagpur Seedless",
    category: "fruits",
    grade: "Grade A • Export Grade",
    availableVolume: 35,
    unit: "MT",
    pricePerKg: 45.00,
    minOrder: 3,
    hub: "Nagpur Agro Cluster, MH",
    harvestDate: "Yesterday",
    farmerName: "Prakash Deshmukh",
    fpoId: "MH-NGP-7712",
    description: "Sun-ripened, juicy Nagpur oranges picked at peak brix level. Waxed and pre-cooled for maximum freshness during refrigerated transit.",
    image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80",
    verified: true,
    soilTested: "Organic Compost Enriched",
    fssaiLicense: "FSSAI-11521098000551"
  }
];

const INITIAL_FLEET = [
  {
    id: "VEH-01",
    regNo: "MH-15-TC-7721",
    driverName: "Sanjay Gaikwad",
    phone: "+91 98210 44219",
    category: "Four-Wheeler - 1.5 Tons",
    typeCode: "4w",
    capacityTons: 1.8,
    status: "Verified",
    cluster: "Nashik Cluster (MH-15)",
    assignedCorridor: "Nashik - Mumbai Express",
    lat: 19.9975,
    lng: 73.7898,
    documents: { rc: true, insurance: true, fitness: true, dl: true },
    lastInspection: "2026-08-28",
    rating: 4.9,
    currentLoad: "Tomato (Grade A) 1.5 MT"
  },
  {
    id: "VEH-02",
    regNo: "MH-15-EG-3890",
    driverName: "Rajendra More",
    phone: "+91 97652 11094",
    category: "Three-Wheeler - 500kg",
    typeCode: "3w",
    capacityTons: 0.6,
    status: "Verified",
    cluster: "Nashik Cluster (MH-15)",
    assignedCorridor: "Dindori Village Aggregation",
    lat: 20.0125,
    lng: 73.8123,
    documents: { rc: true, insurance: true, fitness: true, dl: true },
    lastInspection: "2026-08-25",
    rating: 4.8,
    currentLoad: "Available for Village Pickup"
  },
  {
    id: "VEH-03",
    regNo: "MH-12-QB-9104",
    driverName: "Tukaram Jadhav",
    phone: "+91 94231 88402",
    category: "Multi-Wheeler - 8+ Tons",
    typeCode: "multi",
    capacityTons: 12.0,
    status: "Pending Verification",
    cluster: "Pune Hub (MH-12)",
    assignedCorridor: "Pune - Nagpur Corridor",
    lat: 18.5204,
    lng: 73.8567,
    documents: { rc: true, insurance: true, fitness: false, dl: true },
    lastInspection: "Awaiting State Fitness Slip",
    rating: 4.5,
    currentLoad: "Queueing at Vashi Terminal"
  },
  {
    id: "VEH-04",
    regNo: "MH-01-RF-4412",
    driverName: "Gurinder Singh",
    phone: "+91 98112 33400",
    category: "Cold-Chain Reefer (Temperature Controlled)",
    typeCode: "reefer",
    capacityTons: 8.5,
    status: "Verified",
    cluster: "Mumbai Agro Corridor (MH-01)",
    assignedCorridor: "Nashik - Mumbai Port Cold Corridor",
    lat: 19.2183,
    lng: 72.9781,
    documents: { rc: true, insurance: true, fitness: true, dl: true },
    lastInspection: "2026-09-01",
    rating: 5.0,
    currentLoad: "Nagpur Oranges (4°C Controlled)"
  },
  {
    id: "VEH-05",
    regNo: "MH-31-TR-1088",
    driverName: "Ashokrao Kadam",
    phone: "+91 94033 71209",
    category: "Four-Wheeler - 1.5 Tons",
    typeCode: "4w",
    capacityTons: 2.0,
    status: "Suspended",
    cluster: "Nagpur Central (MH-31)",
    assignedCorridor: "Nagpur Mandi Loop",
    lat: 21.1458,
    lng: 79.0882,
    documents: { rc: true, insurance: false, fitness: false, dl: true },
    lastInspection: "Insurance Expired (Flagged)",
    rating: 3.8,
    currentLoad: "Grounded / Inactive"
  }
];

const INITIAL_ORDERS = [
  {
    id: "ORD-2026-8812",
    cropName: "Hybrid Red Tomatoes (Roma)",
    variety: "Roma Special",
    volumeMT: 10,
    pricePerKg: 28.50,
    totalValue: 285000,
    buyerName: "FreshBasket Retail Ltd",
    buyerLocation: "Mumbai APMC Yard",
    farmerName: "Ramesh Patil",
    fpoId: "MH-NSK-8842",
    status: "In Transit",
    vehicleReg: "MH-15-TC-7721",
    driverName: "Sanjay Gaikwad",
    orderedAt: "Today, 06:30 AM",
    estimatedArrival: "Today, 03:45 PM",
    trackingId: "APN-TRK-77210",
    escrowStatus: "Secured in Smart Escrow",
    temperatureC: 11.2,
    humidityPercent: 84
  },
  {
    id: "ORD-2026-8790",
    cropName: "Pungent Red Onions",
    variety: "Puneri Red",
    volumeMT: 15,
    pricePerKg: 32.00,
    totalValue: 480000,
    buyerName: "Sahyadri Mega Marts",
    buyerLocation: "Pune Hadapsar Hub",
    farmerName: "Ganesh Shinde",
    fpoId: "MH-LSG-9032",
    status: "Assigned to Fleet",
    vehicleReg: "MH-12-QB-9104",
    driverName: "Tukaram Jadhav",
    orderedAt: "Yesterday, 04:15 PM",
    estimatedArrival: "Tomorrow, 08:00 AM",
    trackingId: "APN-TRK-91040",
    escrowStatus: "Secured in Smart Escrow",
    temperatureC: 19.5,
    humidityPercent: 62
  },
  {
    id: "ORD-2026-8765",
    cropName: "Premium Table Potatoes",
    variety: "Jyoti Variety",
    volumeMT: 25,
    pricePerKg: 18.00,
    totalValue: 450000,
    buyerName: "Haldiram Snacks Logistics",
    buyerLocation: "Nagpur Processing Plant",
    farmerName: "Baldev Yadav",
    fpoId: "UP-AGR-4011",
    status: "Delivered & Settled",
    vehicleReg: "MH-01-RF-4412",
    driverName: "Gurinder Singh",
    orderedAt: "2 days ago",
    estimatedArrival: "Completed",
    trackingId: "APN-TRK-44120",
    escrowStatus: "Disbursed to FPO Account",
    temperatureC: 8.4,
    humidityPercent: 78
  }
];

const INITIAL_AUDIT_LOGS = [
  {
    id: "LOG-101",
    time: "2 mins ago",
    title: "Vehicle Dispatch #MH-15-TC-7721",
    detail: "Nashik Center → Mumbai Mandi · 4.8 tonnes produce",
    type: "transit",
    badge: "In Transit",
    badgeClass: "bg-secondary-container/30 text-secondary"
  },
  {
    id: "LOG-102",
    time: "14 mins ago",
    title: "Bulk Harvest Listing #HL-9921",
    detail: "FPO Nashik North · 1,200 kg Grade A Tomato added",
    type: "produce",
    badge: "Verified",
    badgeClass: "bg-primary-container/10 text-primary"
  },
  {
    id: "LOG-103",
    time: "38 mins ago",
    title: "Settlement Transfer #TX-8812",
    detail: "Pune Retail Coop · ₹1,48,200 Credited via Escrow",
    type: "payment",
    badge: "Completed",
    badgeClass: "bg-tertiary-container/10 text-tertiary"
  },
  {
    id: "LOG-104",
    time: "1 hour ago",
    title: "Cold-Chain Telemetry Alert",
    detail: "Reefer Reefer-04 recorded optimal 4.2°C at Kasara Ghat",
    type: "iot",
    badge: "Optimal",
    badgeClass: "bg-secondary-container/40 text-secondary"
  }
];

export function AppProvider({ children }) {
  // Active view & role state
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('annapurna_view') || 'landing';
  });

  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem('annapurna_role') || 'farmer';
  });

  const [activeCluster, setActiveCluster] = useState("Nashik Cluster (MH-15)");

  // Dynamic entities
  const [produceList, setProduceList] = useState(() => {
    const saved = localStorage.getItem('annapurna_produce');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCE;
  });

  const [fleetList, setFleetList] = useState(() => {
    const saved = localStorage.getItem('annapurna_fleet');
    return saved ? JSON.parse(saved) : INITIAL_FLEET;
  });

  const [orderList, setOrderList] = useState(() => {
    const saved = localStorage.getItem('annapurna_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('annapurna_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  // Active Traceability Modal State
  const [inspectingBatch, setInspectingBatch] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('annapurna_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('annapurna_role', activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem('annapurna_produce', JSON.stringify(produceList));
  }, [produceList]);

  useEffect(() => {
    localStorage.setItem('annapurna_fleet', JSON.stringify(fleetList));
  }, [fleetList]);

  useEffect(() => {
    localStorage.setItem('annapurna_orders', JSON.stringify(orderList));
  }, [orderList]);

  useEffect(() => {
    localStorage.setItem('annapurna_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Navigate helper
  const navigateTo = (view, role = null) => {
    if (role) setActiveRole(role);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Farmer actions
  const addProduce = (newCrop) => {
    const item = {
      ...newCrop,
      id: `PROD-${Date.now().toString().slice(-4)}`,
      verified: true,
      farmerName: "Ramesh Patil",
      fpoId: "MH-NSK-8842",
      hub: "Nashik FPO Hub, MH",
      harvestDate: "Just now",
      image: newCrop.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
    };

    setProduceList(prev => [item, ...prev]);

    // Push audit log
    const log = {
      id: `LOG-${Date.now()}`,
      time: "Just now",
      title: `New Harvest Listing #${item.id}`,
      detail: `Farmer Ramesh Patil listed ${item.availableVolume} MT of ${item.name} at ₹${item.pricePerKg}/kg`,
      type: "produce",
      badge: "Verified",
      badgeClass: "bg-primary-container/10 text-primary"
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  // Buyer actions
  const placeBulkOrder = (orderData) => {
    const newOrder = {
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      ...orderData,
      orderedAt: "Just now",
      status: "Assigned to Fleet",
      trackingId: `APN-TRK-${Math.floor(10000 + Math.random() * 90000)}`,
      escrowStatus: "Secured in Smart Escrow",
      temperatureC: 12.0,
      humidityPercent: 80,
      driverName: "Assigned Logistics Unit",
      vehicleReg: "MH-15-TC-7721"
    };

    setOrderList(prev => [newOrder, ...prev]);

    // Decrement produce volume
    setProduceList(prev => prev.map(p => {
      if (p.id === orderData.produceId) {
        const remaining = Math.max(0, p.availableVolume - orderData.volumeMT);
        return { ...p, availableVolume: remaining };
      }
      return p;
    }));

    // Push audit log
    const log = {
      id: `LOG-${Date.now()}`,
      time: "Just now",
      title: `New Bulk Order #${newOrder.id}`,
      detail: `${orderData.buyerName} purchased ${orderData.volumeMT} MT ${orderData.cropName} (₹${orderData.totalValue.toLocaleString('en-IN')})`,
      type: "order",
      badge: "Escrow Locked",
      badgeClass: "bg-secondary-container/40 text-secondary"
    };
    setAuditLogs(prev => [log, ...prev]);

    return newOrder;
  };

  // Fleet actions
  const updateVehicleStatus = (vehicleId, newStatus) => {
    setFleetList(prev => prev.map(v => {
      if (v.id === vehicleId) {
        return {
          ...v,
          status: newStatus,
          documents: {
            ...v.documents,
            fitness: newStatus === "Verified" ? true : v.documents.fitness
          }
        };
      }
      return v;
    }));

    const log = {
      id: `LOG-${Date.now()}`,
      time: "Just now",
      title: `Fleet Compliance Updated`,
      detail: `Vehicle ID ${vehicleId} updated to status: ${newStatus}`,
      type: "fleet",
      badge: newStatus,
      badgeClass: newStatus === "Verified" ? "bg-secondary-container/40 text-secondary" : "bg-error-container text-error"
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  // Reset to demo data
  const resetDemoData = () => {
    setProduceList(INITIAL_PRODUCE);
    setFleetList(INITIAL_FLEET);
    setOrderList(INITIAL_ORDERS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    localStorage.removeItem('annapurna_produce');
    localStorage.removeItem('annapurna_fleet');
    localStorage.removeItem('annapurna_orders');
    localStorage.removeItem('annapurna_audit');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        navigateTo,
        activeRole,
        setActiveRole,
        activeCluster,
        setActiveCluster,
        produceList,
        addProduce,
        fleetList,
        updateVehicleStatus,
        orderList,
        placeBulkOrder,
        auditLogs,
        inspectingBatch,
        setInspectingBatch,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
