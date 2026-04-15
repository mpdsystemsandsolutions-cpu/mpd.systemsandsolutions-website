let lastData = { sensor_data: "Keine Daten" };
let dataHistory = [];

export default function handler(req, res) {
  // CORS erlauben
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'POST') {
    // Daten vom ESP32 empfangen
    lastData = req.body;
    
    // History speichern (max 100 Einträge)
    dataHistory.push({
      ...req.body,
      timestamp: new Date().toISOString()
    });
    
    if (dataHistory.length > 100) {
      dataHistory.shift();
    }
    
    console.log("Neue Daten vom ESP32:", lastData);
    res.status(200).json({ success: true, message: "Daten empfangen" });
    
  } else if (req.method === 'GET') {
    // Daten zur Website senden
    res.status(200).json(lastData);
  }
}
