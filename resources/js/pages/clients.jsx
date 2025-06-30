import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Edit, Plus, Trash2 } from 'lucide-react';
export const sampleClients = [
    { id: '1', name: 'Acme Corp', email: 'contact@acme.com', company: 'Acme Corporation' },
    { id: '2', name: 'Tech Solutions', email: 'hello@techsolutions.com', company: 'Tech Solutions Inc' },
    { id: '3', name: 'Design Studio', email: 'info@designstudio.com', company: 'Creative Design Studio' },
];

export default function ClientsPage() {
    const breadcrumbs = [
        {
            title: 'Clients',
            href: '/clients',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6 p-3 lg:p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
                        <p className="text-gray-600">Manage your client information.</p>
                    </div>
                    <Button className="bg-teal-600 hover:bg-teal-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Client
                    </Button>
                </div>

                <Card>
                    <CardContent className="p-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sampleClients.map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell className="font-medium">{client.name}</TableCell>
                                        <TableCell>{client.email}</TableCell>
                                        <TableCell>{client.company}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                <Button variant="ghost" size="sm">
                                                    <Edit className="h-4 w-4" />
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
            </div>
        </AppLayout>
    );
}
