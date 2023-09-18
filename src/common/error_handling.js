import Toaster from '../common/toaster.js';

async function httpErrorHandle(response,onSuccess)
{
    // console.log(response.status);
    switch(response.status)
    {
        case 200:
            onSuccess();
            break;
        case 400:
            const data400=await response.json();
            Toaster(data400['msg']);
            break;
        case 500:
            const data500=await response.json();
            Toaster(data500['error']);
            break;
        default:
            Toaster("Something weird happened , Please restart!");
    }
}

export default httpErrorHandle;