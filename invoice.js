import React from 'react';

class Invoice extends React.Component {
  handlePrint = () => {
    window.print();
  };

  getNextInvoiceNumber = () => {
    const lastInvoiceNumber = parseInt(localStorage.getItem('lastInvoiceNumber'), 10) || 0;
    const nextInvoiceNumber = lastInvoiceNumber + 1;
    localStorage.setItem('lastInvoiceNumber', nextInvoiceNumber);
    return nextInvoiceNumber;
  };

  render() {
    const { billTo, shipTo, items, invoiceDetails, bankDetails, taxRate } = this.props;

    const defaultBankDetails = {
      accountName: 'ABHA FLEET LIMITED',
      accountNumber: '167805000377',
      branch: 'Panaji - Caranzlem, Goa',
      panNo: 'ABACA2592D',
      gstNo: '',
      ifscCode: 'ICIC001678',
      micrCode: '403229012',
      tanNo: 'BLRA48997E',
      cin: '49220GA2024PLCO16445'
    };

    const currentBankDetails = {
      accountName: bankDetails.accountName || defaultBankDetails.accountName,
      accountNumber: bankDetails.accountNumber || defaultBankDetails.accountNumber,
      branch: bankDetails.branch || defaultBankDetails.branch,
      panNo: bankDetails.panNo || defaultBankDetails.panNo,
      gstNo: bankDetails.gstNo || defaultBankDetails.gstNo,
      ifscCode: bankDetails.ifscCode || defaultBankDetails.ifscCode,
      micrCode: bankDetails.micrCode || defaultBankDetails.micrCode,
      tanNo: bankDetails.tanNo || defaultBankDetails.tanNo,
      cin: bankDetails.cin || defaultBankDetails.cin
    };

    const totalAmount = items.reduce((total, item) => total + item.amount, 0);
    const validTaxRate = taxRate && !isNaN(taxRate) ? taxRate : 0;
    const taxAmount = totalAmount * (validTaxRate / 100);
    const finalAmount = totalAmount + taxAmount;

    const numberToWords = (num) => {
      const a = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
      ];
      const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

      if (num === 0) return 'Zero';

      if (num < 20) return a[num];
      if (num < 100) return b[Math.floor(num / 10)] + ' ' + a[num % 10];
      if (num < 1000) return a[Math.floor(num / 100)] + ' Hundred ' + numberToWords(num % 100);

      return numberToWords(Math.floor(num / 1000)) + ' Thousand ' + numberToWords(num % 1000);
    };

    const invoiceNumber = this.getNextInvoiceNumber();

    return (
      <div className="invoice">
        <div className="section company-header">
          <div className="logo-container">
            <img src="/logo.png" alt="Company Logo" className="company-logo" />
          </div>
          <div className="company-details">
            <h1>ABHA FLEET LIMITED</h1>
            <p><strong>Company ID:</strong>U49220GA2024PLC016445</p>
            <p><strong>Address Line:</strong> 21/395/2, Nagali Hills, Street2, Dona Paula, Panaji, Goa, India, 403004</p>
            <p><strong>Site:</strong> goabha.com</p>
            <p><strong>Email:</strong> contact@yourcompany.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
          </div>
        </div>

        <div className="section invoice-details">
          <div>
            <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Terms:</strong> {invoiceDetails.terms}</p>
            <p><strong>Due Date:</strong> {invoiceDetails.dueDate}</p>
          </div>
        </div>
        <div className="section bill-ship-to">
          <div className="bill-to">
            <h3>Bill To</h3>
            <p><strong>{billTo.name}</strong></p>
            <p>{billTo.address}</p>
            <p>{billTo.contact}</p>
          </div>
          <div className="ship-to">
            <h3>Ship To</h3>
            <p><strong>{shipTo.name}</strong></p>
            <p>{shipTo.address}</p>
            <p>{shipTo.contact}</p>
          </div>
        </div>
        <div className="section items-table">
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><strong>{item.title}</strong><br />{item.description}</td>
                  <td>{item.qty}</td>
                  <td>{item.rate}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="section total">
          <p><strong>Total Amount:</strong> {totalAmount.toFixed(2)}</p>
          <p><strong>Tax ({validTaxRate}%):</strong> {taxAmount.toFixed(2)}</p>
          <p><strong>Final Amount:</strong> {finalAmount.toFixed(2)}</p>
          <p><strong>In Words:</strong> {numberToWords(finalAmount)}</p>
        </div>
        <div className="section bank-auth">
          <div className="bank">
            <p><strong>Bank Details:</strong></p>
            <p><strong>Account Name:</strong> {currentBankDetails.accountName}</p>
            <p><strong>Account Number:</strong> {currentBankDetails.accountNumber}</p>
            <p><strong>Branch:</strong> {currentBankDetails.branch}</p>
            <p><strong>IFSC Code:</strong> {currentBankDetails.ifscCode}</p>
            <p><strong>MICR Code:</strong> {currentBankDetails.micrCode}</p>
            <p><strong>Pan No:</strong> {currentBankDetails.panNo}</p>
            <p><strong>Company Tan No:</strong> {currentBankDetails.tanNo}</p>
            <p><strong>CIN:</strong> {currentBankDetails.cin}</p>
            <p><strong>GST Registration No:</strong> {currentBankDetails.gstNo}</p>
          </div>
          <div className="auth-sign">
            <img src="/Abha_shell.jpg" alt="Authorized Signature" className="auth-signature" />
            <div className="signature-name">Authorized signature</div>
          </div>
        </div>
        <button onClick={this.handlePrint}>Print Invoice</button>
      </div>
    );
  }
}

export default Invoice;
