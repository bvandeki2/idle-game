import React from 'react';
import './BuyButton.css';

interface Props {
    onClick: () => any;
}

function BuyButton(props: Props) {
    return <input type="button" value="Buy Basic" onClick={props.onClick} />;
}

export default BuyButton;
