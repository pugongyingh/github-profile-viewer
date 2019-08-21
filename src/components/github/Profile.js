import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RepoList from './RepoList';

class Profile extends Component {
  render() {
    return(
      <div className="card mt-2">
        <div className="card-header">
          {this.props.userData.name}
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <img src={this.props.userData.avatar_url} 
                    className="img-thumbnail"
                    style={{width:"100%"}} />
            </div>
            <div className="col-8">
              <div className="row">
                <div className="col">
                  <span className="badge badge-primary mr-2">{this.props.userData.public_repos} Repos</span>
                  <span className="badge badge-success mr-2">{this.props.userData.public_gists} Public Gists</span>
                  <span className="badge badge-info mr-2">{this.props.userData.followers} Followers</span>
                  <span className="badge badge-danger mr-2">{this.props.userData.following} Following</span>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Username: </strong> {this.props.userData.login}
                    </li>
                    <li className="list-group-item">
                      <strong>Location: </strong> {this.props.userData.location}
                    </li>
                    <li className="list-group-item">
                      <strong>Email Address: </strong> {this.props.userData.email}
                    </li>
                    <li className="list-group-item">
                      <strong>Bio: </strong> {this.props.userData.bio}
                    </li>
                  </ul>
                </div>
              </div>
              <br />
              <a className="btn btn-primary" target="_blank" href={this.props.userData.html_url}>
                Visit Profile
              </a>
            </div>
          </div>
          
          <hr />

          <h3>User Repositories</h3>
          <RepoList userRepos={this.props.userRepos} />
        </div>
      </div>
    )
  }
}

export default Profile;