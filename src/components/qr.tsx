// components/qr.ts

import QRCode from 'qrcode';

export const generateQRCodeDataURL = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    QRCode.toDataURL(url, (err: any, dataURL: string | PromiseLike<string>) => {
      if (err) {
        reject(err);
      } else {
        resolve(dataURL);
      }
    });
  });
};
