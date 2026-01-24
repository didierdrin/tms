import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generateInvoice = (shipment, userProfile) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('INVOICE', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text('ITO East Africa Ltd', pageWidth / 2, 30, { align: 'center' });
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    // Invoice details
    doc.setFontSize(10);
    doc.text(`Invoice #: INV-${shipment.trackingNumber}`, 20, 55);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 62);
    doc.text(`Due Date: ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}`, 20, 69);
    
    // Bill to
    doc.setFontSize(12);
    doc.text('Bill To:', 20, 85);
    doc.setFontSize(10);
    doc.text(userProfile?.displayName || userProfile?.email || 'Customer', 20, 92);
    doc.text(userProfile?.email || '', 20, 99);
    
    // Shipment details
    doc.setFontSize(12);
    doc.text('Shipment Details:', 20, 115);
    doc.setFontSize(10);
    doc.text(`Tracking: ${shipment.trackingNumber}`, 20, 122);
    doc.text(`Route: ${shipment.origin} → ${shipment.destination}`, 20, 129);
    doc.text(`Service: ${shipment.type}`, 20, 136);
    
    // Items table
    doc.autoTable({
        startY: 150,
        head: [['Description', 'Quantity', 'Weight (kg)', 'Amount']],
        body: shipment.items?.map(item => [
            item.description,
            item.quantity,
            item.weight,
            `$${((item.quantity * 10) + (item.weight * 2)).toFixed(2)}`
        ]) || [['Shipment Service', '1', '-', `$${shipment.estimatedCost || 150}`]],
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235] }
    });
    
    // Total
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total: $${shipment.estimatedCost || 150}`, pageWidth - 20, finalY, { align: 'right' });
    
    // Footer
    doc.setFontSize(8);
    doc.text('Thank you for your business!', pageWidth / 2, doc.internal.pageSize.height - 20, { align: 'center' });
    doc.text('ITO East Africa Ltd | contact@itoeastafrica.com | +250 123 456 789', pageWidth / 2, doc.internal.pageSize.height - 15, { align: 'center' });
    
    doc.save(`Invoice-${shipment.trackingNumber}.pdf`);
};

export const generateReceipt = (shipment, userProfile) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Header
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('RECEIPT', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text('ITO East Africa Ltd', pageWidth / 2, 30, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    
    // Receipt details
    doc.setFontSize(10);
    doc.text(`Receipt #: RCP-${shipment.trackingNumber}`, 20, 55);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 62);
    doc.text(`Payment Method: Credit Card`, 20, 69);
    
    // Customer info
    doc.setFontSize(12);
    doc.text('Customer:', 20, 85);
    doc.setFontSize(10);
    doc.text(userProfile?.displayName || userProfile?.email || 'Customer', 20, 92);
    
    // Payment details
    doc.autoTable({
        startY: 110,
        head: [['Description', 'Amount']],
        body: [
            ['Shipment Service', `$${shipment.estimatedCost || 150}`],
            ['Tax (0%)', '$0.00'],
            ['Total Paid', `$${shipment.estimatedCost || 150}`]
        ],
        theme: 'plain',
        headStyles: { fillColor: [16, 185, 129] }
    });
    
    // Status
    doc.setFillColor(220, 252, 231);
    doc.rect(20, doc.lastAutoTable.finalY + 20, pageWidth - 40, 20, 'F');
    doc.setFontSize(12);
    doc.setTextColor(22, 163, 74);
    doc.text('PAID', pageWidth / 2, doc.lastAutoTable.finalY + 33, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.text('This is a computer-generated receipt and does not require a signature.', pageWidth / 2, doc.internal.pageSize.height - 20, { align: 'center' });
    
    doc.save(`Receipt-${shipment.trackingNumber}.pdf`);
};

