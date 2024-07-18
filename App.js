import React, { useState, useEffect } from 'react';
import InvoiceWrapper from './InvoiceWrapper';
import './Form.css';

function App() {
  const [billTo, setBillTo] = useState({ name: '', address: '', contact: '' });
  const [shipTo, setShipTo] = useState({ name: '', address: '', contact: '' });
  const [copyBillTo, setCopyBillTo] = useState(false);
  const [items, setItems] = useState([
    { id: '', title: '', description: '', qty: '', rate: '', amount: '', selected: false }
  ]);
  const [invoiceDetails, setInvoiceDetails] = useState({ terms: '', dueDate: '' });

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

  const [bankDetails, setBankDetails] = useState(defaultBankDetails);
  const [useDefaultBankDetails, setUseDefaultBankDetails] = useState(true);

  const [taxRate, setTaxRate] = useState('');

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (useDefaultBankDetails) {
      setBankDetails(defaultBankDetails);
    }
  }, [useDefaultBankDetails]);

  const handleItemChange = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    newItems[index].amount = newItems[index].qty * newItems[index].rate;
    setItems(newItems);
  };

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      title: '',
      description: '',
      qty: '',
      rate: '',
      amount: '',
      selected: false
    };
    setItems([...items, newItem]);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleCheckboxChange = (index) => {
    const newItems = items.map((item, i) => ({
      ...item,
      selected: i === index ? !item.selected : item.selected
    }));
    setItems(newItems);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="App">
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Billing And Invoice</h2>
          <div className="form-section">
            <fieldset>
              <legend>Bill To</legend>
              <label>
                Name:
                <input
                  type="text"
                  value={billTo.name}
                  onChange={(e) => setBillTo({ ...billTo, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={billTo.address}
                  onChange={(e) => setBillTo({ ...billTo, address: e.target.value })}
                  required
                />
              </label>
              <label>
                Contact:
                <input
                  type="text"
                  value={billTo.contact}
                  onChange={(e) => setBillTo({ ...billTo, contact: e.target.value })}
                  required
                />
              </label>
            </fieldset>
            <fieldset>
              <legend>Ship To</legend>
              <label>
                <input
                  type="checkbox"
                  checked={copyBillTo}
                  onChange={() => setCopyBillTo(!copyBillTo)}
                />
                Copy Bill To details to Ship To
              </label>
              {!copyBillTo && (
                <>
                  <label>
                    Name:
                    <input
                      type="text"
                      value={shipTo.name}
                      onChange={(e) => setShipTo({ ...shipTo, name: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Address:
                    <input
                      type="text"
                      value={shipTo.address}
                      onChange={(e) => setShipTo({ ...shipTo, address: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Contact:
                    <input
                      type="number"
                      value={shipTo.contact}
                      onChange={(e) => setShipTo({ ...shipTo, contact: e.target.value })}
                      required
                    />
                  </label>
                </>
              )}
            </fieldset>
          </div>
          <div className="form-section">
            <fieldset>
              <legend>Items</legend>
              {items.map((item, index) => (
                <div key={index} className={`item-row ${item.selected ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <div className="item-details">
                    <label>Title:</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                      required
                    />
                    <label>Description:</label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      required
                    />
                  </div>
                  <div className="item-fields">
                    <label>
                      Quantity:
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Rate:
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                        required
                      />
                    </label>
                    <label>
                      Amount:
                      <input
                        type="number"
                        value={item.amount}
                        readOnly
                      />
                    </label>
                    <button type="button" onClick={() => removeItem(index)}>Remove</button>
                  </div>
                </div>
              ))}
              <button type="button" onClick={addItem}>Add Item</button>
            </fieldset>
          </div>
          <div className="form-section">
            <fieldset>
              <legend>Invoice Details</legend>
              <label>
                Terms:
                <select
                  value={invoiceDetails.terms}
                  onChange={(e) => setInvoiceDetails({ ...invoiceDetails, terms: e.target.value })}
                  required
                >
                  <option value="">Select Terms</option>
                  <option value="Immediate">Immediate</option>
                  <option value="Net 15">Net 15</option>
                  <option value="Net 30">Net 30</option>
                  <option value="Net 60">Net 60</option>
                </select>
              </label>
              <label>
                Due Date:
                <input
                  type="date"
                  value={invoiceDetails.dueDate}
                  onChange={(e) => setInvoiceDetails({ ...invoiceDetails, dueDate: e.target.value })}
                  required
                />
              </label>
            </fieldset>
          </div>
          <div className="form-section">
            <fieldset>
              <legend>Bank Details</legend>
              <label>
                <input
                  type="checkbox"
                  checked={useDefaultBankDetails}
                  onChange={() => setUseDefaultBankDetails(!useDefaultBankDetails)}
                />
                Use Default Bank Details
              </label>
              {!useDefaultBankDetails && (
                <>
                  <label>
                    Current Account Name:
                    <input
                      type="text"
                      value={bankDetails.accountName}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountName: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Account Number:
                    <input
                      type="text"
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Branch:
                    <input
                      type="text"
                      value={bankDetails.branch}
                      onChange={(e) => setBankDetails({ ...bankDetails, branch: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    IFSC Code:
                    <input
                      type="text"
                      value={bankDetails.ifscCode}
                      onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    MICR Code:
                    <input
                      type="text"
                      value={bankDetails.micrCode}
                      onChange={(e) => setBankDetails({ ...bankDetails, micrCode: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Company PAN No:
                    <input
                      type="text"
                      value={bankDetails.panNo}
                      onChange={(e) => setBankDetails({ ...bankDetails, panNo: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    GST Registration No:
                    <input
                      type="text"
                      value={bankDetails.gstNo}
                      onChange={(e) => setBankDetails({ ...bankDetails, gstNo: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    Company TAN No:
                    <input
                      type="text"
                      value={bankDetails.tanNo}
                      onChange={(e) => setBankDetails({ ...bankDetails, tanNo: e.target.value })}
                      required
                    />
                  </label>
                  <label>
                    CIN:
                    <input
                      type="text"
                      value={bankDetails.cin}
                      onChange={(e) => setBankDetails({ ...bankDetails, cin: e.target.value })}
                      required
                    />
                  </label>
                </>
              )}
            </fieldset>
          </div>
          <div className="form-section">
            <fieldset>
              <legend>Tax Rate</legend>
              <label>
                Tax Rate (%):
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  required
                />
              </label>
            </fieldset>
          </div>
          <button type="submit">Generate Invoice</button>
        </form>
      ) : (
        <InvoiceWrapper
          billTo={billTo}
          shipTo={copyBillTo ? billTo : shipTo}
          items={items.filter(item => item.selected)}
          invoiceDetails={invoiceDetails}
          bankDetails={bankDetails}
          taxRate={parseFloat(taxRate)}
        />
      )}
    </div>
  );
}

export default App;
