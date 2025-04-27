import { useState } from 'react';

function List({ items: initialItems, category }) {
  const [items, setItems] = useState(initialItems);
  const [sortOption, setSortOption] = useState('none');
  const [filterOption, setFilterOption] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSort = (option) => {
    setSortOption(option);
    const sortedItems = [...initialItems];
    
    switch(option) {
      case 'alpha-asc':
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'alpha-desc':
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'calories-asc':
        sortedItems.sort((a, b) => a.calories - b.calories);
        break;
      case 'calories-desc':
        sortedItems.sort((a, b) => b.calories - a.calories);
        break;
      default:
        sortedItems.sort((a, b) => a.id - b.id);
    }
    
    setItems(filterOption === 'all' ? sortedItems : applyFilter(sortedItems, filterOption));
  };

  const applyFilter = (itemsToFilter, option) => {
    return option === 'all' 
      ? itemsToFilter 
      : itemsToFilter.filter(item => option === 'low' 
          ? item.calories < 100 
          : item.calories >= 100);
  };

  const handleFilter = (option) => {
    setFilterOption(option);
    setItems(applyFilter(initialItems, option));
    if (sortOption !== 'none') {
      handleSort(sortOption);
    }
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="list-container">
      <div className="list-header">
        <h3 
          className="list-category" 
          data-category={category}
          onClick={toggleExpand}
        >
          {category}
          <span className="toggle-icon">
            {isExpanded ? '−' : '+'}
          </span>
        </h3>
        
        {isExpanded && (
          <div className="list-controls">
            <div className="control-group">
              <label>Sort:</label>
              <select 
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
                className="control-select"
              >
                <option value="none">None</option>
                <option value="alpha-asc">A-Z</option>
                <option value="alpha-desc">Z-A</option>
                <option value="calories-asc">Calories (Low-High)</option>
                <option value="calories-desc">Calories (High-Low)</option>
              </select>
            </div>
            
            <div className="control-group">
              <label>Filter:</label>
              <select 
                value={filterOption}
                onChange={(e) => handleFilter(e.target.value)}
                className="control-select"
              >
                <option value="all">All</option>
                <option value="low">Low Calories (&lt;100)</option>
                <option value="high">High Calories (≥100)</option>
              </select>
            </div>
          </div>
        )}
      </div>
      
      {isExpanded && (
        <ul className="list-items">
          {items.map((item, index) => (
            <li 
              key={item.id} 
              className="list-item"
              style={{ '--order': index }}
            >
              <span className="item-name">{item.name}</span>
              <span className="item-calories">{item.calories} cal</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default List;