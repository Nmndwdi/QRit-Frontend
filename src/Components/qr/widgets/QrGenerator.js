import React from 'react'
import QRCode from 'qrcode.react';

function QrGenerator({userId}) {
    const url = `http://192.168.0.104:3000/qr?userId=${userId}`;
    return (
        <>
            <div className='centered-div'>
                <QRCode value={url} />
            </div>
        </>
    );
}

export default QrGenerator