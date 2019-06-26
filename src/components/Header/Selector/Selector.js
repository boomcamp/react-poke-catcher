import React from 'react';

import './../Header.css';
import './../Dropdown.css';

export default function Selector({ handleChange, items, title }) {
    return (
        <div className="place-container">
            <div className="place-title white-bold">
                {title}:
            </div>
            <div className={title+"dropdwon"}>
                <select
                    onChange={e => handleChange(e.target.value)}
                    className="select-css"
                    disabled={!items.length}
                    name={title+"s"}
                    id={title+"s"}
                >
                    {
                        items.map(item => (
                            <option key={item.name} value={item.name}>
                                {item.name}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
}