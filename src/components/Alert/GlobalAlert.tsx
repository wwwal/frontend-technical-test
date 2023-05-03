import { Alert, AlertTitle, capitalize } from '@mui/material';

import { AxiosError } from 'axios';
import { FixedAlert } from './Alert.style';
import { RootState } from '../../store';
import { setLastAlert } from '../../store/user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useTranslation } from 'react-i18next';

const GlobalAlert = () => {
    const alert = useAppSelector((state: RootState) => state.user.lastAlert)
    const dispatch = useAppDispatch();
    const { t } = useTranslation('error');
    return (
        null !== alert ?
            <FixedAlert>
                <Alert
                    onClose={() => dispatch(setLastAlert(null))}
                    severity={alert.type}
                    variant="filled"
                >
                    <AlertTitle>{capitalize(alert.type)}</AlertTitle>
                    {t(alert.message as typeof AxiosError.ERR_BAD_REQUEST)}
                </Alert>
            </FixedAlert >
            :
            <></>
    );
}

export default GlobalAlert