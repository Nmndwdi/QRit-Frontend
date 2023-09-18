import React from 'react'
import QRCode from 'qrcode.react';

function QrGenerator({userId}) {
    const url = `https://qrit.vercel.app/qr?userId=${userId}`;
    return (
        <>
            <div className='centered-div'>
                <QRCode value={url} />
            </div>
        </>
    );
}

export default QrGenerator