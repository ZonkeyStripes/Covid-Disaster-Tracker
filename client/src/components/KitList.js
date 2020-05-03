import React from 'react';
import '../Kit.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Animation of adding item to list
import FlipMove from 'react-flip-move';

function KitList(props) {

    const items = props.items;
    const listItems = items.map(item => {
        return <div className="listing" key={item.key}>
            <p>{item.text}
                <span>
                    <FontAwesomeIcon className="faicons"
                        onClick={() => { props.deleteItem(item.key) }} icon="trash" />
                </span>
            </p>
        </div>

    })
    return (
        <div>
            <FlipMove duration={350} easing="ease-in-out">
                {listItems}
            </FlipMove>
        </div>
    )
}

export default KitList;


    // const items = props.items;
    // return(
    //     <div>{items.map(item =>
    //         {
    //             return <div className="listing" key={item.key}>
    //                 <p>{item.text}
    //                 <span>
    //                     <FontAwesomeIcon className="faicons" icon="trash" 
    //                     oncClick={ () => props.deleteItem(item.key)}
    //                         />
    //                 </span>
    //                 </p>
    //             </div>

    //         })}
    //           </div>
    // )


// return(
//     <div>
//                  <FlipMove duration={300} easing="ease-in-out">
//                  {items}
//                  </FlipMove>
//                  </div>
// )
