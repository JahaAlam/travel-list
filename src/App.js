import { useState } from "react";

/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
]; */

export default function App(){
  const [items, setItems] = useState([]);

  function handleAddItems (item){
    setItems ((items)=> [...items, item]);
   }

   function handleDeleteItem(id){
    console.log(id);
    setItems((items)=>items.filter(item=>item.id !== id));
   }

    function handleToggleItem(id) {
       setItems((items)=>
       items.map((item) =>
       item.id === id ? {...item, packed: !item.packed}
       : item
       )
       );
    }

return (
<div className="app">
  <Logo />
  <Form onAddItems={handleAddItems} />
  <PackingList  items={items} onDeleteItem={handleDeleteItem} onToggleItem ={handleToggleItem} />
  <Stats items={items}/>
</div>

)

}


function Logo(){
  return <h1>🌴Far Away💼 </h1>
}
  

function Form({onAddItems}){
   const [description, setDescription] = useState("");
   const [quantity, setQuantity] = useState(1);
   

   function handleSubmit(e){
    e.preventDefault();

    if(!description) return;

    const newItem = {
      description,quantity,packed: false, id: Date.now()};
      console.log(newItem);

      onAddItems(newItem);
  
      setDescription("");
      setQuantity(1);

   }


    return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e)=> setQuantity
        (Number(e.target.value))}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num)=>(
          <option value={num} key={num}>
            {num}
          </option>
        
        ))}
        {/* <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option> */}
      </select>
      <input type="text" placeholder="Item..." value={description}
       onChange={(e)=>setDescription(e.target.value)}
        />
      <button>Add</button>
    </form>
  )
}


function PackingList({items, onDeleteItem, onToggleItem}){
  return (
    <div className="list">   
    <ul>
      {items.map((item) =>(
      <Item item={item} onDeleteItem={onDeleteItem}
      onToggleItem = {onToggleItem}
      key={item.id}
      />
      ))}
    </ul>
  </div>
  );
}

function Item({ item, onDeleteItem,onToggleItem }) {
  return (
    <li>
      <input type="checkbox" 
      value={item.packed} 
      onChange={() => onToggleItem(item.id)}
      />
      <spam style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </spam>
      <button onClick={()=> onDeleteItem(item.id)}>❌</button>
    </li>
  );
}


function Stats({items }){
  const numItems = items.length;
  const numPacked = items.filter((item)=> item.packed).length;
  const parcentage = Math.round((numPacked / numItems) * 100);
  return <footer className="stats">
    <em>
      {parcentage === 100 ? "You r are done, Now Reeady to go"
      :

     ` you have ${numItems} items on your list, and you already
     ${numPacked} (${parcentage}%)`
}
     </em>
  </footer>
}
