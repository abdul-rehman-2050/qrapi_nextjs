"use client"

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    bed_number: '',
    heart_rate: '',
    spo2: '',
    temperature: '',
    blood_pressure_upper: '',
    blood_pressure_lower: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/apitest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Vitals submitted successfully');
        //clear the form 
        setFormData({
          bed_number: '',
          heart_rate: '',
          spo2: '',
          temperature: '',
          blood_pressure_upper: '',
          blood_pressure_lower: ''
        });
      } else {
        alert('Error submitting vitals: ' + data.message);
      }
    } catch (error) {
      alert('Error submitting vitals: ' + error.message);
    }
  };


  return (
    <main className="flex min-h-screen  flex-col items-center ">
<h1 className="text-2xl font-bold mb-6">Smart ICU QR Code Scanning</h1>
<div className=" bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Submit Patient Vitals</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {[
              ['bed_number', 'Bed Number'],
              ['heart_rate', 'Heart Rate'],
              ['spo2', 'SPO2'],
              ['temperature', 'Temperature'],
              ['blood_pressure_upper', 'Blood Pressure Upper'],
              ['blood_pressure_lower', 'Blood Pressure Lower']
            ].map(([field, label]) => (
              <div className="mb-4" key={field}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                  {label}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={field}
                  name={field}
                  type="text"
                  placeholder={`Enter ${label}`}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>

            <a
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              href="/view"
            >
              View History
            </a>
          </div>
        </form>
      </div>
    </div>
     
    </main>
  );
}
