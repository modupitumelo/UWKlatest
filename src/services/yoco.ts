declare global {
  interface Window {
    YocoSDK: any;
  }
}

const publicKey = 'pk_live_cdb4543errg51qnd5244';

export async function createPayment(amount: number, description: string) {
  return new Promise((resolve, reject) => {
    const yoco = new window.YocoSDK({
      publicKey,
    });
    
    yoco.showPopup({
      amountInCents: amount * 100,
      currency: 'ZAR',
      name: 'Umnotho Wasekasi',
      description,
      callback: (result: any) => {
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
  });
}