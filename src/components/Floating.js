import React from 'react';
import './Floating.css';


const Floating = ({ addFriend, children } ) => {
  const $ = window.$;
  $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  });
  return (
    <div className='Floating'>
      {children}
      <div className="fixed-action-btn">
        <a className="btn-floating btn-large white" >
          <i className="large material-icons">add</i>
        </a>
        <ul>
          <li><a
            className="btn-floating tooltipped red"
            data-position="right"
            data-tooltip="친구 추가"
            onClick={addFriend}
          >
            <i className="material-icons">group_add</i>
          </a>
          </li>
          <li><a className="btn-floating tooltipped blue" data-position="right" data-tooltip="앨범 추가"><i className="material-icons">add_a_photo</i></a></li>
        </ul>
      </div>
    </div>
  );
};

export default Floating;