import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

const starRatingStyle = {
  display: 'inline-block',
  marginRight: '10px',
  fontSize: '20px',
};

class DisplayRating extends Component {
  render() {
    return (
      <div style={starRatingStyle}>
        <StarRatings
          rating={this.props.rating}
          starDimension="20px" // Adjusted star size
          starSpacing="2px" // Adjusted spacing between stars
          starRatedColor="#ffd700" // Fill color of the selected star (gold)
          starEmptyColor="#d3d3d3" // Fill color of the unselected star (lightgray)
          starHoverColor="#ffd700" // Color of stars when hovering
          starStrokeColor="#000000" // Border color of the star (black)
          numberOfStars={5}
          name='rating'
          readonly
        />
      </div>
    );
  }
}

export default DisplayRating;
