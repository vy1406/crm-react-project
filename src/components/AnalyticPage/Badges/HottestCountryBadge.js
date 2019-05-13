import React, { Component } from 'react';

class HottestCountryBadge extends Component {

    render() {
        return (    
             <div>
                <div className="badge">
                    <i class="fas fa-globe fa-3x"></i>
                </div>
                <span>
                    {this.props.hottestCountry}
                </span>
            </div>
        )
    }
}

export default HottestCountryBadge;