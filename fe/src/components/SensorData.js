// import React, { useEffect, useState } from 'react';
// import { fetchSensorData } from '../services/sensorService';

// const SensorData = () => {
//   const [sensorData, setSensorData] = useState([]);

//   useEffect(() => {
//     const getSensorData = async () => {
//       try {
//         const data = await fetchSensorData();
//         setSensorData(data);
//       } catch (error) {
//         console.error('Failed to load sensor data:', error);
//       }
//     };

//     getSensorData();
//   }, []);

//   return (
//     <div className="sensor-data">
//       <h1>Sensor Data</h1>
//       <ul>
//         {sensorData.map((sensor, index) => (
//           <li key={index}>
//             <p><strong>Moisture:</strong> {sensor.field1}%</p>
//             <p><strong>Time:</strong> {sensor.created_at}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SensorData;
