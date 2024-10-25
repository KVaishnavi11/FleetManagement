

// import { useState, useEffect } from 'react';
// import VehicleTable from './components/VehicleTable';
// import FleetStats from './components/FleetStats';
// import FleetHealthChart from './components/FleetHealthChart'; // Import the chart component

// const App = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [newVehicle, setNewVehicle] = useState({
//     id: '',
//     battery: 100,
//     distance: 0,
//     status: 'Idle',
//     lastCharge: new Date().toLocaleString(),
//     chargingTime: '',
//   });
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [lowBatteryAlert, setLowBatteryAlert] = useState(false);

//   useEffect(() => {
//     const storedVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
//     setVehicles(storedVehicles);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('vehicles', JSON.stringify(vehicles));
//     checkLowBattery();
//   }, [vehicles]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewVehicle({ ...newVehicle, [name]: value });
//   };

//   const addVehicle = () => {
//     if (!newVehicle.id.trim()) return alert('Enter a valid vehicle ID');
//     setVehicles([...vehicles, { ...newVehicle }]);
//     resetForm();
//   };

//   const updateVehicle = () => {
//     const updatedVehicles = [...vehicles];
//     updatedVehicles[editingIndex] = { ...newVehicle };
//     setVehicles(updatedVehicles);
//     resetForm();
//   };

//   const deleteVehicle = (index) => {
//     const updatedVehicles = vehicles.filter((_, i) => i !== index);
//     setVehicles(updatedVehicles);
//   };

//   const editVehicle = (index) => {
//     setNewVehicle({ ...vehicles[index] });
//     setEditingIndex(index);
//   };

//   const resetForm = () => {
//     setNewVehicle({
//       id: '',
//       battery: 100,
//       distance: 0,
//       status: 'Idle',
//       lastCharge: new Date().toLocaleString(),
//       chargingTime: '',
//     });
//     setEditingIndex(null);
//   };

