'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Download, Edit, Eye, Filter, Plus, Search, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { SendInvoiceModal } from '../components/send-invoice-modal';

export const sampleInvoices = [
    { id: 'INV-001', client: 'Acme Corp', amount: 2500, status: 'paid', date: '2024-01-15', dueDate: '2024-02-15' },
    {
        id: 'INV-002',
        client: 'Tech Solutions',
        amount: 1800,
        status: 'unpaid',
        date: '2024-01-20',
        dueDate: '2024-02-20',
    },
    {
        id: 'INV-003',
        client: 'Design Studio',
        amount: 3200,
        status: 'overdue',
        date: '2024-01-10',
        dueDate: '2024-02-10',
    },
    { id: 'INV-004', client: 'StartupXYZ', amount: 1200, status: 'paid', date: '2024-01-25', dueDate: '2024-02-25' },
];

export default function ManageInvoicesPage({ setCurrentPage }) {
    const [invoices, setInvoices] = useState(sampleInvoices);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sendModalOpen, setSendModalOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const filteredInvoices = invoices.filter((invoice) => {
        const matchesStatus = filterStatus === 'all' || invoice.status === filterStatus;
        const matchesSearch =
            invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) || invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });
    const breadcrumbs = [
        {
            title: 'Manage Invoices',
            href: '/manage-invoices',
        },
    ];
    const getStatusBadge = (status) => {
        const variants = {
            paid: 'bg-green-100 text-green-800 border-green-200',
            unpaid: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            overdue: 'bg-red-100 text-red-800 border-red-200',
        };
        return <Badge className={variants[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6 p-3 lg:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Manage Invoices</h1>
                        <p className="text-gray-600">View and manage all your invoices.</p>
                    </div>
                    <Button onClick={() => setCurrentPage('create')} className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="mr-2 h-4 w-4" />
                        New Invoice
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    <Input
                                        placeholder="Search invoices..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-[180px]">
                                    <Filter className="mr-2 h-4 w-4" />
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="unpaid">Unpaid</SelectItem>
                                    <SelectItem value="overdue">Overdue</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Invoice ID</TableHead>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredInvoices.map((invoice) => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-medium">{invoice.id}</TableCell>
                                        <TableCell>{invoice.client}</TableCell>
                                        <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                                        <TableCell>{invoice.date}</TableCell>
                                        <TableCell>{invoice.dueDate}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="ghost" size="sm">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedInvoice(invoice);
                                                        setSendModalOpen(true);
                                                    }}
                                                >
                                                    <Send className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <SendInvoiceModal open={sendModalOpen} onOpenChange={setSendModalOpen} selectedInvoice={selectedInvoice} />
            </div>
        </AppLayout>
    );
}
