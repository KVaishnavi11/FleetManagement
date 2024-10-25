// components/FleetStats.jsx
import React from 'react';
import FleetHealthChart from '../components/FleetHealthChart'

const FleetStats = ({ vehicles }) => {
  const totalVehicles = vehicles.length;
  const inTransit = vehicles.filter(v => v.status === 'Transit').length;
  const charging = vehicles.filter(v => v.status === 'Charging').length;
  const idle = vehicles.filter(v => v.status === 'Idle').length;

  const averageBattery = vehicles.reduce((total, vehicle) => total + vehicle.battery, 0) / (totalVehicles || 1);
  const lowBatteryCount = vehicles.filter(v => v.battery < 20).length;

  const chargingVehicles = vehicles.filter(v => v.status === 'Charging');
  const estimatedChargeTime = chargingVehicles.length > 0 
    ? chargingVehicles.reduce((total, vehicle) => total + (100 - vehicle.battery) / 10 * 60, 0) 
    : 0; // Each vehicle takes 10 minutes to charge 10%

  const totalDistanceTravelled = vehicles.reduce((total, vehicle) => total + vehicle.distance, 0);
  const fuelSavingsEstimate = totalDistanceTravelled * 0.5; // Example metric: 0.5 unit of fuel saved per km

  return (
    <div className="bg-white p-6 rounded shadow-lg mb-8">
      <h2 className="text-xl font-bold mb-4 text-center">Fleet Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border border-gray-300 rounded">
          <p className="font-semibold">Total Vehicles:</p>
          <p>{totalVehicles}</p>
          <p className="font-semibold">In Transit:</p>
          <p>{inTransit}</p>
          <p className="font-semibold">Charging:</p>
          <p>{charging}</p>
          <p className="font-semibold">Idle:</p>
          <p>{idle}</p>
          <p className="font-semibold">Average Battery (%):</p>
          <p>{averageBattery.toFixed(2)}</p>
          <p className="font-semibold">Vehicles with Low Battery:</p>
          <p>{lowBatteryCount}</p>
          <p className="font-semibold">Estimated Full Charge Time (mins):</p>
          <p>{estimatedChargeTime}</p>
          <p className="font-semibold">Total Distance Travelled (km):</p>
          <p>{totalDistanceTravelled}</p>
          <p className="font-semibold">Estimated Fuel Savings:</p>
          <p>{fuelSavingsEstimate.toFixed(2)} units</p>
        </div>
        <div className='p-4 border border-gray-300 rounded'>
        <FleetHealthChart vehicles={vehicles} />
        </div>
      </div>
    </div>
  );
};

export default FleetStats;
