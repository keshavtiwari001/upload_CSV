import React, { useState } from 'react'
import axios from 'axios'


const CSV = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [records, setRecords] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setMessage('');
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        setUploading(true);
        setMessage('');


        try {
            const response = await axios.post('http://localhost:8000/excelproduct/upload-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response)
            setMessage('File uploaded and processed successfully!');
            setRecords(response.data.records || []);
        } catch (error) {
            setMessage(`Error: ${error.response?.data?.message || 'Something went wrong'}`);
        } finally {
            setUploading(false);
        }
    };

    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://localhost:8000/excelproduct/getCSV');
            setRecords(response.data);
        } catch (error) {
            setMessage('Error fetching records');
        }
    };



    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h1 className="text-2xl font-bold mb-4">CSV Parser and Database Upload</h1>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload CSV File
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
                            />
                            {/* button */}
                            <button
                                onClick={handleUpload}
                                disabled={uploading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md
                         hover:bg-blue-700 disabled:bg-blue-300
                         transition-colors duration-200"
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                        {message && (
                            <p className={`mt-2 text-sm ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'
                                }`}>
                                {message}
                            </p>
                        )}
                    </div>
                    {/* show history  */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Uploaded Records</h2>
                            <button
                                onClick={fetchRecords}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md
                         hover:bg-gray-700 transition-colors duration-200"
                            >
                                Refresh Records
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {records.length > 0 &&
                                            Object.keys(records[0]).map((header) => (
                                                <th
                                                    key={header}
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    {header}
                                                </th>
                                            ))
                                        }
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {records.map((record, index) => (
                                        <tr key={index}>
                                            {Object.values(record).map((value, i) => (
                                                <td
                                                    key={i}
                                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                                >
                                                    {value}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CSV