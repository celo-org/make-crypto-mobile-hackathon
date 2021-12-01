
import { multiplier } from '../shared/constants'; 
import { formatNumber } from 'react-native-currency-input';

export function round(num, precisao) {
    var casas = Math.pow(10, precisao);
    return Math.floor(num * casas) / casas;
};
 
export function roundCelo(num, precisao){
    let convertido = 0

    convertido = num / multiplier
    convertido = convertido.toFixed(precisao + 1)
    convertido = convertido.slice(0, -1)
    return convertido;
}

export function roundFinancial(num){
    let convertido = 0 
    convertido = num
    convertido = convertido.toFixed(3)
    convertido = convertido.slice(0, -1)
    return convertido;
}

export function formatarReal(valor){
    return formatNumber(valor, {
        separator: ',',
        prefix: 'R$ ',
        precision: 2,
        delimiter: '.',
        signPosition: 'beforePrefix',
    });
}

// const formatarReal = formatNumber(valor, {
//     separator: ',',
//     prefix: 'R$ ',
//     precision: 2,
//     delimiter: '.',
//     signPosition: 'beforePrefix',
//   });

// const formatarcUSD = formatNumber(valor, {
//     separator: ',',
//     // prefix: 'R$ ',
//     precision: 2,
//     delimiter: '.',
//     signPosition: 'beforePrefix',
//   });