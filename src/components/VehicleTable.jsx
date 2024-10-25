const VehicleTable = ({ vehicles, editVehicle, deleteVehicle }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">ID</th>
          <th className="border border-gray-300 p-2">Battery (%)</th>
          <th className="border border-gray-300 p-2">Distance (km)</th>
          <th className="border border-gray-300 p-2">Status</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle, index) => (
          <tr key={index} className={vehicle.battery < 15 ? 'bg-red-100' : ''}>
            <td className="border border-gray-300 p-2">{vehicle.id}</td>
            <td
              className={`border border-gray-300 p-2 ${
                vehicle.battery < 15 ? 'text-red-500 font-bold' : ''
              }`}
            >
              {vehicle.battery}%
            </td>
            <td className="border border-gray-300 p-2">{vehicle.distance} km</td>
            <td className="border border-gray-300 p-2">{vehicle.status}</td>
            <td className="border border-gray-300 p-2">
              <button onClick={() => editVehicle(index)} className="mr-2 text-blue-500">
                Edit
              </button>
              <button onClick={() => deleteVehicle(index)} className="text-red-500">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VehicleTable;
