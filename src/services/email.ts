import { UserDetails } from '../types';

const POSTMARK_SERVER_TOKEN = 'e13d741f-bc79-483a-b74a-b035b9fd7783';
const COMPANY_EMAIL = 'tumzena@gmail.com';

interface PurchaseConfirmationParams {
  to: string;
  firstName: string;
  ticketType: string;
  quantity: number;
  totalAmount: number;
  orderId: string;
  userDetails: UserDetails;
}

export async function sendPurchaseConfirmation(params: PurchaseConfirmationParams) {
  const customerEmailResponse = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': POSTMARK_SERVER_TOKEN
    },
    body: JSON.stringify({
      From: 'info@uwkfoundation.com',
      To: params.to,
      Subject: 'Your Umnotho Wasekasi Ticket Purchase Confirmation',
      HtmlBody: `
        <h1>Thank you for your purchase, ${params.firstName}!</h1>
        <p>Your order has been successfully processed.</p>
        
        <h2>Order Details:</h2>
        <ul>
          <li>Order ID: ${params.orderId}</li>
          <li>Ticket Type: ${params.ticketType}</li>
          <li>Quantity: ${params.quantity}</li>
          <li>Total Amount: R${params.totalAmount.toFixed(2)}</li>
        </ul>
        
        <p>Keep this email for your records. We will notify you about the upcoming draw date.</p>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <p>Best regards,<br>Umnotho Wasekasi Team</p>
      `
    })
  });

  // Send notification to company
  const companyEmailResponse = await fetch('https://api.postmarkapp.com/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Postmark-Server-Token': POSTMARK_SERVER_TOKEN
    },
    body: JSON.stringify({
      From: 'info@uwkfoundation.com',
      To: COMPANY_EMAIL,
      Subject: 'New Ticket Purchase',
      HtmlBody: `
        <h1>New Ticket Purchase</h1>
        
        <h2>Order Details:</h2>
        <ul>
          <li>Order ID: ${params.orderId}</li>
          <li>Ticket Type: ${params.ticketType}</li>
          <li>Quantity: ${params.quantity}</li>
          <li>Total Amount: R${params.totalAmount.toFixed(2)}</li>
        </ul>
        
        <h2>Customer Details:</h2>
        <ul>
          <li>Name: ${params.userDetails.firstName} ${params.userDetails.lastName}</li>
          <li>Email: ${params.userDetails.email}</li>
          <li>Phone: ${params.userDetails.phone}</li>
          <li>Address: ${params.userDetails.address}</li>
          <li>City: ${params.userDetails.city}</li>
          <li>Postal Code: ${params.userDetails.postalCode}</li>
        </ul>
      `
    })
  });

  if (!customerEmailResponse.ok || !companyEmailResponse.ok) {
    throw new Error('Failed to send confirmation emails');
  }
}