import React, { useState } from 'react';

const Trading = () => {
    const [tableData, setTableData] = useState<any[]>([]);
    const [inputData, setInputData] = useState({
        propFirm: '',
        capital: '',
        price: '',
        discount: '',
        netPrice: '',
        code: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedInputData = { ...inputData, [name]: value };

        if (name === 'price' || name === 'discount') {
            const price = parseFloat(updatedInputData.price) || 0;
            const discount = parseFloat(updatedInputData.discount) || 0;
            const netPrice = price - price * (discount / 100);
            updatedInputData = { ...updatedInputData, netPrice: netPrice.toFixed(2) };
        }

        setInputData(updatedInputData);
    };

    const validateInputs = () => {
        return Object.values(inputData).every(value => value.trim() !== '');
    };

    const handleAddOrEditData = () => {
        if (!validateInputs()) {
            alert('Please fill in all required fields.');
            return;
        }

        const updatedData = [...tableData];
        if (editIndex !== null) {
            updatedData[editIndex] = inputData;
            setEditIndex(null);
        } else {
            updatedData.push(inputData);
        }

        setTableData(updatedData);
        closeModal();
    };

    const handleEdit = (index: number) => {
        setInputData(tableData[index]);
        setEditIndex(index);
        setIsModalOpen(true);
    };

    const handleDelete = (index: number) => {
        const updatedData = tableData.filter((_, i) => i !== index);
        setTableData(updatedData);
    };

    const openModal = () => {
        setInputData({
            propFirm: '',
            capital: '',
            price: '',
            discount: '',
            netPrice: '',
            code: '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditIndex(null);
    };

    return (
        <main className="min-h-screen flex flex-col items-center">
            <div className="relative w-full md:block hidden">
                <div
                    id="trading"
                    className="mt-28 p-4 max-w-7xl mx-auto relative z-0 w-full pt-10 md:pt-4 bottom-0 space-y-4 h-[40rem] rounded-md overflow-hidden"
                >
                    <h2 className="text-2xl font-bold">Trading</h2>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={openModal}
                            className="p-2 bg-blue-500 text-white rounded"
                        >
                            Add Data
                        </button>
                    </div>

                    <table className="mt-4 w-full border-collapse border border-gray-300 align-middle">
                        <thead>
                            <tr>
                                <th className="border p-2">#</th>
                                <th className="border p-2">Prop Firm</th>
                                <th className="border p-2">Capital</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Discount</th>
                                <th className="border p-2">Net Price (USD)</th>
                                <th className="border p-2">Code</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle text-center">
                            {tableData.map((row, index) => (
                                <tr key={index}>
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{row.propFirm}</td>
                                    <td className="border p-2">{row.capital}</td>
                                    <td className="border p-2">{row.price}</td>
                                    <td className="border p-2">{row.discount}</td>
                                    <td className="border p-2">{row.netPrice}</td>
                                    <td className="border p-2">{row.code}</td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="text-blue-500 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-md w-96">
                        <h2 className="text-lg font-semibold mb-4">
                            {editIndex !== null ? 'Update Data' : 'Add Data'}
                        </h2>
                        <div>
                            <input
                                type="text"
                                name="propFirm"
                                placeholder="Prop Firm"
                                value={inputData.propFirm}
                                onChange={handleChange}
                                className="border p-2 w-full mb-2 rounded text-black"
                                required
                            />
                            <input
                                type="text"
                                name="capital"
                                placeholder="Capital"
                                value={inputData.capital}
                                onChange={handleChange}
                                className="border p-2 w-full mb-2 rounded text-black"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={inputData.price}
                                onChange={handleChange}
                                className="border p-2 w-full mb-2 rounded text-black"
                                required
                            />
                            <input
                                type="number"
                                name="discount"
                                placeholder="Discount (%)"
                                value={inputData.discount}
                                onChange={handleChange}
                                className="border p-2 w-full mb-2 rounded text-black"
                                required
                            />
                            <input
                                type="text"
                                name="code"
                                placeholder="Code"
                                value={inputData.code}
                                onChange={handleChange}
                                className="border p-2 w-full mb-4 rounded text-black"
                                required
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleAddOrEditData}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    {editIndex !== null ? 'Update' : 'Add'}
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Trading;
