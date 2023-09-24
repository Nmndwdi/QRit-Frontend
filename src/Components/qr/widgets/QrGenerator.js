import React from 'react'
import QRCode from 'qrcode.react';

function QrGenerator({userId , userName}) {
    const url = `https://qrit.vercel.app/qr?userId=${userId}&userName=${encodeURIComponent(userName)}`;

    return (
        <>
            <div className='centered-div'>
                <QRCode value={url} />
            </div>
        </>
    );
}

export default QrGenerator