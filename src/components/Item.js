import PropTypes from 'prop-types';
import './Item.css'
    
const Item = (props)=>{
    const {title,amount} = props

// const Item = ({title,amount})=>{
    const formatNumber=(num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    const status=amount<0 ? 'expense':'income'
    const symbol=amount<0?'-':'+'
    return (
        <li className={status}>{title}<span>{symbol}{formatNumber(Math.abs(amount))}</span></li>
    );
}

Item.propTypes={
    title:PropTypes.string.isRequired,
    amount:PropTypes.number.isRequired
}

export default Item