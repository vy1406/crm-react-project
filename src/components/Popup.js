import React, { Component } from 'react';

class Popup extends Component {

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.userID}</h1>
                    <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
        );
    }
}

export default Popup;