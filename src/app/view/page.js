"use client"
import { useState } from 'react';

export default function Vitals() {
  const [vitals, setVitals] = useState([]);
  const [summary, setSummary] = useState({});
  const [fetched, setFetched] = useState(false);

  const fetchVitals = async () => {
    try {
      const response = await fetch('/apitest/vitals');
      const data = await response.json();
      const latestVitals = getLatestVitals(data);
      setVitals(latestVitals);
      calculateSummary(latestVitals);
      setFetched(true);
    } catch (error) {
      console.error('Error fetching vitals:', error);
    }
  };

  const getLatestVitals = (data) => {
    const latest = data.reduce((acc, current) => {
      const { bed_number, created_at } = current;
      if (!acc[bed_number] || new Date(acc[bed_number].created_at) < new Date(created_at)) {
        acc[bed_number] = current;
      }
      return acc;
    }, {});
    return Object.values(latest);
  };

  const calculateSummary = (data) => {
    const summary = {
      total: data.length,
      uniqueBeds: new Set(data.map(vital => vital.bed_number)).size,
      avgHeartRate: (data.reduce((acc, val) => acc + val.heart_rate, 0) / data.length).toFixed(2),
      avgSPO2: (data.reduce((acc, val) => acc + val.spo2, 0) / data.length).toFixed(2),
      avgTemperature: (data.reduce((acc, val) => acc + val.temperature, 0) / data.length).toFixed(2),
    };
    setSummary(summary);
  };

  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Patient Vitals</h1>
        <button
          onClick={fetchVitals}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6"
        >
          Fetch Vitals
        </button>
        {fetched && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-blue-500 text-white p-4 rounded shadow">
                <h2 className="text-lg font-bold">Total Patients</h2>
                <p className="text-2xl">{summary.total}</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded shadow">
                <h2 className="text-lg font-bold">Unique Beds</h2>
                <p className="text-2xl">{summary.uniqueBeds}</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded shadow">
                <h2 className="text-lg font-bold">Avg Heart Rate</h2>
                <p className="text-2xl">{summary.avgHeartRate}</p>
              </div>
              <div className="bg-yellow-500 text-white p-4 rounded shadow">
                <h2 className="text-lg font-bold">Avg SPO2</h2>
                <p className="text-2xl">{summary.avgSPO2}</p>
              </div>
              <div className="bg-red-500 text-white p-4 rounded shadow">
                <h2 className="text-lg font-bold">Avg Temperature</h2>
                <p className="text-2xl">{summary.avgTemperature}</p>
              </div>
            </div>
            <div className="bg-white shadow-md rounded p-6">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    {['Bed Number', 'Heart Rate', 'SPO2', 'Temperature', 'Blood Pressure Upper', 'Blood Pressure Lower'].map((heading) => (
                      <th key={heading} className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(vitals) && vitals.length > 0 ? (
                    vitals.map((vital, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b border-gray-200">{vital.bed_number}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{vital.heart_rate}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{vital.spo2}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{vital.temperature}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{vital.blood_pressure_upper}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{vital.blood_pressure_lower}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-2 px-4 border-b border-gray-200 text-center">No vitals data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
