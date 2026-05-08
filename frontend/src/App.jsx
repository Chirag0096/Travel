import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import { Plane, Wallet, Leaf, Zap, CloudLightning, RefreshCw, Activity, MapPin } from 'lucide-react';

const initialItinerary = [
  { id: 1, title: "Morning Hike at Mount Takao", cost: 15, type: "Activity", description: "Beautiful outdoor hike with clear skies expected.", vibe_tags: ["outdoor", "nature", "active"], status: "normal" },
  { id: 2, title: "Sushi Lunch in Shinjuku", cost: 45, type: "Food", description: "Authentic local cuisine at a highly rated hidden gem.", vibe_tags: ["food", "cultural", "relaxed"], status: "normal" },
  { id: 3, title: "Evening walk through Shibuya", cost: 0, type: "Activity", description: "Experiencing the fast-paced city life and neon lights.", vibe_tags: ["city", "nightlife", "fast-paced"], status: "normal" }
];

const vibeData = [
  { subject: 'Nature', A: 80, fullMark: 100 },
  { subject: 'Culture', A: 90, fullMark: 100 },
  { subject: 'Food', A: 85, fullMark: 100 },
  { subject: 'Nightlife', A: 70, fullMark: 100 },
  { subject: 'Relaxation', A: 60, fullMark: 100 },
];

function App() {
  const [itinerary, setItinerary] = useState(initialItinerary);
  const [crowdData, setCrowdData] = useState([]);
  const [isStorming, setIsStorming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); 

  const [form, setForm] = useState({
    destination: 'Tokyo, Japan',
    budget: '500',
    pace: 'Moderate'
  });

  useEffect(() => {
    fetchCrowdPrediction();
  }, [form.destination]);

  const fetchCrowdPrediction = async () => {
    try {
      const res = await fetch('/api/v1/predict-crowd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: form.destination })
      });
      const data = await res.json();
      if(data.time_series) setCrowdData(data.time_series);
    } catch (err) {
      console.error("Failed to fetch ML data", err);
    }
  };

  const triggerChaosEngine = async () => {
    setIsStorming(true);
    setLoading(true);
    setStatus({ type: 'danger', msg: "⚠️ Severe Weather Alert: Heavy rain detected. Rerouting..." });
    
    setItinerary(prev => prev.map(e => e.id === 1 ? { ...e, status: "disrupted" } : e));

    try {
      const res = await fetch('/api/v1/recalculate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: itinerary, disruption_type: "rain" })
      });
      const newItinerary = await res.json();
      
      setTimeout(() => {
        setItinerary(newItinerary);
        setStatus({ type: 'success', msg: "✅ Itinerary Successfully Rerouted via Backend ML constraints." });
        setLoading(false);
      }, 1500); 
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const triggerSpatialOptimization = async () => {
    setLoading(true);
    setStatus({ type: 'success', msg: "🗺️ Spatial Engine: Calculating shortest Transit Distance (TSP algorithm)..." });
    
    try {
      const res = await fetch('/api/v1/optimize-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events: itinerary, disruption_type: "spatial" })
      });
      const optimizedItinerary = await res.json();
      
      setTimeout(() => {
        setItinerary(optimizedItinerary);
        setStatus({ type: 'success', msg: "📍 Route Optimized! Events re-ordered to minimize travel time." });
        setLoading(false);
      }, 1200); 
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const resetTrip = () => {
    setItinerary(initialItinerary);
    setIsStorming(false);
    setStatus(null);
  };

  const totalCost = itinerary.reduce((acc, curr) => acc + curr.cost, 0) + 20;
  
  const activitiesCost = itinerary.filter(e => e.type === "Activity").reduce((sum, e) => sum + e.cost, 0);
  const foodCost = itinerary.filter(e => e.type === "Food" || e.type === "Culture").reduce((sum, e) => sum + e.cost, 0);
  const budgetData = [
    { name: 'Activities', cost: activitiesCost },
    { name: 'Food/Culture', cost: foodCost },
    { name: 'Transit', cost: 20 },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 className="title">Aura Engine</h2>
        <p className="subtitle">Context-Aware Travel Planner</p>

        <div className="form-group">
          <label>Destination</label>
          <input type="text" className="form-control" value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} />
        </div>
        
        <div className="form-group">
          <label>Daily Budget ($)</label>
          <input type="number" className="form-control" value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} />
        </div>

        <div className="form-group">
          <label>Trip Pace</label>
          <select className="form-control" value={form.pace} onChange={e => setForm({...form, pace: e.target.value})}>
            <option>Relaxed</option>
            <option>Moderate</option>
            <option>Fast-Paced</option>
          </select>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn" onClick={triggerSpatialOptimization} disabled={loading} style={{ background: 'var(--accent)', color: '#0B0F19' }}>
            <MapPin size={20} /> Optimize Route Mapping
          </button>

          {!isStorming ? (
            <button className="btn" onClick={triggerChaosEngine} disabled={loading} style={{ background: 'var(--danger)' }}>
              <CloudLightning size={20} /> Inject Chaos (Rain)
            </button>
          ) : (
            <button className="btn" onClick={resetTrip} disabled={loading}>
              <RefreshCw size={20} /> Reset Simulation
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div className="analytics-grid" style={{ marginBottom: 0 }}>
          <div className="stat-card">
            <div className="stat-icon"><Wallet size={24} /></div>
            <div className="stat-info">
              <h4>Total Cost</h4>
              <p>${totalCost}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Zap size={24} /></div>
            <div className="stat-info">
              <h4>Vibe Match</h4>
              <p>94%</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Leaf size={24} /></div>
            <div className="stat-info">
              <h4>Eco Score</h4>
              <p>A+</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="charts-container" style={{ gridTemplateColumns: '1fr', marginBottom: 0 }}>
          <div className="chart-box">
            <div className="chart-title" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Activity size={18} color="var(--primary)"/> ML Time-Series: Predictive Crowd Density
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={crowdData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} />
                <YAxis stroke="#94A3B8" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Legend />
                <Line type="monotone" name="Predicted Density (%)" dataKey="predicted_crowd_density" stroke="#34D399" strokeWidth={3} dot={false} />
                <Line type="monotone" name="Historical Avg" dataKey="historical_average" stroke="#818CF8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="charts-container" style={{ marginBottom: 0 }}>
          <div className="chart-box">
            <div className="chart-title">Dynamic Budget Allocation</div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={budgetData}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="cost" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-box">
            <div className="chart-title">Vibe Radar Analysis</div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={vibeData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#94A3B8" fontSize={12} />
                <Radar name="Trip Match" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: 'none', borderRadius: '8px', color: '#fff' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Alert */}
        {status && (
          <div className={`alert-box alert-${status.type}`} style={{ marginBottom: 0 }}>
            {status.msg}
          </div>
        )}

        {/* Dynamic Timeline */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ margin: '0 0 2rem 0', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plane size={24} color="var(--primary)" /> Live Itinerary Timeline
          </h3>
          
          <div className="timeline">
            {itinerary.map((evt) => (
              <div key={evt.id} className={`timeline-item ${evt.status}`}>
                <div className="timeline-dot"></div>
                <div className="item-header">
                  <h4 className="item-title">{evt.title}</h4>
                  <span className="item-cost">${evt.cost}</span>
                </div>
                <p className="item-desc">{evt.description}</p>
                <div className="badges">
                  {evt.vibe_tags.map(tag => (
                    <span key={tag} className="badge">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
