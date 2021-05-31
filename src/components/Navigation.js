import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faBookOpen } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ libraryStatus, setLibraryStatus }) => {
    return (
        <nav>
            <h1>Waves</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                <p>{libraryStatus ? <FontAwesomeIcon icon={faMusic} />:<FontAwesomeIcon icon={faBookOpen} />}</p>
            </button>
        </nav>
    )
}


export default Navigation;