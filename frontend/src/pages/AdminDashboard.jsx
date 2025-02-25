import { useEffect, useState } from 'react';
import { getDashboardData } from '../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData('admin');
        setData(response);
      } catch (error) {
        toast.error('Failed to fetch admin data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-xl">{data?.message}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
