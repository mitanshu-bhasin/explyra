// js/docx-export.js - DOCX Export & Google Docs Integration

const { Document, Packer, Paragraph, Table, TableCell, TableRow, BorderStyle, VerticalAlign, HeadingLevel, UnderlineType, convertInchesToTwip, convertMillimetersToTwip } = window.docx || {};

/**
 * Create formatted DOCX document from expense data
 */
const buildExpenseDocx = (expense, expenseId, portalLabel = 'Portal', downloadedBy = 'User') => {
    if (!Packer || !Document || !Paragraph || !Table) {
        console.warn('DOCX library not loaded');
        return null;
    }

    const generatedAt = new Date().toLocaleString();
    const submittedEmail = expense.userEmail || expense.employeeEmail || 'N/A';
    const createdAt = expense.createdAt?.toDate ? expense.createdAt.toDate().toLocaleString() : (expense.createdAt ? new Date(expense.createdAt).toLocaleString() : 'N/A');
    const updatedAt = expense.updatedAt?.toDate ? expense.updatedAt.toDate().toLocaleString() : (expense.updatedAt ? new Date(expense.updatedAt).toLocaleString() : 'N/A');
    const symbol = window.getSymbol ? window.getSymbol(expense.currency || 'INR') : '₹';

    // Build line items table rows
    const lineItems = Array.isArray(expense.lineItems) ? expense.lineItems : [];
    const lineItemRows = lineItems.length ? lineItems.map((item, idx) => {
        return new TableRow({
            children: [
                new TableCell({ children: [new Paragraph(`${idx + 1}`)], verticalAlign: VerticalAlign.center }),
                new TableCell({ children: [new Paragraph(item?.category || 'N/A')] }),
                new TableCell({ children: [new Paragraph(String(item?.description || item?.desc || 'No description').substring(0, 100))] }),
                new TableCell({ children: [new Paragraph(String(item?.date || 'N/A').substring(0, 15))] }),
                new TableCell({ children: [new Paragraph(`${symbol}${Number(item?.amount || 0).toLocaleString()}`)] }),
                new TableCell({ children: [new Paragraph(String(item?.receiptUrl || 'N/A').substring(0, 50) + '...')] })
            ]
        });
    }) : [
        new TableRow({
            children: [
                new TableCell({ 
                    columnSpan: 6, 
                    children: [new Paragraph({ text: 'No line items', alignment: 'center' })] 
                })
            ]
        })
    ];

    // Build history table rows
    const history = Array.isArray(expense.history) ? expense.history : [];
    const historyRows = history.length ? history.map((h, idx) => {
        const hDate = h?.date?.toDate ? h.date.toDate().toLocaleString() : (h?.date ? new Date(h.date).toLocaleString() : 'N/A');
        return new TableRow({
            children: [
                new TableCell({ children: [new Paragraph(`${idx + 1}`)], verticalAlign: VerticalAlign.center }),
                new TableCell({ children: [new Paragraph(String(h?.action || 'UPDATED').replace(/_/g, ' '))] }),
                new TableCell({ children: [new Paragraph(String(h?.by || 'System').substring(0, 30))] }),
                new TableCell({ children: [new Paragraph(hDate.substring(0, 20))] }),
                new TableCell({ children: [new Paragraph(String(h?.comment || h?.remarks || '-').substring(0, 50))] })
            ]
        });
    }) : [
        new TableRow({
            children: [
                new TableCell({
                    columnSpan: 5,
                    children: [new Paragraph({ text: 'No history found', alignment: 'center' })]
                })
            ]
        })
    ];

    // Document sections
    const sections = [
        new Paragraph({
            text: 'EXPENSE DETAIL REPORT',
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 100 }
        }),
        new Paragraph({
            text: `${portalLabel} • Generated on ${generatedAt}`,
            size: 18,
            color: '666666',
            spacing: { after: 200 }
        }),

        // Report ID
        new Paragraph({
            text: `Report ID: ${expenseId}`,
            size: 20,
            bold: true,
            spacing: { after: 200 }
        }),

        // Key Details
        new Paragraph({
            text: 'EXPENSE DETAILS',
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 }
        }),
        new Paragraph({
            children: [
                { text: 'Title: ', bold: true },
                { text: String(expense.title || 'N/A') }
            ],
            spacing: { after: 100 }
        }),
        new Paragraph({
            children: [
                { text: 'Status: ', bold: true },
                { text: String(expense.status || 'N/A').replace(/_/g, ' ') }
            ],
            spacing: { after: 100 }
        }),
        new Paragraph({
            children: [
                { text: 'Employee: ', bold: true },
                { text: String(expense.employeeName || expense.userName || expense.userEmail || 'N/A') }
            ],
            spacing: { after: 100 }
        }),
        new Paragraph({
            children: [
                { text: 'Amount: ', bold: true },
                { text: `${symbol}${Number(expense.totalAmount || 0).toLocaleString()}` }
            ],
            spacing: { after: 100 }
        }),
        new Paragraph({
            children: [
                { text: 'Project: ', bold: true },
                { text: String(expense.projectCode || 'N/A') }
            ],
            spacing: { after: 100 }
        }),
        new Paragraph({
            children: [
                { text: 'Currency: ', bold: true },
                { text: String(expense.currency || 'INR') }
            ],
            spacing: { after: 300 }
        }),

        // Notes
        new Paragraph({
            text: 'Notes / Description',
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 }
        }),
        new Paragraph({
            text: String((expense.notes || '').trim() || 'No notes provided.'),
            spacing: { after: 300 }
        }),

        // Audit Metadata
        new Paragraph({
            text: 'AUDIT METADATA',
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 }
        }),
        new Paragraph({
            children: [
                { text: 'Submitted By Email: ', bold: true },
                { text: submittedEmail }
            ],
            spacing: { after: 100 }
        }),
        new Paragraph({
            children: [
                { text: 'Downloaded By: ', bold: true },
                { text: downloadedBy }
            ],
            spacing: { after: 100 }
        }),
        new Paragraph({
            children: [
                { text: 'Downloaded At: ', bold: true },
                { text: generatedAt }
            ],
            spacing: { after: 100 }
        }),
        new Paragraph({
            children: [
                { text: 'Created At: ', bold: true },
                { text: createdAt }
            ],
            spacing: { after: 100 }
        }),
        new Paragraph({
            children: [
                { text: 'Updated At: ', bold: true },
                { text: updatedAt }
            ],
            spacing: { after: 300 }
        }),

        // Line Items Table
        new Paragraph({
            text: 'LINE ITEMS',
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 }
        }),
        new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph({ text: '#', bold: true })], shading: { fill: 'E8E8E8' } }),
                        new TableCell({ children: [new Paragraph({ text: 'Category', bold: true })], shading: { fill: 'E8E8E8' } }),
                        new TableCell({ children: [new Paragraph({ text: 'Description', bold: true })], shading: { fill: 'E8E8E8' } }),
                        new TableCell({ children: [new Paragraph({ text: 'Date', bold: true })], shading: { fill: 'E8E8E8' } }),
                        new TableCell({ children: [new Paragraph({ text: 'Amount', bold: true })], shading: { fill: 'E8E8E8' } }),
                        new TableCell({ children: [new Paragraph({ text: 'Receipt / Proof', bold: true })], shading: { fill: 'E8E8E8' } })
                    ]
                }),
                ...lineItemRows
            ],
            width: { size: 100, type: 'pct' }
        }),
        new Paragraph({ text: '', spacing: { after: 200 } }),

        // History Table
        new Paragraph({
            text: 'STATUS HISTORY',
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 }
        }),
        new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({ children: [new Paragraph({ text: '#', bold: true })], shading: { fill: 'E8E8E8' } }),
                        new TableCell({ children: [new Paragraph({ text: 'Action', bold: true })], shading: { fill: 'E8E8E8' } }),
                        new TableCell({ children: [new Paragraph({ text: 'By', bold: true })], shading: { fill: 'E8E8E8' } }),
                        new TableCell({ children: [new Paragraph({ text: 'Date', bold: true })], shading: { fill: 'E8E8E8' } }),
                        new TableCell({ children: [new Paragraph({ text: 'Comments', bold: true })], shading: { fill: 'E8E8E8' } })
                    ]
                }),
                ...historyRows
            ],
            width: { size: 100, type: 'pct' }
        })
    ];

    return new Document({ sections: [{ children: sections }] });
};

