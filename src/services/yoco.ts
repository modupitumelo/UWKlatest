declare global {
  interface Window {
    YocoSDK: any;
  }
}

const publicKey = 'pk_live_cdb4543errg51qnd5244';

interface YocoResult {
  id: string;
  status: string;
  error?: {
    message: string;
    type?: string;
  };
}

export async function createPayment(amount: number, description: string): Promise<{ success: boolean; transactionId: string; status: string }> {
  return new Promise((resolve, reject) => {
    try {
      const yoco = new window.YocoSDK({
        publicKey,
      });
      
      yoco.showPopup({
        amountInCents: Math.round(amount * 100),
        currency: 'ZAR',
        name: 'Umnotho Wasekasi',
        description,
        callback: (result: YocoResult) => {
          if (result.error) {
            // Handle specific error types
            if (result.error.type === 'card_declined') {
              reject(new Error('Your card was declined. Please try a different card.'));
            } else if (result.error.type === 'insufficient_funds') {
              reject(new Error('Insufficient funds. Please try a different card.'));
            } else if (result.error.type === '3d_secure_failed') {
              reject(new Error('3D Secure authentication failed. Please try again.'));
            } else {
              reject(new Error(result.error.message || 'Payment failed. Please try again.'));
            }
          } else if (result.status === 'successful') {
            resolve({
              success: true,
              transactionId: result.id,
              status: result.status,
            });
          } else {
            reject(new Error('Payment was not successful. Please try again.'));
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}