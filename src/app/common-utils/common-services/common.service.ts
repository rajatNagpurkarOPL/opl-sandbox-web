import { Injectable} from '@angular/core';
import { SnackbarService } from './SnackbarService';
import { LoaderService } from './LoaderService';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private snackbar: SnackbarService) {
  }
  /**
   * For display Toaster msg in right,center,bottom,left,top side
   * @param message
   * @param action
   */

  successSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, 'success');
  }
  errorSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, 'error');
  }
  warningSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, 'warning');
  }
  infoSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, 'info');
  }
  defaultSnackBar(message, action?) {
    this.snackbar.openSnackBar(message, action, '');
  }

}
