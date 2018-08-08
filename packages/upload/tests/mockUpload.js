let id = 0;

export default class MockUpload {
  id = (() => {
    id += 1;
    return id.toString();
  })();
  percentage = 0;
  errorMessage = null;
  status = 'pending';
  onProgress = [];
  onSuccess = [];
  onError = [];
  sendPassword = password => {
    if (password) {
      this.success();
    } else {
      this.error('Incorrect password', 'encrypted');
    }
  };
  progress = (amount = 10) => {
    this.percentage = Math.min(Math.max(amount + this.percentage, 0), 100);
    this.errorMessage = null;
    this.onProgress.forEach(a => a());
    if (this.percentage === 100) {
      this.onSuccess.forEach(a => a());
    }
  };
  success = () => {
    this.percentage = 100;
    this.errorMessage = null;
    this.status = 'accepted';
    this.onSuccess.forEach(a => a());
  };
  error = (message = null, status = 'rejected') => {
    this.errorMessage = message;
    this.status = status;
    this.onError.forEach(a => a());
  };
  reset = () => {
    this.percentage = 0;
    this.errorMessage = null;
    this.status = 'pending';
    this.progress(0);
  };
}
