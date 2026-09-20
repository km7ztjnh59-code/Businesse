import { CartItem, CakeCustomization, CustomizedOrderItem, CustomerDetails, CompletedOrder } from '../types';
import { BAKERY_INFO } from '../data/bakeryData';

export function getGeneralWhatsAppUrl(): string {
  const text = encodeURIComponent(
    `Hi Jerryyss Bakery! 👋 I visited your website and would like to order some fresh baked treats. Could you please assist me with today's availability?`
  );
  return `https://wa.me/${BAKERY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`;
}

export function getCustomCakeWhatsAppUrl(custom: CakeCustomization, estimatedPrice: number): string {
  const text = encodeURIComponent(
`Hi Jerryyss Bakery! 🎂 I would like to order a Custom Cake:

✨ *Flavor:* ${custom.flavor}
🍰 *Size/Weight:* ${custom.sizeKg} kg
🌱 *Diet:* ${custom.isEggless ? '100% Eggless' : 'Regular'}
🎨 *Style:* ${custom.style}
✍️ *Message on Cake:* "${custom.messageOnCake || 'None'}"
📅 *Required Date:* ${custom.deliveryDate || 'To be scheduled'}
📝 *Special Requests:* ${custom.specialRequests || 'Standard decoration'}

💰 *Estimated Quote:* ₹${Math.round(estimatedPrice).toLocaleString('en-IN')}

Could you please confirm your availability for this date? Thank you! 🧁`
  );
  return `https://wa.me/${BAKERY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`;
}

export function getPaidOrderWhatsAppUrl(order: CompletedOrder): string {
  const itemsText = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.quantity}x ${item.productName}* [${item.selectedWeight.label}]
   - Price: ₹${(item.unitPrice * item.quantity).toLocaleString('en-IN')}
   - Diet: ${item.isEggless ? '100% Eggless 🌱' : 'Standard'}
   ${item.customMessage ? `- Message on Cake: "${item.customMessage}"` : ''}
   ${item.selectedStyle ? `- Style: ${item.selectedStyle}` : ''}
   ${item.specialNote ? `- Special Note: ${item.specialNote}` : ''}`
    )
    .join('\n\n');

  const text = encodeURIComponent(
`🎉 *NEW PAID ORDER — Jerryyss Bakery* 🎂
━━━━━━━━━━━━━━━━━━━━━━
*Order ID:* ${order.orderId}
*Status:* ✅ Payment Confirmed (${order.paymentMethod})
*Transaction Ref:* ${order.paymentRef}
*Date of Order:* ${order.paidAt}

🧁 *ORDER ITEMS:*
${itemsText}

━━━━━━━━━━━━━━━━━━━━━━
*Subtotal:* ₹${Math.round(order.subtotal).toLocaleString('en-IN')}
*Delivery Fee:* ${order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
*Total Paid:* ₹${Math.round(order.total).toLocaleString('en-IN')}

👤 *CUSTOMER DETAILS:*
• Name: ${order.customer.name}
• Phone: ${order.customer.phone}
• Delivery Type: ${order.customer.deliveryType === 'delivery' ? 'Local Doorstep Delivery' : 'Self Pickup from Kitchen'}
• Required Date: ${order.customer.deliveryDate}
• Preferred Slot: ${order.customer.deliveryTimeSlot}
• Address: ${order.customer.address || 'Self Pickup'}
${order.customer.specialInstructions ? `• Instructions: ${order.customer.specialInstructions}` : ''}

Thank you! Please prepare this order as per schedule. ✨`
  );

  return `https://wa.me/${BAKERY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`;
}

export function getCartWhatsAppUrl(
  items: CartItem[],
  customerInfo: { name: string; phone: string; date: string; address: string; notes: string }
): string {
  const subtotal = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  
  const itemListText = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.quantity}x ${item.item.name}* (₹${(item.item.price * item.quantity).toLocaleString('en-IN')})${
          item.isEggless ? ' [Eggless]' : ''
        }${item.customNote ? `\n   Note: ${item.customNote}` : ''}`
    )
    .join('\n');

  const message = 
`Hi Jerryyss Bakery! 🧁 I would like to place an order from your website:

*Order Items:*
${itemListText}

*Subtotal:* ₹${Math.round(subtotal).toLocaleString('en-IN')}

*Customer Details:*
• Name: ${customerInfo.name || 'Not provided'}
• Phone: ${customerInfo.phone || 'Not provided'}
• Required Date: ${customerInfo.date || 'Earliest available'}
• Delivery / Pickup: ${customerInfo.address || 'Pickup from kitchen'}
${customerInfo.notes ? `• Additional Notes: ${customerInfo.notes}` : ''}

Please confirm order availability and payment details. Thank you! 🍰`;

  return `https://wa.me/${BAKERY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
}

export function getSingleItemWhatsAppUrl(itemName: string, price: number, isEggless: boolean): string {
  const text = encodeURIComponent(
    `Hi Jerryyss Bakery! 🍰 I'm interested in ordering the *${itemName}* (₹${price.toLocaleString('en-IN')}${isEggless ? ', 100% Eggless' : ''}). Could you please tell me the earliest available slot for pickup or delivery?`
  );
  return `https://wa.me/${BAKERY_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${text}`;
}
