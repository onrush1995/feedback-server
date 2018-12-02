import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return 'Still deciding';
			case false:
				return 'Logged out';
			default:
				return 'Logged In';
		}
	}
	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<a href="/" className="left brand-logo">
						Feedback App
					</a>
					<ul className="right">
						<li>{this.renderContent()}</li>
					</ul>
				</div>
			</nav>
		);
	}
}
function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Header);
