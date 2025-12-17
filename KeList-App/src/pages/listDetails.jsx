import { useState } from 'react';
import { useUserContext } from '../context/UserContext.jsx';

function ListDetails(list) {
    const {  addItemToList, removeItemFromList } = useUserContext();

    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [notes, setNotes] = useState('');


    async function addItem() {
        if (!itemName.trim()) return;

        await addItemToList(list.id, {
            name: itemName,
            quantity,
            unit,
            notes
        });

        setItemName('');
        setQuantity('');
        setUnit('');
    }

    return(
        <div className="listDetails">
            <div>
                <ul>
                    {list.items.map((item, i) => (
                        <li key={i}>
                            {item.name} — {item.quantity} {item.unit}
                            <button onClick={() => removeItemFromList(list.id, item.id)}>
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <form onSubmit={addItem}>
                    <input
                        placeholder="item name"
                        value={itemName}
                        onChange={e => setItemName(e.target.value)}
                    />

                    <input
                        placeholder="quantity"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                    />

                    <input
                        placeholder="unit (kg, pcs)"
                        value={unit}
                        onChange={e => setUnit(e.target.value)}
                    />
                    <input
                        placeholder="notes..."
                        value={unit}
                        onChange={e => setNotes(e.target.value)}
                    />
                    <button type="submit">
                        Add item
                    </button>
                </form>
                <button >delete list</button>              
            </div>
        </div>
    )
};

export default ListDetails;