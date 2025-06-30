import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FileText, Plus, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function CreateInvoicePage() {
    const [clientInfo, setClientInfo] = useState({
        name: '',
        email: '',
        company: '',
    });
    const [invoiceItems, setInvoiceItems] = useState([{ id: '1', description: '', quantity: 1, rate: 0, total: 0 }]);
    const [taxRate, setTaxRate] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [dueDate, setDueDate] = useState('');
    const breadcrumbs = [
    {
        title: 'Create Invoice',
        href: '/create-invoice',
    },
];
    const addInvoiceItem = () => {
        const newItem = {
            id: Date.now().toString(),
            description: '',
            quantity: 1,
            rate: 0,
            total: 0,
        };
        setInvoiceItems([...invoiceItems, newItem]);
    };

    const updateInvoiceItem = (id, field, value) => {
        setInvoiceItems((items) =>
            items.map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, [field]: value };
                    if (field === 'quantity' || field === 'rate') {
                        updatedItem.total = updatedItem.quantity * updatedItem.rate;
                    }
                    return updatedItem;
                }
                return item;
            }),
        );
    };

    const removeInvoiceItem = (id) => {
        setInvoiceItems((items) => items.filter((item) => item.id !== id));
    };

    const calculateSubtotal = () => {
        return invoiceItems.reduce((sum, item) => sum + item.total, 0);
    };

    const calculateTax = () => {
        return (calculateSubtotal() * taxRate) / 100;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax() - discount;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Invoice" />
            <div className="space-y-6 p-3 lg:p-6 ">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Create Invoice</h1>
                    <p className="text-gray-600">Create a new invoice for your client.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Client Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="clientName">Client Name</Label>
                                        <Input
                                            id="clientName"
                                            value={clientInfo.name}
                                            onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                                            placeholder="Enter client name"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="clientEmail">Email</Label>
                                        <Input
                                            id="clientEmail"
                                            type="email"
                                            value={clientInfo.email}
                                            onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                                            placeholder="client@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="clientCompany">Company</Label>
                                    <Input
                                        id="clientCompany"
                                        value={clientInfo.company}
                                        onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                                        placeholder="Company name"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Invoice Items</CardTitle>
                                <Button onClick={addInvoiceItem} size="sm">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Item
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {invoiceItems.map((item) => (
                                        <div key={item.id} className="grid grid-cols-12 items-end gap-4">
                                            <div className="col-span-5">
                                                <Label>Description</Label>
                                                <Input
                                                    value={item.description}
                                                    onChange={(e) => updateInvoiceItem(item.id, 'description', e.target.value)}
                                                    placeholder="Service description"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <Label>Quantity</Label>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateInvoiceItem(item.id, 'quantity', Number.parseFloat(e.target.value) || 0)}
                                                    min="1"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <Label>Rate</Label>
                                                <Input
                                                    type="number"
                                                    value={item.rate}
                                                    onChange={(e) => updateInvoiceItem(item.id, 'rate', Number.parseFloat(e.target.value) || 0)}
                                                    placeholder="0.00"
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <Label>Total</Label>
                                                <Input value={`$${item.total.toFixed(2)}`} disabled className="bg-gray-50" />
                                            </div>
                                            <div className="col-span-1">
                                                {invoiceItems.length > 1 && (
                                                    <Button variant="outline" size="sm" onClick={() => removeInvoiceItem(item.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Additional Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <Label htmlFor="taxRate">Tax Rate (%)</Label>
                                        <Input
                                            id="taxRate"
                                            type="number"
                                            value={taxRate}
                                            onChange={(e) => setTaxRate(Number.parseFloat(e.target.value) || 0)}
                                            placeholder="0"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="discount">Discount ($)</Label>
                                        <Input
                                            id="discount"
                                            type="number"
                                            value={discount}
                                            onChange={(e) => setDiscount(Number.parseFloat(e.target.value) || 0)}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="dueDate">Due Date</Label>
                                        <Input id="dueDate" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Invoice Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${calculateSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax ({taxRate}%):</span>
                                    <span>${calculateTax().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Discount:</span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total:</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-3">
                            <Button className="w-full bg-teal-600 hover:bg-teal-700">
                                <Send className="mr-2 h-4 w-4" />
                                Send Invoice
                            </Button>
                            <Button variant="outline" className="w-full bg-transparent">
                                <FileText className="mr-2 h-4 w-4" />
                                Save as Draft
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
