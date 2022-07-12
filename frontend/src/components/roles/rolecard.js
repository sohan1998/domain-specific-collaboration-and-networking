import React, { Component } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import './roles.css';

export const RoleCard = (props) => {
    console.log(props);
    const roles = props.allRoles.map((role) => {
        return (
            <Card className='mb-3'>
                <Card.Header>{role.title}</Card.Header>
                <Card.Body>
                    <div className='rolecard-content-wrapper'>
                        <div>{role.description}</div>
                        <div>
                            <Button className='primary'> Apply </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    });

    return <div>{roles}</div>;
};

export default RoleCard;

// const RoleCard = (props) => {
//     console.log(props);
//     const roles = props.allRoles.map((role) => {
//         return (
//             <Card className='mb-3'>
//                 <Card.Header>{role.title}</Card.Header>
//                 <Card.Body>
//                     <div className='rolecard-content-wrapper'>
//                         <div>{role.description}</div>
//                         <div>
//                             <Button className='primary'> Apply </Button>
//                         </div>
//                     </div>
//                 </Card.Body>
//             </Card>
//         );
//     });

//     return <div>{roles}</div>;
// };

// export default RoleCard;

// export default class Rolecard extends Component {
//     render(props) {
//         return (
//             <Card>
//                 <Card.Header>{this.props.projectName}</Card.Header>
//                 <Card.Body>
//                     <div className='rolecard-content-wrapper'>
//                         <div>{this.props.roleName}</div>
//                         <div>
//                             <Button className='primary'> Apply </Button>
//                         </div>
//                     </div>
//                 </Card.Body>
//             </Card>
//         );
//     }
// }
