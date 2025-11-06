/**
 * Prescription Pagination Utility
 * Handles automatic page breaks for prescription tables when content exceeds container height
 */

class PrescriptionPagination {
    constructor(options = {}) {
        this.containerHeight = options.containerHeight || 29.7; // A4 height in cm
        this.containerWidth = options.containerWidth || 21; // A4 width in cm
        this.headerHeight = options.headerHeight || 120; // Header height in pixels
        this.detailsHeight = options.detailsHeight || 150; // Details section height in pixels
        this.prescribedByHeight = options.prescribedByHeight || 100; // Prescribed by section height in pixels
        this.qrSignatureHeight = options.qrSignatureHeight || 120; // QR signature section height in pixels
        this.footerHeight = options.footerHeight || 100; // Footer height in pixels
        this.bufferHeight = options.bufferHeight || 50; // Buffer height in pixels
        this.rowHeight = options.rowHeight || 40; // Average row height in pixels
        this.headerRowHeight = options.headerRowHeight || 40; // Table header height in pixels
    }

    /**
     * Calculate the number of rows that can fit in the available space
     * @param {Array} prescriptionItems - Array of prescription items
     * @returns {Array} Array of pages, each containing items that fit on one page
     */
    calculatePages(prescriptionItems) {
        // Convert cm to pixels (assuming 96 DPI)
        const containerHeightPx = this.containerHeight * 37.8; // 1cm = 37.8px at 96 DPI
        
        // Calculate available height for prescription table
        const usedHeight = this.headerHeight + this.detailsHeight + 
                          this.prescribedByHeight + this.qrSignatureHeight + 
                          this.footerHeight + this.bufferHeight;
        
        const availableHeight = containerHeightPx - usedHeight;
        const availableBodyHeight = availableHeight - this.headerRowHeight;
        
        // Calculate how many rows can fit
        const maxRowsPerPage = Math.floor(availableBodyHeight / this.rowHeight);
        
        // Split prescription items into pages
        const pages = [];
        for (let i = 0; i < prescriptionItems.length; i += maxRowsPerPage) {
            const pageItems = prescriptionItems.slice(i, i + maxRowsPerPage);
            pages.push(pageItems);
        }
        
        return pages;
    }

    /**
     * Generate EJS template data for multiple pages
     * @param {Object} prescriptionData - Complete prescription data
     * @returns {Array} Array of page data for EJS rendering
     */
    generatePageData(prescriptionData) {
        const { prescription_items, ...otherData } = prescriptionData;
        
        // Calculate pages
        const pages = this.calculatePages(prescription_items);
        
        // Generate page data
        const pageData = pages.map((pageItems, pageIndex) => {
            // Add sequential numbers to items
            const itemsWithSlNo = pageItems.map((item, index) => ({
                ...item,
                slNo: (pageIndex * pages[0].length) + index + 1
            }));
            
            return {
                ...otherData,
                prescription_items: [itemsWithSlNo], // Wrap in array to match original structure
                page_number: pageIndex + 1,
                total_pages: pages.length,
                is_first_page: pageIndex === 0,
                is_last_page: pageIndex === pages.length - 1
            };
        });
        
        return pageData;
    }

    /**
     * Render prescription with automatic pagination
     * @param {Object} prescriptionData - Complete prescription data
     * @param {Function} renderFunction - EJS render function
     * @returns {String} Complete HTML with all pages
     */
    renderWithPagination(prescriptionData, renderFunction) {
        const pageData = this.generatePageData(prescriptionData);
        
        let html = '';
        pageData.forEach((page, index) => {
            const pageHtml = renderFunction(page);
            if (index > 0) {
                // Add page break for subsequent pages
                html += '<div class="page-break"></div>';
            }
            html += pageHtml;
        });
        
        return html;
    }

    /**
     * Get CSS for page breaks
     * @returns {String} CSS styles for page breaks
     */
    getPageBreakCSS() {
        return `
            .page-break {
                page-break-before: always;
            }
            
            .pdf-container {
                page-break-after: always;
            }
            
            .pdf-container:last-child {
                page-break-after: avoid;
            }
            
            @media print {
                .page-break {
                    page-break-before: always;
                }
            }
        `;
    }
}

/**
 * Utility function to chunk prescription items for pagination
 * @param {Array} items - Prescription items
 * @param {Number} itemsPerPage - Maximum items per page
 * @returns {Array} Array of chunks
 */
function chunkPrescriptionItems(items, itemsPerPage) {
    const chunks = [];
    for (let i = 0; i < items.length; i += itemsPerPage) {
        chunks.push(items.slice(i, i + itemsPerPage));
    }
    return chunks;
}

/**
 * Calculate optimal items per page based on container dimensions
 * @param {Object} containerDimensions - Container dimensions
 * @param {Number} averageRowHeight - Average height of each row
 * @returns {Number} Optimal number of items per page
 */
function calculateOptimalItemsPerPage(containerDimensions, averageRowHeight = 40) {
    const {
        containerHeight = 29.7, // A4 height in cm
        headerHeight = 120,
        detailsHeight = 150,
        prescribedByHeight = 100,
        qrSignatureHeight = 120,
        footerHeight = 100,
        bufferHeight = 50,
        headerRowHeight = 40
    } = containerDimensions;
    
    // Convert cm to pixels
    const containerHeightPx = containerHeight * 37.8;
    
    // Calculate available height
    const usedHeight = headerHeight + detailsHeight + prescribedByHeight + 
                      qrSignatureHeight + footerHeight + bufferHeight;
    const availableHeight = containerHeightPx - usedHeight;
    const availableBodyHeight = availableHeight - headerRowHeight;
    
    // Calculate max rows
    const maxRows = Math.floor(availableBodyHeight / averageRowHeight);
    
    return Math.max(1, maxRows); // Ensure at least 1 item per page
}

module.exports = {
    PrescriptionPagination,
    chunkPrescriptionItems,
    calculateOptimalItemsPerPage
};
