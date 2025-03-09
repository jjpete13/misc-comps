import { useState } from 'react';
import './cardWithTabs.css';

const tabs = [
  {name: "tab1", content: "tab 1 content"},
  {name: "tab2", content: "tab 2 content"},
  {name: "tab3", content: "tab 3 content"},
  {name: "tab4", content: "tab 4 content"},
  {name: "tab5", content: "tab 5 content"},
]


export default function CardWithTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const navBar = (tabs: { name: string; content: string }[]) => {
  return (
    <div className='card-tabs'>
      {tabs.map((tab) => {
         return (
          <button className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)} key={tab.name}>{tab.name}</button>
        )

      })}
    </div>
  )
}

  return (
    <div className="card">
      {navBar(tabs)}
      <div className='card-body'>
        <h4>{activeTab?.content}</h4>
      </div>
      
    </div>
  )
}