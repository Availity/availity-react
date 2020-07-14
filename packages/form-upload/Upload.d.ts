<<<<<<< HEAD
=======
import { FileError } from 'react-dropzone/typings/react-dropzone';

>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
export interface UploadProps {
    btnText?: React.ReactType;
    bucketId: string;
    customerId: string;
    clientId: string;
    allowedFileNameCharacters?: string;
    allowedFileTypes?: string[];
    onFileUpload?: Function;
    onFileRemove?: Function;
    maxSize?: number;
    max?: number;
    multiple?: boolean;
    children?: Function;
    name?: string;
    showFileDrop?: boolean;
<<<<<<< HEAD
=======
    getDropRejectionMessage?: ((errors: FileError[], file: File) => string);
>>>>>>> 07afecc0c1d28bb24d1a4492fbc28db120c85ebc
}

declare const Upload: React.ComponentType<UploadProps>;

export default Upload;
