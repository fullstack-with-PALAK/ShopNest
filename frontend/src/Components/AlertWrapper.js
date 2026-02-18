import { useAlert } from '../AlertContext';
import Alert from './Alert';

export default function AlertWrapper() {
    const { alert, showAlert } = useAlert();

    if (!alert) return null;

    return (
        <Alert
            key={alert.id}
            heading={alert.heading}
            message={alert.message}
            onClose={() => showAlert('', '')}
        />
    );
}
