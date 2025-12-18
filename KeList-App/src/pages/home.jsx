import ListCard from '../components/lists.jsx';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext.jsx';

function Home() {
  const { user, lists, addList, loadLists  } = useUserContext();

  const [listType, setListType] = useState('');
  const [title, setTitle] = useState('');
  const [listItems, setListItems] = useState([]);

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  useEffect(() => {
    loadLists();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/Landing', { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null; 

  function addItem(e) {
    e.preventDefault();

    if (!itemName.trim()) return;

    const item = {
      name: itemName.trim(),
      quantity: Number(quantity) || 1,
      unit: unit || null,
      is_completed: false,
    };

    setListItems(prev => [...prev, item]);
    setItemName('');
    setQuantity('');
    setUnit('');
  }

  function createList(e) {
    e.preventDefault();

    if (!user || !listItems.length) return;
    console.log(user)

    const newList = {
      user_id: user.id,
      title,
      type: listType,
      items: listItems,
    };

    addList(user.id, newList);

    setListType('');
    setTitle('');
    setListItems([]);
  }

  return (
    <div className="home">

      <form onSubmit={createList} className="list-adder">
        <label>List type</label>
        <input
          value={listType}
          onChange={e => setListType(e.target.value)}
        />

        <label>List title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <div className="item-adder">

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
          <button type="button" onClick={addItem}>
            Add item
          </button>
        </div>
        <ol className='listItems'>
        { listItems.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity} {item.unit} 
          </li>
        ))}          
        </ol>
        <button type="submit">Create list</button>
      </form>
      <div className="lists">
        {lists.map(list => (
          <ListCard key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}

export default Home;
