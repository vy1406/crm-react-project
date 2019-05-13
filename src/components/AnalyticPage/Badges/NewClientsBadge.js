import React, { Component } from 'react';

class NewClientsBadge extends Component {
    currentMonth = new Date().toLocaleString('en-us', { month: 'long' })
    render() {
        return (
            <div>
                <div className="badge">
                    <i class="fas fa-user-circle fa-3x"></i>
                </div>
                <span>{this.props.clinetNumber}</span>
                <div>New {this.currentMonth} Clients</div>
            </div>
        )
    }
}

export default NewClientsBadge;