/**
 * Download expense as DOCX
 */
window.downloadExpenseAsDocx = async (expense, expenseId, portalLabel = 'Portal', downloadedBy = 'User') => {
    try {
        if (!Packer) {
            if (typeof window.showToast === 'function') {
                window.showToast('DOCX library not loaded. Please refresh.', 'error');
            }
            return;
        }

        if (typeof window.showToast === 'function') {
            window.showToast('Preparing DOCX file...', 'info');
        }

        const doc = buildExpenseDocx(expense, expenseId, portalLabel, downloadedBy);
        if (!doc) {
            if (typeof window.showToast === 'function') {
                window.showToast('Failed to create DOCX document.', 'error');
            }
            return;
        }

        const blob = await Packer.toBlob(doc);
        const filename = `expense_detail_${expenseId}_${new Date().toISOString().split('T')[0]}.docx`;
        
        if (window.saveAs) {
            window.saveAs(blob, filename);
        } else {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(url);
        }

        if (typeof window.showToast === 'function') {
            window.showToast('Expense DOCX downloaded successfully!', 'success');
        }
    } catch (err) {
        console.error('DOCX export failed:', err);
        if (typeof window.showToast === 'function') {
            window.showToast('Failed to export DOCX: ' + err.message, 'error');
        }
    }
};

/**
 * Check if Google is connected
 */
window.isGoogleConnected = async () => {
    if (!window.currentUser) return false;
    try {
        const tokenRef = window.db ? window.db.collection('users').doc(window.currentUser.uid).collection('settings').doc('googleDocs') : null;
        if (!tokenRef) return false;
        // Check in localStorage for quick access
        return localStorage.getItem(`google_docs_token_${window.currentUser.uid}`) !== null;
    } catch (e) {
        return false;
    }
};

/**
 * Save expense to Google Docs
 */
window.saveExpenseToGoogleDocs = async (expense, expenseId, portalLabel = 'Portal', downloadedBy = 'User') => {
    try {
        if (typeof window.showToast === 'function') {
            window.showToast('Connecting to Google Drive...', 'info');
        }

        const isConnected = await window.isGoogleConnected();
        if (!isConnected) {
            if (typeof window.showToast === 'function') {
                window.showToast('Google Docs not connected. Please connect in settings.', 'warning');
            }
            return;
        }

        // Call Google Drive service
        if (window.uploadExpenseToGoogleDrive) {
            await window.uploadExpenseToGoogleDrive(expense, expenseId, portalLabel, downloadedBy);
        } else {
            if (typeof window.showToast === 'function') {
                window.showToast('Google Drive service not available.', 'error');
            }
        }
    } catch (err) {
        console.error('Google Docs save failed:', err);
        if (typeof window.showToast === 'function') {
            window.showToast('Failed to save to Google Docs: ' + err.message, 'error');
        }
    }
};
