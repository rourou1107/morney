import {Message} from 'element-ui';

function openTip(message: string, type: 'success' | 'warning' | 'info' | 'error') {
    Message({
        message: message,
        type: type,
        center: true,
        offset: 200,
        duration: 1000,
        customClass: 'message'
    });
}

export default openTip;
