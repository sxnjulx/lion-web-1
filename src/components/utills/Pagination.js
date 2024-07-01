import React from 'react';

const Pagination = ({ totalPages, itemsPerPage = 10, currentPageIndex, onPageChange }) => {
    const handleClick = (pageIndex) => {
        // if (pageIndex < 1 || pageIndex > totalPages) return;
        onPageChange(pageIndex);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handleClick(i)}
                    className={`px-4 py-2 mx-1 ${currentPageIndex+1 === i ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => handleClick(currentPageIndex)}
                className="px-4 py-2 mx-1 bg-gray-300 text-black"
                disabled={currentPageIndex === 0}
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={() => handleClick(currentPageIndex + 1)}
                className="px-4 py-2 mx-1 bg-gray-300 text-black"
                disabled={currentPageIndex+1 === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
