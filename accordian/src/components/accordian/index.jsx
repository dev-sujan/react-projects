import { useState } from "react";
import data from './data'
import './style.css'

//  1. single selection 
//  2. multiple selection

export default function AccordianWrapper() {
  const [isMultiSelect, setIsMultiSelect] = useState(false)
  return (
    <div className="wrapper">
      <button onClick={() => setIsMultiSelect(prev => !prev)}>{isMultiSelect ? '✅ Muli Select Enabled ✅' : 'Enable Multi Select'}</button>
      <Accordian data={data}  isMultiSelect={isMultiSelect} />
    </div>
  );
}


export function Accordian({ data, isMultiSelect }) {
  const [selected, setSelected] = useState();
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (currentId) => {
    setSelected(currentId === selected ? null : currentId)
  }

  const handleMultiSelection = (currentId) => {
    let copyMultiple = [...multiple];

    copyMultiple.includes(currentId)
      ?
      copyMultiple = copyMultiple.filter(item => item !== currentId)
      :
      copyMultiple.push(currentId)
    console.log(copyMultiple);
    setMultiple([...copyMultiple])
  }

  return (
    <div className='accordian'>
      {
        data && data.length > 0
          ?
          data.map(dataItem => (
            <div key={dataItem.id} className="item">
              <div className="title" onClick={isMultiSelect ? () => handleMultiSelection(dataItem.id) : () => handleSingleSelection(dataItem.id)}>
                <h3>{dataItem.question}</h3>
                <span>{selected === dataItem.id ? "➖" : "➕"}</span>
              </div>
              {
                (selected === dataItem.id ||
                  multiple.includes(dataItem.id)) &&
                (<div className="content">{dataItem.answer}</div>)
              }
            </div>
          ))
          :
          <div>No data found!</div>
      }
    </div>
  );
}