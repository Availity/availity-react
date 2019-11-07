import React from 'react';
import PropTypes from 'prop-types';

const Tiles = ({ parents, stacked, className }) => {
  const splicedParents = parents.length > 4 ? parents.slice(0, 3) : parents;

  return stacked ? (
    <div className={`tile-container ${className}`}>
      {splicedParents.map(({ images }) => (
        <div className="parent-tile">
          <span key={images.tile} className="nav-image">
            <img
              className="w-100 h-100 align-baseline"
              src={images.tile}
              alt="tile"
            />
          </span>
        </div>
      ))}
    </div>
  ) : (
    <div
      className={`d-flex flex-row flex-wrap ${className}`}
      style={{
        maxWidth: 45,
        maxHeight: 45,
      }}
    >
      {splicedParents.map(({ id, images }) => (
        <img
          key={id}
          style={{
            flexBasis: '50%',
            width: 22.5,
            height: 22.5,
          }}
          src={images.tile}
          alt="tile"
        />
      ))}
    </div>
  );
};

Tiles.propTypes = {
  parents: PropTypes.array,
  stacked: PropTypes.bool,
  className: PropTypes.string,
};

export default Tiles;
