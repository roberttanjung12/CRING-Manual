const maskEmail = email => {
  let maskedEmail = '';
  const atIndex = email.indexOf('@');

  if (atIndex > 0) {
    const maskedPart = email.substring(0, atIndex);
    const visibleCharacters = Math.min(4, maskedPart.length);

    maskedEmail = maskedPart.substring(0, visibleCharacters).padEnd(maskedPart.length, '*');
  }

  return maskedEmail;
};

export default maskEmail;
