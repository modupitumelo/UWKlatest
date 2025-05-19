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
  };
}

export async function createPayment(amount: number, description: string): Promise<{ success: boolean; transactionId: string; status: string }> {
  return new Promise((resolve, reject) => {
    try {
      const yoco = new window.YocoSDK({
        publicKey,
      });
      
      yoco.showPopup({
        amountInCents: Math.round(amount * 100), // Ensure amount is rounded to avoid decimal issues
        currency: 'ZAR',
        name: 'Umnotho Wasekasi',
        description,
        callback: (result: YocoResult) => {
          if (result.error) {
            reject(new Error(result.error.message));
          } else {
            resolve({
              success: true,
              transactionId: result.id,
              status: result.status,
            });
          }
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}