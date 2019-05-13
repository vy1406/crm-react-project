import React, { Component } from 'react';

class EmailSentBadge extends Component {

    render() {
        return (
            <div>
                <div className="badge">
                    <i class="far fa-envelope fa-3x"></i>
                </div>
                <span>
                    {this.props.clientNumber}
                </span>
            </div>
        )
    }
}

export default EmailSentBadge;