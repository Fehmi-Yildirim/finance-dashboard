import { formatCurrency } from "../utils/formatCurrency";

function Card({
    title,
    value,
    isCurrency = true,
}) {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>
                {isCurrency
                    ? formatCurrency(value)
                    : value}
            </p>
        </div>
    );
}

export default Card;