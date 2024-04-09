import { useState } from "react";

export const usePagination = (perPageRecords, totalRecords)=>{
    const totalPages = Math.ceil(totalRecords / perPageRecords);
    const [currentPage, setCurrentPage] = useState(1);
    const [startIndx, setStartIndx] = useState(0);
    const [endIndx, setEndIndx] = useState(perPageRecords-1);

    const setDisplayPage = (pageNo)=> {
        setCurrentPage(pageNo);
        setStartIndx((pageNo-1)*perPageRecords);
        setEndIndx(pageNo*perPageRecords-1);

        
    }

    return {
        totalPages,
        currentPage,
        setDisplayPage,
        startIndx,
        endIndx
    };
}