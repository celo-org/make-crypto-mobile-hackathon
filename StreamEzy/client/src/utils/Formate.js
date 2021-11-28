import Formatter from './Formatter';

const Formate = (value) => {
    return Formatter().format(value).slice(1);
}

export default Formate;