//   const checkLowBattery = () => {
//     const hasLowBattery = vehicles.some((vehicle) => vehicle.battery < 15);
//     setLowBatteryAlert(hasLowBattery);
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const updatedVehicles = vehicles.map((vehicle) => {
//         let updatedVehicle = { ...vehicle };

//         const currentTime = new Date();
//         const chargingTime = new Date();
//         const [hours, minutes] = vehicle.chargingTime.split(':');
//         chargingTime.setHours(hours);
//         chargingTime.setMinutes(minutes);

//         if (
//           vehicle.chargingTime &&
//           currentTime.getHours() == hours &&
//           currentTime.getMinutes() == minutes
//         ) {
//           updatedVehicle.status = 'Charging';
//           updatedVehicle.battery = Math.min(vehicle.battery + 10, 100);
//           updatedVehicle.lastCharge = new Date().toLocaleString();
//         }

//         if (vehicle.status === 'Transit') {
//           updatedVehicle.distance += 3;
//           updatedVehicle.battery = Math.max(vehicle.battery - 1, 0);
//         } else if (vehicle.status === 'Charging') {
//           updatedVehicle.battery = Math.min(vehicle.battery + 10, 100);
//           updatedVehicle.lastCharge = new Date().toLocaleString();
//         }

//         return updatedVehicle;
//       });

//       setVehicles(updatedVehicles);
//     }, 60000); // Every 60 seconds

//     return () => clearInterval(interval);
//   }, [vehicles]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Fleet Management Dashboard</h1>

//       {lowBatteryAlert && (
//         <div className="bg-red-500 text-white p-4 rounded mb-4 text-center">
//           Alert: One or more vehicles have a low battery (&lt; 15%)!
//         </div>
//       )}

//       {/* ........................................... */}
//       <div className="flex flex-col items-center mb-8">
//         <div className="flex flex-wrap justify-center space-x-4">
//           <input
//             type="text"
//             name="id"
//             value={newVehicle.id}
//             onChange={handleInputChange}
//             placeholder="Vehicle ID"
//             className="border border-gray-300 p-2 rounded"
//           />
//           <input
//             type="number"
//             name="battery"
//             value={newVehicle.battery}
//             onChange={handleInputChange}
//             placeholder="Battery (%)"
//             className="border border-gray-300 p-2 rounded"
//             min="0"
//             max="100"
//           />
//           <input
//             type="number"
//             name="distance"
//             value={newVehicle.distance}
//             onChange={handleInputChange}
//             placeholder="Distance (km)"
//             className="border border-gray-300 p-2 rounded"
//           />
//           <select
//             name="status"
//             value={newVehicle.status}
//             onChange={handleInputChange}
//             className="border border-gray-300 p-2 rounded"
//           >
//             <option value="Idle">Idle</option>
//             <option value="Transit">Transit</option>
//             <option value="Charging">Charging</option>
//           </select>
//           <input
//             type="time"
//             name="chargingTime"
//             value={newVehicle.chargingTime}
//             onChange={handleInputChange}
//             className="border border-gray-300 p-2 rounded"
//           />
//         </div>

//         <button
//           onClick={editingIndex !== null ? updateVehicle : addVehicle}
//           className={`mt-4 px-4 py-2 rounded ${editingIndex !== null ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}
//         >
//           {editingIndex !== null ? 'Update Vehicle' : 'Add Vehicle'}
//         </button>

//         {editingIndex !== null && (
//           <button onClick={resetForm} className="mt-2 text-red-500">
//             Cancel Edit
//           </button>
//         )}
//       </div>

//       <FleetStats vehicles={vehicles} />
//       {/* <FleetHealthChart vehicles={vehicles} /> Add the chart here */}

//       {/* <div className="flex flex-col items-center mb-8">
//         <div className="flex flex-wrap justify-center space-x-4">
//           <input
//             type="text"
//             name="id"
//             value={newVehicle.id}
//             onChange={handleInputChange}
//             placeholder="Vehicle ID"
//             className="border border-gray-300 p-2 rounded"
//           />
//           <input
//             type="number"
//             name="battery"
//             value={newVehicle.battery}
//             onChange={handleInputChange}
//             placeholder="Battery (%)"
//             className="border border-gray-300 p-2 rounded"
//             min="0"
//             max="100"
//           />
//           <input
//             type="number"
//             name="distance"
//             value={newVehicle.distance}
//             onChange={handleInputChange}
//             placeholder="Distance (km)"
//             className="border border-gray-300 p-2 rounded"
//           />
//           <select
//             name="status"
//             value={newVehicle.status}
//             onChange={handleInputChange}
//             className="border border-gray-300 p-2 rounded"
//           >
//             <option value="Idle">Idle</option>
//             <option value="Transit">Transit</option>
//             <option value="Charging">Charging</option>
//           </select>
//           <input
//             type="time"
//             name="chargingTime"
//             value={newVehicle.chargingTime}
//             onChange={handleInputChange}
//             className="border border-gray-300 p-2 rounded"
//           />
//         </div>

//         <button
//           onClick={editingIndex !== null ? updateVehicle : addVehicle}
//           className={`mt-4 px-4 py-2 rounded ${editingIndex !== null ? 'bg-yellow-500' : 'bg-blue-500'} text-white`}
//         >
//           {editingIndex !== null ? 'Update Vehicle' : 'Add Vehicle'}
//         </button>

//         {editingIndex !== null && (
//           <button onClick={resetForm} className="mt-2 text-red-500">
//             Cancel Edit
//           </button>
//         )}
//       </div> */}

//       <VehicleTable vehicles={vehicles} editVehicle={editVehicle} deleteVehicle={deleteVehicle} />
//     </div>
//   );
// };

// export default App;


import { useState, useEffect } from 'react';
import VehicleTable from './components/VehicleTable';
import FleetStats from './components/FleetStats';
import FleetHealthChart from './components/FleetHealthChart';

const App = () => {
  const [vehicles, setVehicles] = useState([]);
  const [newVehicle, setNewVehicle] = useState({
    id: '',
    battery: 100,
    distance: 0,
    status: 'Idle',
    lastCharge: new Date().toLocaleString(),
    chargingTime: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [lowBatteryAlert, setLowBatteryAlert] = useState(false);

  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    setVehicles(storedVehicles);
  }, []);

  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    checkLowBattery();
  }, [vehicles]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVehicle({ ...newVehicle, [name]: value });
  };

  const addVehicle = () => {
    if (!newVehicle.id.trim()) return alert('Enter a valid vehicle ID');
    setVehicles([...vehicles, { ...newVehicle }]);
    resetForm();
  };

  const updateVehicle = () => {
    const updatedVehicles = [...vehicles];
    updatedVehicles[editingIndex] = { ...newVehicle };
    setVehicles(updatedVehicles);
    resetForm();
  };

  const deleteVehicle = (index) => {
    const updatedVehicles = vehicles.filter((_, i) => i !== index);
    setVehicles(updatedVehicles);
  };

  const editVehicle = (index) => {
    setNewVehicle({ ...vehicles[index] });
    setEditingIndex(index);
  };

  const resetForm = () => {
    setNewVehicle({
      id: '',
      battery: 100,
      distance: 0,
      status: 'Idle',
      lastCharge: new Date().toLocaleString(),
      chargingTime: '',
    });
    setEditingIndex(null);
  };

  const checkLowBattery = () => {
    const hasLowBattery = vehicles.some((vehicle) => vehicle.battery < 15);
    setLowBatteryAlert(hasLowBattery);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedVehicles = vehicles.map((vehicle) => {
        let updatedVehicle = { ...vehicle };

        const currentTime = new Date();
        const chargingTime = new Date();
        const [hours, minutes] = vehicle.chargingTime.split(':');
        chargingTime.setHours(hours);
        chargingTime.setMinutes(minutes);

        if (
          vehicle.chargingTime &&
          currentTime.getHours() == hours &&
          currentTime.getMinutes() == minutes
        ) {
          updatedVehicle.status = 'Charging';
          updatedVehicle.battery = Math.min(vehicle.battery + 10, 100);
          updatedVehicle.lastCharge = new Date().toLocaleString();
        }

        if (vehicle.status === 'Transit') {
          updatedVehicle.distance += 3;
          updatedVehicle.battery = Math.max(vehicle.battery - 1, 0);
        } else if (vehicle.status === 'Charging') {
          updatedVehicle.battery = Math.min(vehicle.battery + 10, 100);
          updatedVehicle.lastCharge = new Date().toLocaleString();
        }

        return updatedVehicle;
      });

      setVehicles(updatedVehicles);
    }, 60000); // Every 60 seconds

    return () => clearInterval(interval);
  }, [vehicles]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">
        Fleet Management Dashboard
      </h1>

      {lowBatteryAlert && (
        <div className="bg-red-500 text-white p-4 rounded mb-4 text-center">
          Alert: One or more vehicles have a low battery (&lt; 15%)!
        </div>
      )}

      {/* Form Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <input
            type="text"
            name="id"
            value={newVehicle.id}
            onChange={handleInputChange}
            placeholder="Vehicle ID"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <input
            type="number"
            name="battery"
            value={newVehicle.battery}
            onChange={handleInputChange}
            placeholder="Battery (%)"
            className="border border-gray-300 p-2 rounded w-full"
            min="0"
            max="100"
          />
          <input
            type="number"
            name="distance"
            value={newVehicle.distance}
            onChange={handleInputChange}
            placeholder="Distance (km)"
            className="border border-gray-300 p-2 rounded w-full"
          />
          <select
            name="status"
            value={newVehicle.status}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value="Idle">Idle</option>
            <option value="Transit">Transit</option>
            <option value="Charging">Charging</option>
          </select>
          <input
            type="time"
            name="chargingTime"
            value={newVehicle.chargingTime}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            onClick={editingIndex !== null ? updateVehicle : addVehicle}
            className={`px-4 py-2 rounded ${
              editingIndex !== null ? 'bg-yellow-500' : 'bg-blue-500'
            } text-white`}
          >
            {editingIndex !== null ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
          {editingIndex !== null && (
            <button onClick={resetForm} className="text-red-500">
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      <FleetStats vehicles={vehicles} />
      <VehicleTable vehicles={vehicles} editVehicle={editVehicle} deleteVehicle={deleteVehicle} />
    </div>
  );
};

export default App;