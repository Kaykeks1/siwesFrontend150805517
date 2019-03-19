import React from 'react';
import PropTypes from 'prop-types';
import Sugar from 'sugar';
import '../../../../../../Assets/css/itemCard.min.css';

const ItemCard = (props) => {
  const {
    data, remove,
  } = props;
  let today = new Date();
  let dueDate = new Date(data.dueDate);
  return (
    <tr className="item-card">
      <td className="item-sku">
        <p>{data.title}</p>
      </td>
      <td className="item-sku">
        <p>{Sugar.Date(data.assignedDate).format().raw}</p>
      </td>
      {(today < dueDate) ?
      <td className="item-quantity">
        <p style={{color: 'green'}}>{Sugar.Date(data.dueDate).format().raw}</p>
      </td>
      :
      <td className="item-quantity">
        <p style={{color: 'red'}}>{Sugar.Date(data.dueDate).format().raw}</p>
      </td>
      }
      <td>
        <button className="edit-btn" onClick={remove}>
          <i className="material-icons">delete</i>
          <span>remove</span>
        </button>
      </td>
    </tr>
  );
};

ItemCard.defaultProps = {
  data: {},
  remove: () => {},
};

ItemCard.propTypes = {
  data: PropTypes.shape({}),
  remove: PropTypes.func,
};

export default ItemCard;
