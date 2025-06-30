"use client"

import { useState, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"



export function SendInvoiceModal({ open, onOpenChange, selectedInvoice }) {
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")

  useEffect(() => {
    if (open && selectedInvoice) {
      setEmailSubject(`Invoice ${selectedInvoice.id} from InvoicePro`)
      setEmailMessage(
        "Dear Client,\n\nPlease find attached your invoice. Payment is due within 30 days.\n\nThank you for your business!",
      )
    }
  }, [open, selectedInvoice])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Invoice</DialogTitle>
          <DialogDescription>
            Send invoice {selectedInvoice?.id} to {selectedInvoice?.client}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="emailTo">To</Label>
            <Input id="emailTo" value="client@example.com" disabled />
          </div>
          <div>
            <Label htmlFor="emailSubject">Subject</Label>
            <Input id="emailSubject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="emailMessage">Message</Label>
            <Textarea
              id="emailMessage"
              rows={4}
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => onOpenChange(false)}>
            <Send className="h-4 w-4 mr-2" />
            Send Invoice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
