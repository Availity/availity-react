import PayerImage from './PayerImage';

const PayerLogo = PayerImage.create({
  imageType: 'logo',
});

const PayerTile = PayerImage.create({
  imageType: 'tile',
});

const PayerBillboard = PayerImage.create({
  imageType: 'billboard',
});

export default PayerLogo;

export { PayerTile, PayerBillboard };
