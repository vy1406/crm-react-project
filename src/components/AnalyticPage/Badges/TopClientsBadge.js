import React, { Component } from 'react';

class TopClientsBadge extends Component {

    render() {
        return (
            
            <div>
                <div className="badge">
                    <i class="fas fa-chart-line fa-3x"></i>
                </div>
                <span>
                    {this.props.clientNumber}
                </span>
            </div>
        )
    }
}

export default TopClientsBadge;

