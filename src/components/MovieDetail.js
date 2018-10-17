import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';

import {BACKDROP_URL_780} from '../constants/urls';
import {MovieComments} from './MovieComments';
import {SERVER_URL} from '../constants/config';
import {connect} from 'react-redux';

class _MovieDetail extends Component {
  state = {
    movie: null
  };

  /*
  * TODO: fetch the movie details with it's movie id
  * the url to get movie details from a movie id: `${SERVER_URL}/movies/${id}`
  */

 componentDidMount() {
  this.fetchMovieDetails();
}

async fetchMovieDetails() {
  const {data: movie} = await axios.get(`${SERVER_URL}/movies/${this.props.match.params.id}`);
  this.setState({movie});
  // this don't work, have to change ovie by the result of get
  // axios.get(`${SERVER_URL}/movies/${this.props.match.params.id}`).then(this.setState({data: movie}))
}
  /*
  * TODO: handle component update lifecycle
  * */

  render() {
    const {movie} = this.state;
    const {match, loggedIn} = this.props;
    const {params: {id}} = match;
    if (!movie) {
      return <h1>Loading ...</h1>;
    }
    const {title, backdrop_path, overview, release_date, vote_average} = movie;
    return (
      <div>
        <div className="card mb-3 movie-card">
          <div className="card-block">
            <div className="card-bkg">
              <div className="hero-vignette" />
              <img
                alt="Movie Cover"
                className="card-imt-top"
                src={BACKDROP_URL_780 + backdrop_path}
              />
            </div>
            <div className="card-block-detail">
              <h1 className="black">{title}</h1>
              <p className="rating">
                <span>{vote_average}</span> / 10
              </p>
              <p className="date">{release_date}</p>
              <p>{overview}</p>
              <button
                className="btn btn-primary"
                onClick={() => {this.props.history.goBack();}}
              >
                Back
              </button>
              {loggedIn && (
                // <Link to={`/movies/${id}/comments`}>See the comments</Link>
                // Fix to can go back directly to Main if you click on See comments
                <a onClick={() => this.props.history.replace(`/movies/${id}/comments`)}>See the comments</a>
              )}
            </div>
            <div className="card-block-footer">
              <Route path={`${this.props.match.url}/comments`} render={props => <MovieComments {...props} movieId={this.props.match.params.id} />}/>
              {/* * TODO: add a subroute on path `/movies/:id/comments` to render
              MovieComments component * the component requires a movieId
              property * */ }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

_MovieDetail.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  loggedIn: PropTypes.bool
};

const mapStateToProps = ({auth}) => ({
  loggedIn: auth.loggedIn
});

export const MovieDetail = connect(mapStateToProps)(_MovieDetail);
