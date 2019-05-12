import React, { Component } from 'react';
import HottestCountryBadge from './HottestCountryBadge';
import EmailSentBadge from './EmailSentBadge';
import NewClientsBadge from './NewClientsBadge';
import TopClientsBadge from './TopClientsBadge';

class Badges extends Component {

    render() {
        return (
             <div>
                 <h4>Badges:</h4>
                 <HottestCountryBadge />
                 <EmailSentBadge />
                 <NewClientsBadge />
                 <TopClientsBadge />
             </div>
        )
    }
}

export default Badges;