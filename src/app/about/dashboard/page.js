"use client"
import React, { useState, useEffect } from 'react';
import "./Table.css"

export default function About() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10); // Default number of rows per page

    useEffect(() => {
        fetch('http://localhost:8080/student/getAll')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
                setFilteredData(data); // Initialize filtered data
            });
        // document.title = 'My Webrecto'; // Quick solution
    }, []);

    useEffect(() => {
        // Filter data based on search query
        const lowercasedQuery = searchQuery.toLowerCase();
        const newFilteredData = data.filter((item) =>
            item.name.toLowerCase().includes(lowercasedQuery) ||
            item.address.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredData(newFilteredData);
        setCurrentPage(0); // Reset to the first page when search query changes
    }, [searchQuery, data]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0); // Reset to the first page when rows per page changes
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Slice the filtered data based on currentPage and rowsPerPage
    const displayedData = filteredData.slice(
        currentPage * rowsPerPage,
        currentPage * rowsPerPage + rowsPerPage
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // Calculate range for displaying entries
    const startEntry = currentPage * rowsPerPage + 1;
    const endEntry = Math.min((currentPage + 1) * rowsPerPage, filteredData.length);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4">
            
            <div className="mb-3 w-100 flex justify-between align-items-center">
                    <div>
                        <label htmlFor="rowsPerPage" className="form-label me-2">Rows per page:</label>
                        <select
                            id="rowsPerPage"
                            className="form-select"
                            value={rowsPerPage}
                            onChange={handleRowsPerPageChange}
                        >
                            {[5, 10, 15, 25].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="search" className="form-label me-2">Search:</label>
                        <input
                            type="text"
                            id="search"
                            className="form-control"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col" className="text-end mx-5">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedData.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td className="text-end">
                                    <button type="button" className="btn-coral icon-btn">
                                        edit
                                    </button>
                                    <button type="button" className="btn-orange icon-btn mx-3">
                                        del
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mb-3 d-flex justify-content-end">
                    <span>Showing {startEntry} to {endEntry} of {filteredData.length} entries</span>
                </div>
                <nav aria-label="Page navigation">
                    <ul className="pagination justify-content-end">
                        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                            <button className="page-link arrow-left" onClick={() => handlePageChange(currentPage - 1)}>
                              prev
                            </button>
                        </li>
                        {[...Array(totalPages).keys()].map((page) => (
                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(page)}>
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                            <button className="page-link arrow-right" onClick={() => handlePageChange(currentPage + 1)}>
                                next
                            </button>
                        </li>
                    </ul>
                </nav>
        </main>
    );
}
