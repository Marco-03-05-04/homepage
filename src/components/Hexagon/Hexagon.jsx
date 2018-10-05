import React from 'react';
import PropTypes from 'prop-types';

import SVGHexagon from '../../images/hexagons/hexagon';

import './Hexagon.scss'

const Hexagon = ({ className, icon, text, centralText, ...props }) => {
  const [textUpper, textLower] = text.split('\n')

  let textY = 10;
  let fontSize = 1.4;

  if (centralText === true) {
    textY = 7.4;
    fontSize = 2;
  }

  return (
    <SVGHexagon className={ `hexagon ${ className || ''}` } {...props}>
      <g className="hexagon-icon" transform="scale(0.4) translate(12.66, 6)">        
        <use xlinkHref={ `#${ icon }` }/>
      </g>
      <g className="hexagon-text">        
        <text 
          x="8.5"
          y={ textY }
          fontSize={ fontSize }
          width="8"
          textAnchor="middle"
          alignmentBaseline="central"
          fill="currentColor"
          >
          { textUpper }
        </text>
        <text 
          x="8.5"
          y={ textY + 2 }
          fontSize={ fontSize }
          width="8"
          textAnchor="middle"
          alignmentBaseline="central"
          fill="currentColor"
          >
          { textLower }
        </text>
      </g>
    </SVGHexagon>
  );
};

Hexagon.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
};

export default Hexagon;