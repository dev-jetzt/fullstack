import React from 'react';
import { Link } from 'react-router-dom';

class HeaderComponent extends React.PureComponent {
  public render() {
    return (
      <div className="section">
        <div className="container">
          <h1>
            <Link to="/">Meine Filmdatenbank</Link>
          </h1>
        </div>
      </div>
    );
  }
}

export default HeaderComponent;