export const generateQuotation = (shipment, userProfile) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Header
    doc.setFillColor(147, 51, 234);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('QUOTATION', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text('ITO East Africa Ltd', pageWidth / 2, 30, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    
    // Quote details
    doc.setFontSize(10);
    doc.text(`Quote #: QUO-${shipment.trackingNumber}`, 20, 55);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 62);
    doc.text(`Valid Until: ${new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}`, 20, 69);
    
    // Customer
    doc.setFontSize(12);
    doc.text('Prepared For:', 20, 85);
    doc.setFontSize(10);
    doc.text(userProfile?.displayName || userProfile?.email || 'Customer', 20, 92);
    
    // Service breakdown
    doc.autoTable({
        startY: 110,
        head: [['Service', 'Description', 'Amount']],
        body: [
            ['Base Service', shipment.type || 'Transport Service', `$${shipment.estimatedCost ? (shipment.estimatedCost * 0.6).toFixed(2) : '90.00'}`],
            ['Weight Charges', `${shipment.items?.reduce((sum, item) => sum + parseFloat(item.weight || 0), 0) || 0} kg`, `$${shipment.estimatedCost ? (shipment.estimatedCost * 0.2).toFixed(2) : '30.00'}`],
            ['Item Handling', `${shipment.items?.length || 1} items`, `$${shipment.estimatedCost ? (shipment.estimatedCost * 0.2).toFixed(2) : '30.00'}`]
        ],
        theme: 'striped',
        headStyles: { fillColor: [147, 51, 234] }
    });
    
    // Total
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`Estimated Total: $${shipment.estimatedCost || 150}`, pageWidth - 20, finalY, { align: 'right' });
    
    // Terms
    doc.setFontSize(10);
    doc.text('Terms & Conditions:', 20, finalY + 20);
    doc.setFontSize(8);
    doc.text('- Quote valid for 30 days', 20, finalY + 27);
    doc.text('- Prices subject to change based on actual weight and dimensions', 20, finalY + 32);
    doc.text('- Payment terms: Net 30 days', 20, finalY + 37);
    
    doc.save(`Quotation-${shipment.trackingNumber}.pdf`);
};

export const generateCoverLetter = (shipment, userProfile) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Header
    doc.setFillColor(249, 115, 22);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('SHIPMENT COVER', pageWidth / 2, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text('ITO East Africa Ltd', pageWidth / 2, 30, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    
    // Date
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);
    
    // Shipment info
    doc.setFontSize(14);
    doc.text('Shipment Information', 20, 75);
    doc.setFontSize(10);
    doc.text(`Tracking Number: ${shipment.trackingNumber}`, 20, 85);
    doc.text(`Service Type: ${shipment.type}`, 20, 92);
    doc.text(`Status: ${shipment.status}`, 20, 99);
    
    // Route
    doc.setFontSize(14);
    doc.text('Route Details', 20, 115);
    doc.setFontSize(10);
    doc.text(`Origin: ${shipment.origin}`, 20, 125);
    doc.text(`Destination: ${shipment.destination}`, 20, 132);
    doc.text(`Shipped Date: ${new Date(shipment.shippedDate).toLocaleDateString()}`, 20, 139);
    doc.text(`Expected Delivery: ${new Date(shipment.expectedDelivery).toLocaleDateString()}`, 20, 146);
    
    // Customer
    doc.setFontSize(14);
    doc.text('Customer Information', 20, 162);
    doc.setFontSize(10);
    doc.text(`Name: ${userProfile?.displayName || 'N/A'}`, 20, 172);
    doc.text(`Email: ${userProfile?.email || 'N/A'}`, 20, 179);
    
    // Items
    if (shipment.items && shipment.items.length > 0) {
        doc.autoTable({
            startY: 195,
            head: [['Item Description', 'Quantity', 'Weight (kg)']],
            body: shipment.items.map(item => [
                item.description,
                item.quantity,
                item.weight
            ]),
            theme: 'grid',
            headStyles: { fillColor: [249, 115, 22] }
        });
    }
    
    // Footer
    doc.setFontSize(8);
    doc.text('This document serves as a cover sheet for the shipment and should accompany all related documents.', pageWidth / 2, doc.internal.pageSize.height - 20, { align: 'center' });
    doc.text('For inquiries, contact: +250 123 456 789 | contact@itoeastafrica.com', pageWidth / 2, doc.internal.pageSize.height - 15, { align: 'center' });
    
    doc.save(`Cover-${shipment.trackingNumber}.pdf`);
};
