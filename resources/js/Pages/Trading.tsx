import { router, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TableData {
    id?: number;
    propfirm: string;
    capital: string;
    price: string;
    discount: string;
    net_price: string;
    code: string;
}

const Trading = () => {
    const { props } = usePage();
    const [tableData, setTableData] = useState<TableData[]>(props.tradingData || []);
    const [inputData, setInputData] = useState<TableData>({
        propfirm: '',
        capital: '',
        price: '',
        discount: '',
        net_price: '',
        code: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setTableData(props.tradingData || []);
    }, [props.tradingData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let updatedInputData = { ...inputData, [name]: value };

        if (name === 'price' || name === 'discount') {
            const price = parseFloat(updatedInputData.price) || 0;
            const discount = parseFloat(updatedInputData.discount) || 0;
            const netPrice = price - price * (discount / 100);
            updatedInputData = { ...updatedInputData, net_price: netPrice.toFixed(2) };
        }

        setInputData(updatedInputData);
    };

    const validateInputs = () => {
        if (Object.values(inputData).some(value => value.trim() === '')) {
            setErrorMessage('Please fill in all required fields.');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleAddOrEditData = async () => {
        if (!validateInputs()) {
            return;
        }

        try {
            const url = editIndex !== null ? `/trading-data/${editIndex}` : '/trading-data';
            const method: 'post' | 'put' = editIndex !== null ? 'put' : 'post';

            await router.visit(url, {
                method,
                data: inputData as Record<string, any>,
                onSuccess: () => {
                    toast.success(editIndex !== null ? 'Data updated successfully!' : 'Data added successfully!');
                    setTableData(editIndex !== null
                        ? tableData.map((item, index) =>
                            index === editIndex ? inputData : item
                        )
                        : [...tableData, inputData]
                    );
                    closeModal();
                },
                onError: (errors) => {
                    console.error('Error saving data', errors);
                    setErrorMessage('Failed to save data.');
                },
            });
        } catch (error) {
            console.error('Error saving data', error);
            setErrorMessage('Failed to save data.');
        }
    };

    const handleEdit = (index: number) => {
        setInputData(tableData[index]);
        setEditIndex(index);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await router.visit(`/trading-data/${id}`, {
                    method: 'delete',
                    onSuccess: () => {
                        toast.success('Data deleted successfully!');
                        setTableData(tableData.filter(item => item.id !== id));
                    },
                    onError: (errors) => {
                        console.error('Error deleting data', errors);
                        toast.error('Failed to delete data.');
                    },
                });
            } catch (error) {
                console.error('Error deleting data', error);
                toast.error('Failed to delete data.');
            }
        }
    };

    const openModal = () => {
        setInputData({
            propfirm: '',
            capital: '',
            price: '',
            discount: '',
            net_price: '',
            code: '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditIndex(null);
        setErrorMessage('');
    };

    return (
        <main className="min-h-screen flex flex-col items-center">
            <ToastContainer />
            <div className="relative w-full md:block hidden">
                <div
                    id="trading"
                    className="mt-28 p-4 max-w-7xl mx-auto relative z-0 w-full pt-10 md:pt-4 bottom-0 space-y-4 h-[40rem] rounded-md overflow-hidden"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Trading</h2>

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
                                    <td className="border p-2">{row.propfirm}</td>
                                    <td className="border p-2">{row.capital}</td>
                                    <td className="border p-2">{row.price}</td>
                                    <td className="border p-2">{row.discount}</td>
                                    <td className="border p-2">{row.net_price}</td>
                                    <td className="border p-2">{row.code}</td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="text-blue-500 mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(row.id || 0)}
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">
                            {editIndex !== null ? 'Edit Data' : 'Add Data'}
                        </h2>
                        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                        <form>
                            <input
                                type="text"
                                name="propfirm"
                                value={inputData.propfirm}
                                onChange={handleChange}
                                placeholder="Prop Firm"
                                className="w-full mb-2 border p-2 rounded"
                            />
                            <input
                                type="text"
                                name="capital"
                                value={inputData.capital}
                                onChange={handleChange}
                                placeholder="Capital"
                                className="w-full mb-2 border p-2 rounded"
                            />
                            <input
                                type="number"
                                name="price"
                                value={inputData.price}
                                onChange={handleChange}
                                placeholder="Price"
                                className="w-full mb-2 border p-2 rounded"
                            />
                            <input
                                type="number"
                                name="discount"
                                value={inputData.discount}
                                onChange={handleChange}
                                placeholder="Discount"
                                className="w-full mb-2 border p-2 rounded"
                            />
                            <input
                                type="text"
                                name="net_price"
                                value={inputData.net_price}
                                readOnly
                                placeholder="Net Price"
                                className="w-full mb-2 border p-2 rounded"
                            />
                            <input
                                type="text"
                                name="code"
                                value={inputData.code}
                                onChange={handleChange}
                                placeholder="Code"
                                className="w-full mb-2 border p-2 rounded"
                            />
                            <div className="flex justify-end mt-4 gap-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddOrEditData}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    {editIndex !== null ? 'Save Changes' : 'Add Data'}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Trading;
