// PolyFill For React Date
if (!String.prototype.padStart) {
  // eslint-disable-next-line no-extend-native
  String.prototype.padStart = function padStart(targetLength, padString) {
    // eslint-disable-next-line no-bitwise
    targetLength >>= 0; // truncate if number, or convert non-number to 0;
    padString = String(padString !== undefined ? padString : ' ');
    if (this.length >= targetLength) {
      return String(this);
      // eslint-disable-next-line no-else-return
    } else {
      // eslint-disable-next-line operator-assignment
      targetLength = targetLength - this.length;
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length); // append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this);
    }
  };
}
