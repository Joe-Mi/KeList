import { useNavigate } from 'react-router-dom';

function ListCard({ list}) {
    const navigate = useNavigate();

    return (
        <div className="list-card">
            <h3>{list.username} — {list.type}</h3>
            <ul>
                {list.items.map((item, i) => (
                    <li key={i}>
                        {item.name} - {item.quantity} {item.unit} 
                    </li>
                ))}
            </ul>
            <button onClick={() =>navigate('/viewList', { list: list })}>
                view
            </button>
        </div>
    );
}

export default ListCard;