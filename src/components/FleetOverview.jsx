const FleetOverview = ({ vehicles }) => {
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
  
    return (
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Fleet Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-gray-300 rounded">
            <p className="font-semibold">Total Vehicles:</p>
            <p>{totalVehicles}</p>
          </div>
          <div className="p-4 border border-gray-300 rounded">
            <p className="font-semibold">In Transit:</p>
            <p>{inTransit}</p>
          </div>
          <div className="p-4 border border-gray-300 rounded">
            <p className="font-semibold">Charging:</p>
            <p>{charging}</p>
          </div>
          <div className="p-4 border border-gray-300 rounded">
            <p className="font-semibold">Idle:</p>
            <p>{idle}</p>
          </div>
          <div className="p-4 border border-gray-300 rounded">
            <p className="font-semibold">Average Battery (%):</p>
            <p>{averageBattery.toFixed(2)}</p>
          </div>
          <div className="p-4 border border-gray-300 rounded">
            <p className="font-semibold">Vehicles with Low Battery:</p>
            <p>{lowBatteryCount}</p>
          </div>
          <div className="p-4 border border-gray-300 rounded">
            <p className="font-semibold">Estimated Full Charge Time (mins):</p>
            <p>{estimatedChargeTime}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default FleetOverview;
  