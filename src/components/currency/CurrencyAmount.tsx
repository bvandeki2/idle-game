import React from 'react';
import './CurrencyAmount.css';
import credit from './images/credit.svg';
import land from './images/land.svg';
import redcircle from './images/redcircle.svg';
import greencircle from './images/greencircle.svg';
import bluecircle from './images/bluecircle.svg';

interface Props {
    amount?: number;
}

function formatUnit(val: number) {
    if (val < 1e10) return val.toLocaleString();
    return val.toExponential(3);
}

function MakeCurrencyComponent(image: string, alt: string) {
    return function (props: Props) {
        if (props.amount === undefined) return <></>;
        return (
            <div className="inline">
                <img src={image} className="icon" alt={alt}></img>
                <div className="quantity">{formatUnit(props.amount)}</div>
            </div>
        );
    };
}

const CreditAmount = MakeCurrencyComponent(credit, 'credits');
const LandAmount = MakeCurrencyComponent(land, 'land');
const RedCircleAmount = MakeCurrencyComponent(redcircle, 'redcircle');
const GreenCircleAmount = MakeCurrencyComponent(greencircle, 'greencircle');
const BlueCircleAmount = MakeCurrencyComponent(bluecircle, 'bluecircle');

export {
    CreditAmount,
    LandAmount,
    RedCircleAmount,
    GreenCircleAmount,
    BlueCircleAmount,
};
