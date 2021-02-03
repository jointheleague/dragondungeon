import React from 'react';
import { Link } from '@reach/router';

const Feedback = () => {
  return (
    <>
      <br /><br /><br />
      <div className='centerer' style={{
        textAlign: 'center'
      }}>
        <br />
        <Link to="/">Back</Link>
        <h1>Report a bug or security vulnerability</h1>
        <h2>Hall of <del>shame</del> <ins>fame</ins></h2>
        <p>No one's listed here yet! Go ahead, report some bugs!</p>
        <h2>Policy</h2>
        <p>We are interested in the following bugs:</p>
        <ul>
          <li>XSS attacks targeting other players</li>
          <li>Unauthorized access to server-side code</li>
          <li>Unauthorized access to developer logs</li>
        </ul>
        <p>We are <b>not</b> interested in the following bugs:</p>
        <ul>
          <li>Network manipulation</li>
        </ul>
        <h2 id="report">Reporting a bug</h2>
        <p>To report a bug, please email dragoncoingame@gmail.com.</p>
      </div>
    </>
  );
}

export default Feedback;